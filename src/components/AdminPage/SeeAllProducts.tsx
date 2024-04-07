import React, { useContext, useEffect, useState } from "react";
import Product from "../../firebase/Product";
import Loading from "../ContextRelatedThings/Loading";
import DisplayingAProduct from "../DifferentCardTypes/DisplayingAProduct";
import styles from "../../styles/seeallproducts.module.css";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import { initialSetupForSearchAbility } from "./commonlyUsedFunctions";

export default function SeeAllProducts() {
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  let { setOpenDialog } = useContext(GlobalContextHolder);

  useEffect(() => {
    setOpenDialog("Getting Products");
    initialSetupForSearchAbility(setFilteredProducts, setAllProducts).finally(
      () => {
        setOpenDialog("");
      }
    );
  }, []);

  return (
    <div className={styles.bodyRowDisplay}>
      {allProducts == null ? (
        <Loading color={"#fc6f03"} />
      ) : (
        allProducts.map((product, index) => (
          <DisplayingAProduct
            key={index}
            description={product.description}
            price={product.price}
            title={product.title}
            image={product.image}
          />
        ))
      )}
    </div>
  );
}

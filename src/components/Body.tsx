import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/body.module.css";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
import Product from "../firebase/Product";
import TopPanel from "./TopPanel";
import { getCategoriesList } from "../firebase/firebaseBackEnd";
import GlobalContextHolder from "./ContextHolder";
import {
  initialSetupForSearchAbility,
  searchThoughProducts,
} from "./AdminPanel/commonlyUsedFunctions";
import Catagories from "./Catagories";

export default function Body(): React.JSX.Element {
  // let [filteredData, setFilter] = useState();
  let [searchTerm, setSearchTerm] = useState("");
  let [listOfCategories, setListOfCategories] = useState([]);
  let { setOpenDialog } = useContext(GlobalContextHolder);
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [filteredDataProductBySearch, setFilteredProductBySearch] = useState<
    Product[]
  >([]);

  let getJsonFromApiForCategories = async (
    setApi: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      let response = await getCategoriesList();
      console.log(response ? ["List"] : null);
      setApi(response ? ["List"] : null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setOpenDialog("Getting Products");
    getJsonFromApiForCategories(setListOfCategories);
    initialSetupForSearchAbility(
      setFilteredProductBySearch,
      setAllProducts
    ).then(() => {
      setOpenDialog("");
    });
  }, []);

  useEffect(() => {
    searchThoughProducts(searchTerm, allProducts, setFilteredProductBySearch);
  }, [searchTerm]);

  return (
    <div id="body" className={styles.entireBody}>
      <TopPanel setSearch={setSearchTerm}></TopPanel>
      <div className="catagoriesContainer">
        {listOfCategories.map((category, index) => (
          <Catagories key={index} name={category} color={"#aaa"}></Catagories>
        ))}
      </div>

      <div className={styles.body}>
        {filteredDataProductBySearch == null ? (
          <Loading color={"#fc6f03"} />
        ) : (
          filteredDataProductBySearch.map((product, index) => (
            <ProductCard
              deletable={null}
              key={index}
              id={product.ID}
              price={product.price}
              title={product.title}
              image={product.image}
            />
          ))
        )}
      </div>
    </div>
  );
}

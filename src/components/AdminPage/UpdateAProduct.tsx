import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import Product from "../../firebase/Product";
import {
  initialSetupForSearchAbility,
  searchThoughProducts,
} from "./commonlyUsedFunctions";
import UpdateAProductCard from "../DifferentCardTypes/UpdateAProductCard";

export default function UpdateAProduct() {
  let { setOpenDialog } = useContext(GlobalContextHolder);
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let searchInputRef = useRef(null);
  let [filteredDataProductBySearch, setFilteredProductBySearch] = useState<
    Product[]
  >([]);

  useEffect(() => {
    setOpenDialog("Getting Products");

    initialSetupForSearchAbility(
      setFilteredProductBySearch,
      setAllProducts
    ).then(() => {
      setOpenDialog("");
    });
  }, []);

  return (
    <div>
      <input
        type="search"
        placeholder="Search For Product"
        ref={searchInputRef}
        onChange={(event) => {
          searchThoughProducts(
            event.target.value,
            allProducts,
            setFilteredProductBySearch
          );
        }}
      />
      <div>
        {filteredDataProductBySearch.map((product, index) => (
          <UpdateAProductCard
            id={product.ID}
            image={product.image}
            title={product.title}
            description={product.description}
            key={index}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

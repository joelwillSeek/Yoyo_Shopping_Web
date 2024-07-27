import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/shopping.module.css";
import Catagories from "./Catagories";
import Product from "../../firebase/Product";
import {
  initialSetupForSearchAbility,
  searchThoughProducts,
} from "../AdminPage/commonlyUsedFunctions";
import Loading from "../ContextRelatedThings/Loading";
import DisplayingAProduct from "../DifferentCardTypes/DisplayingAProduct";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import { getCategoriesList } from "../../firebase/firebaseBackEnd";

export default function ShoppingArea() {
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [filteredDataProductBySearch, setFilteredProductBySearch] = useState<
    Product[]
  >([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [listOfCategories, setListOfCategories] = useState([]);

  let { setOpenDialog } = useContext(GlobalContextHolder);

  // Make The Categories and Product Look Good

  async function getJsonFromApiForCategories(
    setApi: React.Dispatch<React.SetStateAction<any>>
  ) {
    try {
      let response = await getCategoriesList();
      console.log(response ? ["List"] : null);
      if (response) {
        setApi(response["List"]);
      } else {
        setApi(null);
      }
    } catch (e) {
      console.log(e);
    }
  }

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
    <>
      <h1 className={styles.productTitle}>Products</h1>
      <hr className={styles.smallBar} />

      <div className={styles.searchComponentHolder}>
        <input
          placeholder="Search..."
          type="text"
          className={styles.searchBar}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      <div className="catagoriesContainer">
        <Catagories
          name={"all"}
          color={"#aaa"}
          allProducts={allProducts}
          setFilteredProductBySearch={setFilteredProductBySearch}
        />
        {listOfCategories.map((category, index) => (
          <Catagories
            key={index}
            name={category}
            color={"#aaa"}
            allProducts={allProducts}
            setFilteredProductBySearch={setFilteredProductBySearch}
          ></Catagories>
        ))}
      </div>
      {/* List Of The Filtered Or All Product */}
      <div className={styles.body}>
        {filteredDataProductBySearch == null ? (
          <Loading color={"#fc6f03"} />
        ) : (
          filteredDataProductBySearch.map((product, index) => (
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
    </>
  );
}

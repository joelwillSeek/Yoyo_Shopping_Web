import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/body.module.css";
import Loading from "../ContextRelatedThings/Loading";
import Product from "../../firebase/Product";
import TopPanel from "./TopPanel";
import { getCategoriesList } from "../../firebase/firebaseBackEnd";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import {
  initialSetupForSearchAbility,
  searchThoughProducts,
} from "../AdminPage/commonlyUsedFunctions";
import Catagories from "./Catagories";
import DisplayingAProduct from "../DifferentCardTypes/DisplayingAProduct";

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
      if (response) {
        setApi(response["List"]);
      } else {
        setApi(null);
      }
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
    </div>
  );
}

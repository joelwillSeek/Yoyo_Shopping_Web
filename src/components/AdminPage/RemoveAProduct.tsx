import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import Product from "../../firebase/Product";
import {
  initialSetupForSearchAbility,
  searchThoughProducts,
} from "./commonlyUsedFunctions";
import RemovingAProductCard from "../DifferentCardTypes/RemovingAProductCard";

const RemoveAProduct = () => {
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [filteredDataProductBySearch, setFilteredProductBySearch] = useState<
    Product[]
  >([]);

  let searchInputRef = useRef(null);

  let { setOpenDialog } = useContext(GlobalContextHolder);

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
        onChange={(event) =>
          searchThoughProducts(
            event.target.value,
            allProducts,
            setFilteredProductBySearch
          )
        }
      />
      <div>
        {filteredDataProductBySearch.map((product, index) => (
          // <ProductCard
          //   price={product.price}
          //   image={product.image}
          //   title={product.title}
          //   id={product.ID}
          //   key={index}
          //   deletable={{
          //     setFilteredProductBySearch,
          //     setAllProducts,
          //     forUpdate: false,
          //   }}
          // />

          <RemovingAProductCard
            setFilteredProductBySearch={setFilteredProductBySearch}
            price={product.price}
            setAllProducts={setAllProducts}
            description={product.description}
            image={product.image}
            title={product.title}
            id={product.ID}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RemoveAProduct;

import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContextHolder from "../ContextHolder";
import { getAllProductsRegardlessOfCategory } from "../../firebase/firebaseBackEnd";
import Product from "../../firebase/Product";
import ProductCard from "../ProductCard";

const RemoveAProduct = () => {
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [filteredDataProductBySearch, setFilteredProductBySearch] = useState<
    Product[]
  >([]);

  let { setOpenDialog } = useContext(GlobalContextHolder);

  let searchInputRef = useRef(null);

  useEffect(() => {
    setOpenDialog("Getting Products");

    getAllProductsRegardlessOfCategory().then((response) => {
      setAllProducts([...response]);
      setOpenDialog("");
      setFilteredProductBySearch([...response]);
    });
  }, []);

  const searchThoughProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    setFilteredProductBySearch(
      allProducts.filter((product) => product.title.includes(searchTerm))
    );
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search For Product"
        ref={searchInputRef}
        onChange={searchThoughProducts}
      />
      <div>
        {filteredDataProductBySearch.map((product) => (
          <ProductCard
            price={product.price}
            image={product.image}
            title={product.title}
            key={product.ID}
            deletable={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RemoveAProduct;

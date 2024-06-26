import React from "react";
import styles from "../../styles/catagories.module.css";
import Product from "../../firebase/Product";

export default function Catagories({
  name,
  color,
  allProducts,
  setFilteredProductBySearch,
}: {
  color: string;
  name: string;
  allProducts: Product[];
  setFilteredProductBySearch: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  function onCategoryClicked() {
    console.log("All");
    if (name == "all") {
      setFilteredProductBySearch([...allProducts]);
    } else {
      const allFilteredCategory = allProducts.filter(
        (product) => product.category.toLowerCase() == name.toLowerCase()
      );
      setFilteredProductBySearch([...allFilteredCategory]);
    }
  }

  return (
    <div
      className={styles.category}
      style={{ backgroundColor: color }}
      onClick={onCategoryClicked}
    >
      {getSearchSvg()} <p>{capitalize(name)}</p>
    </div>
  );
}

let capitalize = (name: string) =>
  name.charAt(0).toUpperCase().concat(name.slice(1));

let getSearchSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.searchSvg}
    viewBox="0 0 512 512"
  >
    <path
      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M338.29 338.29L448 448"
    />
  </svg>
);

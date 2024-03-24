import React, { useEffect, useState } from "react";
import styles from "../styles/body.module.css";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
import Product from "../firebase/Product";

export default function Body({
  getApi,
  getSearch,
}: {
  getApi: null | Product[];
  getSearch: String;
}): React.JSX.Element {
  let [filteredData, setFilter] = useState(getApi);

  useEffect(() => {
    if (getSearch != "" && getApi != null) {
      setFilter(() => {
        return getApi.filter((value) => {
          return value.title.toLowerCase().includes(getSearch.toLowerCase());
        });
      });
    } else {
      setFilter(getApi);
    }
  }, [getSearch, getApi]);

  return (
    <div id="body" className={styles.body}>
      {filteredData == null ? (
        <Loading color={"#fc6f03"} />
      ) : (
        filteredData.map((product, index) => (
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
  );
}

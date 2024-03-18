import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/body.module.css";
import ProductCard from "./ProductCard";
import Product from "../firebase/Product";
import GlobalContextHolder from "./ContextHolder";

export default function Body({
  getApi,
  getSearch,
}: {
  getApi: null | Product[];
  getSearch: String;
}): React.JSX.Element {
  let [filteredData, setFilter] = useState(getApi);
  let { setOpenDialog } = useContext(GlobalContextHolder);

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

  let showLoadingOrNot = () => {
    if (filteredData == null) {
      setOpenDialog(true);
      return;
    }

    setOpenDialog(false);
    return filteredData.map((value, index) => (
      <ProductCard
        key={index}
        price={value.price}
        title={value.title}
        image={value.image}
      />
    ));
  };

  return (
    <div id="body" className={styles.body}>
      {showLoadingOrNot()}
    </div>
  );
}

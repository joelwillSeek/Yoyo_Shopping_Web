import Product from "../../firebase/Product";
import {
  getAllProductsRegardlessOfCategory,
  getCategoriesList,
} from "../../firebase/firebaseBackEnd";

export const searchThoughProducts = (
  searchTerm: string,
  allProducts: Product[],
  setFilteredProductBySearch: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  setFilteredProductBySearch(
    allProducts.filter((product) => product.title.includes(searchTerm))
  );
};

export const initialSetupForSearchAbility = async (
  setFilteredProductBySearch: React.Dispatch<React.SetStateAction<Product[]>>,
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  try {
    let response = await getAllProductsRegardlessOfCategory();
    setAllProducts([...response]);
    setFilteredProductBySearch([...response]);
  } catch (e) {
    alert(e);
  }
};

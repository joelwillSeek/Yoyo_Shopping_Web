import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseSDK";

/**
 * thinking of making product a class
 */

let collectionName = "Products";

/**
 *
 * @param {{ id, title, price, image, description,category }} param
 * @returns
 */
export let addAProduct = async (product:Product) => {
  let result = false;

  try {
    await addDoc(collection(db, collectionName),product);
    result = true;
    alert("success");
  } catch (e) {
    alert(e);
  }

  return result;
};

export let removeAProduct = async (id) => {
  let result = false;

  if (id != null) {
    try {
      await deleteDoc(doc(db, collectionName, id));
      result = true;
      alert("success");
    } catch (e) {
      alert(e);
    }
  }

  return result;
};

//don't understand how to update
export let updateAProduct = async (product:Product) => {
  let result = false;

    try {
      const docRef = doc(db, collectionName, product.id);
      await updateDoc(docRef,{...product});
      result = true;
      alert("success");
    } catch (e) {
      alert(e);
    }
  

  return result;
};

//don't understand how to get all and specific docs
export let getAllProductsInCategory = async (category) => {
  let result = false;
  try {
    const queryRef = query(
      collection(db, collectionName),
      where("category", "==", category)
    );
    const docSnap = await getDocs(queryRef);

    docSnap.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    })
  } catch (e) {
    console.log(e);
  } finally {
    alert(`Error fetching all products in ${category}`);
  }
};

export let getAllProductsRegardsOfCategory = async () => {
  try {
    await getDocs(collection(db, collectionName));
  } catch (e) {
  } finally {
  }
};

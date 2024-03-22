import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  DocumentData,
  documentId,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseSDK";
import Product from "./Product";

const collectionName = "Products";

export let addAProduct = async (product: Product) => {
  let result = false;

  const { id, ...excludeId } = product;
  try {
    await addDoc(collection(db, collectionName), { ...excludeId }).then(
      (doc) => {
        console.log(doc);
      }
    );
    result = true;
    alert("success");
  } catch (e) {
    alert(e);
  }

  return result;
};

export let removeAProduct = async (product: Product) => {
  let result = false;
  try {
    await deleteDoc(doc(db, collectionName, `${product.id}`));
    result = true;
    alert("success");
  } catch (e) {
    alert(e);
  }

  return result;
};

//don't understand how to update
export let updateAProduct = async (product: Product) => {
  let result = false;

  try {
    const { id, ...excludeId } = product;

    const docRef = doc(db, collectionName, `${id}`);

    await updateDoc(docRef, { ...excludeId });
    result = true;
    alert("success");
  } catch (e) {
    alert(e);
  }

  return result;
};

//don't understand how to get all and specific docs
export let getAllProductsInCategory = async (category: String) => {
  let allProducts: Product[] = [];
  try {
    const queryRef = query(
      collection(db, collectionName),
      where("category", "==", `${category}`)
    );
    const docSnap = await getDocs(queryRef);

    docSnap.forEach((doc) => {
      let eachDoc = new Product(
        doc.data().title,
        doc.data().price,
        doc.data().image,
        doc.data().description,
        doc.data().category
      );
      eachDoc.ID = doc.id;
      allProducts.push(eachDoc);
    });
  } catch (e) {
    alert(e);
  }

  return allProducts;
};

export let getAllProductsRegardlessOfCategory = async (): Promise<
  Product[]
> => {
  let allProducts: Product[] = [];
  try {
    let queryRef = await query(collection(db, collectionName));

    (await getDocs(queryRef)).docs.forEach((doc) => {
      let eachDoc = new Product(
        doc.data().title,
        doc.data().price,
        doc.data().image,
        doc.data().description,
        doc.data().category
      );
      eachDoc.ID = doc.id;

      allProducts.push(eachDoc);
    });
  } catch (e) {
    alert(e);
  }

  return allProducts;
};

export let getCategoriesList = async (): Promise<DocumentData | null> => {
  let allCategories: DocumentData | null = null;
  let categoryCollectionName = "Other";

  try {
    const oneDoc = await doc(db, categoryCollectionName, "Categories");
    const response = (await getDoc(oneDoc)).data();

    if (response == undefined) allCategories = null;
    else allCategories = response;
  } catch (e) {
    alert(e);
  }

  console.log(allCategories);

  return allCategories;
};

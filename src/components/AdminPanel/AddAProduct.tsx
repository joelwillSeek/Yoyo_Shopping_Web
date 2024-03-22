import React, { useContext, useRef, useState } from "react";
import { addAProduct } from "../../firebase/firebaseBackEnd";
import Product from "../../firebase/Product";
import GlobalContextHolder from "../ContextHolder";
import styles from "../../styles/addaproduct.module.css";
import { imageRef, storage } from "../../firebase/firebaseSDK";
import { v4 } from "uuid";
import {
  UploadTask,
  UploadTaskSnapshot,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import uploadIcon from "../../assets/upload.svg";

/**
 *
 * when pressing add button the loading dialog doesn't appear
 */

export default function AddAProduct() {
  let titleRef = useRef(null);
  let descriptionRef = useRef(null);
  let priceRef = useRef(null);
  let categoryRef = useRef(null);
  let imageLabelRef = useRef(null);

  let { setOpenDialog } = useContext(GlobalContextHolder);
  let [image, setImage] = useState<FileList | null>();

  let addButtonClicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (image == null) {
      alert("Didn't pick image");
      return;
    }

    setOpenDialog("Uploading New Product");

    const referenceForImage = await imageRef(
      storage,
      `ProductImage/${image[0].name + v4() + image[0].type}`
    );

    let response = uploadBytesResumable(referenceForImage, image[0]);

    const showProgress = (snapShot: UploadTaskSnapshot) =>
      (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

    await response.on(
      "state_changed",
      (snapShot) => {
        console.log(showProgress(snapShot));
      },
      (error) => {
        setOpenDialog("");
        alert(error);
      },
      () => {
        getDownloadURL(response.snapshot.ref).then((passedUrl) => {
          if (passedUrl == "") {
            alert("image url not found from web");
            // setOpenDialog(false);
            return;
          }

          createAndAddTheProduct(passedUrl);
        });
      }
    );

    let createAndAddTheProduct = (url: string) => {
      let title: HTMLInputElement = titleRef.current!;
      let price: HTMLInputElement = priceRef.current!;
      let category: HTMLInputElement = categoryRef.current!;
      let description: HTMLInputElement = descriptionRef.current!;

      let newProduct = new Product(
        title.value,
        parseFloat(price.value),
        url,
        description.value,
        category.value
      );

      addAProduct(newProduct).then(() => setOpenDialog(""));
    };
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let innerImage = event.target.files;

    if (innerImage == null) {
      alert("Didn't pick image or image doesn't exist.");
      return;
    }

    const LabelForImageFileUploader: HTMLLabelElement = imageLabelRef.current!;

    var url = URL.createObjectURL(innerImage[0]);

    LabelForImageFileUploader.style.backgroundImage = `url(${url})`;

    setImage(innerImage);
  };

  return (
    <form className={styles.wholeForm}>
      <label
        htmlFor="file"
        ref={imageLabelRef}
        className={styles.labelForFileSelected}
        style={{ backgroundImage: `url(${uploadIcon})` }}
      ></label>
      <input
        type="file"
        onChange={uploadImage}
        id="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        style={{ display: "none" }}
      />
      <input type="text" placeholder="Title" ref={titleRef} />
      <input type="text" placeholder="Description" ref={descriptionRef} />
      <input type="number" placeholder="Price" ref={priceRef} />
      <input type="text" placeholder="Category" ref={categoryRef} />
      <button onClick={addButtonClicked}>Add</button>
    </form>
  );
}

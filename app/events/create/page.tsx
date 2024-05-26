'use client'

import "../../ui/globals.css";
import "../../ui/page.module.css"
import style from "../../ui/createEvents.module.css"
import { createEvent } from "../../../lib/actions";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";


const isValidUrl = (url:string) => {
  try {
      new URL(url);
      const regex = /^(?:http|https):\/\/*./;
      return regex.test(url);
  } catch (_) {
      return false;
  }
};

export default function CreateEvent() {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageValid, setIsImageValid] = useState(false);
  const [formatNotAccepted, setIsAccepted] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const handleImageChange = useDebouncedCallback((img: string) => {
    if (isValidUrl(img)) {
      setImageUrl(img);
      setIsImageValid(isValidUrl(img));
      setIsAccepted(false);
      setErrorImage(false)
    }
    else {
      setIsImageValid(isValidUrl(img));
      if (img === '') {
        setIsAccepted(false);
      } else {
        setIsAccepted(true);
      }
    }
  }, 500)

  const handleImageError = () => {
    setErrorImage(true)
  }

  return (
      <div className={style.container}>
          <div className={style.formBox}>
              <h2 className={style.headerForm}>Create Event</h2>
              <form action={createEvent}>
                  <label className={style.label}>
                      Name:
                      <input type="text" name="name" required className={style.input} />
                  </label>
                  <br />
                  <label className={style.label}>
                      Description:
                      <input type="text" name="description" required className={style.input} />
                  </label>
                  <br />
                  <label className={style.label}>
                      Image(URL):
                      <input 
                          type="text" 
                          name="image" 
                          required 
                          className={style.input} 
                          onChange={(event) => handleImageChange(event.target.value)}
                      />
                  </label>
                  {imageUrl && isImageValid && (
                  <div className={style.imagePreview}>
                      <img src={imageUrl} onError={handleImageError} alt="Image preview" className={style.image}/>
                  </div>)}
                  {formatNotAccepted ? <p className={style.notImg}>Format not accepted</p> : null}
                  <br />
                  <label className={style.label}>
                      Ubication:
                      <input type="text" name="ubication" required className={style.input} />
                  </label>
                  <br />
                  {(isImageValid && !errorImage) ? <button type="submit" className={style.send}>Enviar</button> : 
                  <button type="submit" disabled className={style.send}>Enviar</button>}
              </form>
          </div>
      </div>
  );
}
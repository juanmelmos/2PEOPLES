import { useState } from 'react';
import style from '../ui/createEvents.module.css';
import { useDebouncedCallback } from "use-debounce";

interface Event {
  id: number;
  image: string;
  description: string;
  resum: string;
  name: string;
  ubication: string;
  owner: number;
  participants: number[];
}

interface EditEventFormProps {
  event: Event;
  onSave: (updatedEvent: Event) => void;
  onCancel: () => void;
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    const regex = /^(?:http|https):\/\/*./;
    return regex.test(url);
  } catch (_) {
    return false;
  }
};

export default function EditEventForm({ event, onSave, onCancel }: EditEventFormProps) {
  const [formData, setFormData] = useState({ ...event });
  const [imageUrl, setImageUrl] = useState(event.image);
  const [isImageValid, setIsImageValid] = useState(true);
  const [formatNotAccepted, setIsAccepted] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

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
    <form onSubmit={handleSubmit} className={style.editForm}>
      <label className={style.label}>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          className={style.input}
          onChange={handleChange}
        />
      </label>
      <label className={style.label}>
        Resum:
        <input
          type="text"
          name="resum"
          value={formData.resum}
          className={style.input}
          onChange={handleChange}
        />
      </label>
      <label className={style.label}>
        Description:
        <textarea
          name="description"
          value={formData.description}
          className={style.input}
          rows={5}
          cols={140}
          onChange={handleChange}
        />
      </label>
      <label className={style.label}>
        Ubication:
        <input
          type="text"
          name="ubication"
          value={formData.ubication}
          className={style.input}
          onChange={handleChange}
        />
      </label>
      <label className={style.label}>
        Image(URL):
        <input
          type="text"
          name="image"
          defaultValue={formData.image}
          required
          className={style.input}
          onChange={(event) => handleImageChange(event.target.value)}
        />
      </label>
      <div className={style.imgButtonsContainer}>
        {imageUrl && isImageValid && (
          <div className={style.imagePreview}>
            <img src={imageUrl} onError={handleImageError} alt="Image preview" className={style.imageEdit} />
          </div>)}
        {formatNotAccepted ? <p className={style.notImg}>Format not accepted</p> : null}
        <br />
          {(isImageValid && !errorImage) ? <button type="submit" className={style.save}>Save</button> :
            <button type="submit" disabled className={style.save}>Save</button>}
          <button type="button" className={style.cancel} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { updateUser } from "@/services/users/users.service";

export default function ModalEmail() {
  const [modal, setModal] = useState(false);
  const [newEmail, setEmail] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  const textBoxRef = useRef<HTMLInputElement | null>(null);

  const handleValidation = async () => {
    if (textBoxRef.current) {
      const textboxValue = textBoxRef.current.value;
      const userJSON = localStorage.getItem("user");
      let id;
      let email;
      if (userJSON) {
        const user = JSON.parse(userJSON);
        id = user.id;
        email = user.email
      }
      try {
        const response = await updateUser({
          email: email,
          newemail: textboxValue,
          id: id,
        });
        const userString = localStorage.getItem("user");

        if (userString) {
          const user = JSON.parse(userString);
          user.email = textboxValue;
          localStorage.setItem("user", JSON.stringify(user));
        }

        toggleModal();
        window.location.reload();
      } catch (error) {
        console.log("Erreur dans le changement de nom");
      }
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.btnmodal}>
        <BsFillPencilFill />
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalcontent}>
            <button className={styles.closemodal} onClick={toggleModal}>
              X
            </button>
            <p className={styles.newPassword}>Nouveau Email</p>
            <input
              ref={textBoxRef}
              type="text"
              placeholder="Nouveau email"
              className={styles.textbox}
              value={newEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleValidation} className={styles.BtnValider}>
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { updateUser } from "@/services/users/users.service";

export default function ModalUsername() {
  const [modal, setModal] = useState(false);
  const [newUsername, setUsername] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  const textBoxRef = useRef<HTMLInputElement | null>(null);

  const handleValidation = async () => {
    if (textBoxRef.current) {
      const textboxValue = textBoxRef.current.value;
      const userJSON = localStorage.getItem("user");
      let email;
      let id;
      if (userJSON) {
        const user = JSON.parse(userJSON);
        email = user.email;
        id = user.id;
      }
      try {
        const response = await updateUser({
          username: textboxValue,
          email: email,
          id: id,
        });
        const userString = localStorage.getItem("user");

        if (userString) {
          const user = JSON.parse(userString);
          user.username = textboxValue;
          localStorage.setItem("user", JSON.stringify(user));
        }

        toggleModal();
        window.location.reload();
      } catch (error) {
        console.log("erreur pour changer de nom");
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
            <p className={styles.newPassword}>Nouveau Username</p>
            <input
              ref={textBoxRef}
              type="text"
              placeholder="Nouveau Nom d'utilisateur"
              className={styles.textbox}
              value={newUsername}
              onChange={(e) => setUsername(e.target.value)}
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

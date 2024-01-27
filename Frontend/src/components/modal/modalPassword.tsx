import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { updateUser } from "@/services/users/users.service";

export default function ModalPassword() {
  const [modal, setModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  const textBoxOldRef = useRef<HTMLInputElement | null>(null);
  const textBoxNewRef = useRef<HTMLInputElement | null>(null);

  const handleValidation = async () => {
    if (textBoxNewRef.current && textBoxOldRef.current) {
      const textboxNewValue = textBoxNewRef.current.value;
      const textBoxOldValue = textBoxOldRef.current.value;
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
          oldpassword: textBoxOldValue,
          newpassword: textboxNewValue,
          email: email,
          id: id,
        });
        const userString = localStorage.getItem("user");

        // if (userString) {
        //   const user = JSON.parse(userString);
        //   user.password = textboxNewValue;
        //   localStorage.setItem("user", JSON.stringify(user));
        // }

        if (userString) {
          const user = JSON.parse(userString);
          const maskedValue = "*".repeat(textboxNewValue.length);
          user.password = maskedValue;
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
            <p className={styles.newPassword}>Nouveau Password</p>

            <div className={styles.textboxContainer}>
              <input
                ref={textBoxOldRef}
                type="text"
                placeholder="Ancien mot de passe"
                className={styles.textbox}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className={styles.textboxContainer}>
              <input
                ref={textBoxNewRef}
                type="text"
                placeholder="Nouveau mot de passe"
                className={styles.textbox}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button onClick={handleValidation} className={styles.BtnValider}>
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  );
}

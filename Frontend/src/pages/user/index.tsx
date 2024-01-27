import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import router from "next/router";
import ModalNom from "@/components/modal/modalname";
import ModalFirstName from "@/components/modal/modalFirstName";
import ModalUsername from "@/components/modal/modalUsername";
import ModalAge from "@/components/modal/modalAge";
import ModalPassword from "@/components/modal/modalPassword";
import ModalTelephone from "@/components/modal/modalTelephone";
import ModalEmail from "@/components/modal/modalEmail";
import ModalSexe from "@/components/modal/modalSexe";
import { deleteUser } from "@/services/users/users.service";
import MetaData from "@/components/metadatas";

export default function Moncompte() {
  const [userUserName, setUserUserName] = useState("");
  const [userEmail, setUserNameEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userTelephone, setUserTelephone] = useState("");
  const [userage, setUserAge] = useState("");
  const [usersexe, setUserSexe] = useState("");
  const [userpassword, setPassword] = useState("");

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      if (user && user.username) {
        setUserUserName(user.username);
      }
      if (user && user.email) {
        setUserNameEmail(user.email);
      }
      if (user && user.name) {
        setUserName(user.name);
      }
      if (user && user.firstname) {
        setUserFirstName(user.firstname);
      }
      if (user && user.telephone) {
        setUserTelephone(user.telephone);
      }
      if (user && user.age) {
        setUserAge(user.age);
      }
      if (user && user.sexe) {
        setUserSexe(user.sexe);
      }
      if (user && user.password) {
        setPassword(user.password);
      }
    }
  }, []);

  const handleLogout = () => {
			localStorage.removeItem("user");
			router.push("/");
		};
		const userDelete = async () => {
			try {
				const userJSON = localStorage.getItem("user");
				let email;
				if (userJSON) {
					const user = JSON.parse(userJSON);
					email = user.email;
				}
				const response = await deleteUser({ email: email });
				localStorage.removeItem("user");

				router.reload();
			} catch (error) {
				console.error(error);
			}
		};
  return (
    <div>
      <Header />
      <MetaData />
      <div className="h-[80vh]">
        <h1 className="text-5xl w-1/2 mx-auto pb-4  mt-16 mb-8 text-center border-b-4 border-[#61A35B]">
          Profil
        </h1>

        <h2 className="text-2xl text-center w-1/3 mx-auto pb-4 mt-24 mb-4 border-b-4 border-[#61A35B]">
          Mon Compte
        </h2>

        <div className="flex text-[#61A35B] mx-auto w-1/2 items-center gap-8 justify-center mt-8">
          <div className="w-1/2 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Nom : {userName}
            </p>
            <ModalNom />
          </div>
          <div className="w-1/2 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Prénom : {userFirstName}
            </p>
            <ModalFirstName />
          </div>
        </div>

        <div className="flex items-center w-1/2 mx-auto mt-12 justify-center text-[#61A35B] gap-8">
          <div className="w-1/2 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Nom d&apos;utilisateur :{userUserName}
            </p>
            <ModalUsername />
          </div>
          <div className="w-1/6 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Age : {userage}
            </p>
            <ModalAge />
          </div>
          <div className="w-1/6 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Sexe :{usersexe}
            </p>
            <ModalSexe />
          </div>
        </div>

        <div className="flex text-[#61A35B] items-center gap-8 justify-center mt-8">
          <div className="w-1/4 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Password : {userpassword}
            </p>
            <ModalPassword />
          </div>

          <div className="w-1/4 flex">
            <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
              Téléphone : {userTelephone}
            </p>
            <ModalTelephone />
          </div>
        </div>

        <div className="flex text-[#61A35B] mx-auto items-center w-1/3 gap-8 justify-center mt-8">
          <p className="border-[1px] rounded-lg py-2 px-2 border-[#61A35B] w-full">
            Email : {userEmail}
          </p>
          <ModalEmail />
        </div>
        <div className="flex gap-5 justify-center mt-4">
          <div className="flex items-center gap-8 justify-center mt-8">
            <Link
              href={"../"}
              onClick={handleLogout}
              className="px-8 bg-red-400 text-white rounded-lg py-2"
            >
              Me déconnecter
            </Link>
          </div>

          <div className="flex items-center gap-8 justify-center mt-8">
            <Link
              href={"../"}
              onClick={userDelete}
              className="px-8 bg-red-600 text-white rounded-lg py-2"
            >
              Supprimer mon compte
            </Link>
          </div>
        </div>

        <div />
      </div>

      <Footer />
    </div>
  );
}

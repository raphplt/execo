import Footer from "@/components/footer";

import Header from "@/components/header";
import Buttn from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Button from "@mui/material/Button";

const customButtonStyle = {
  backgroundColor: "green",
  color: "white",
  "&:hover": {
    backgroundColor: "green",
    color: "white",
  },
};

export default function Help() {
  const [emailError, setEmailError] = useState(false);
  const [sujetError, setSujetError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    // Récupérez la valeur des champs
    const emailValue = e.target.email_from.value;
    const sujetValue = e.target.sujet.value;
    const messageValue = e.target.message.value;

    // Vérifiez si l'adresse mail est vide
    if (!emailValue) {
      setEmailError(true);
      return; // Arrêtez ici si l'e-mail est vide
    } else {
      setEmailError(false);
    }

    // Vérifiez si le sujet n'est pas "Choisir un sujet"
    if (sujetValue === "choix") {
      setSujetError(true);
      return; // Arrêtez ici si le sujet n'est pas sélectionné
    } else {
      setSujetError(false);
    }

    // Vérifiez si l'e-mail est vide
    if (!messageValue) {
      setMessageError(true);
      return; // Arrêtez ici si l'e-mail est vide
    } else {
      setMessageError(false);
    }

    // Si tous les champs sont valides, envoyez l'e-mail
    emailjs
      .sendForm(
        "service_hgd02m2",
        "template_guie3fl",
        e.target,
        "58CS4dTOp6DHnT2vi"
      )
      .then((response) => {
        e.target.email_from.value = "";
        e.target.sujet.value = "choix";
        e.target.message.value = "";
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        // Ajoutez ici le code à exécuter en cas d'échec de l'envoi
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E7F1E6]">
      <Header />

      <div className="flex-grow">
        <h2 className="mb-16 mt-28 py-5 px-16 rounded-xl text-xl w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
          Veuillez rentrer votre message
        </h2>
        <form
          className="flex flex-col w-1/2 mx-auto bg-gray-200 p-5 rounded-lg"
          onSubmit={sendEmail}
        >
          <div className="flex items-center mb-5">
            <label htmlFor="emailFrom" className="font-semibold mr-3">
              Email :
            </label>
            <input
              type="text"
              name="email_from"
              id="emailFrom"
              className={`border-none rounded-md p-2 resize-vertical outline-none box-border border-b-3 border-transparent flex-grow bg-[#E7F1E6] ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="person@example.com"
            />
          </div>
          {emailError && (
            <p className="text-red-500">
              Veuillez entrer une adresse e-mail valide.
            </p>
          )}

          <div className="flex items-center mb-5">
            <label htmlFor="sujet" className="font-semibold mr-3">
              Sujet :
            </label>
            <select
              name="sujet"
              id="sujet"
              className={`border-none rounded-md p-2 outline-none box-border border-b-3 border-transparent flex-grow bg-[#E7F1E6] ${
                sujetError ? "border-red-500" : ""
              }`}
            >
              <option value="choix">Choisir un sujet</option>
              <option value="Sujet1">Sujet 1</option>
              <option value="Sujet2">Sujet 2</option>
              <option value="Sujet3">Sujet 3</option>
              <option value="Sujet4">Sujet 4</option>
              <option value="Sujet5">Sujet 5</option>
            </select>
          </div>
          {sujetError && (
            <p className="text-red-500">Veuillez sélectionner un sujet.</p>
          )}
          <div className="flex items-start mb-5">
            <label htmlFor="message" className="font-semibold mr-3">
              Message :
            </label>
            <textarea
              name="message"
              id="message"
              className={`border-none rounded-md p-2 resize-vertical outline-none box-border border-b-3 border-transparent flex-grow h-[30rem] bg-[#E7F1E6] ${
                messageError ? "border-red-500" : ""
              }`}
              placeholder="Entrez le contenu de votre message ici "
            ></textarea>
          </div>
          {messageError && (
            <p className="text-red-500">Veuillez entrer un message.</p>
          )}
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className="self-center text-black mt-5"
            sx={customButtonStyle}
            type="submit"
          >
            Envoyer
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

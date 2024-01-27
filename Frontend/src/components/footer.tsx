import React from "react";
import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function Footer() {
  return (
    <footer className="bg-[#326C2D] text-white py-6 pb-12 bottom-0 w-full">
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mx-auto w-11/12">
          <div className="px-4 mt-2 flex flex-col gap-1">
            <h2 className="text-xl  mb-2">Execo</h2>
            <Image
              src={require("../../public/assets/ecoscoreLogo.png")}
              alt="logo"
              width={70}
              height={70}
              className="w-16 sm:w-20 mt-2"
            />
          </div>
          <div className="px-4 ">
            <h2 className="text-lg font-semibold mb-2">Pages</h2>
            <ul className="list-disc  flex flex-col gap-1 text-gray-300">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/">Accueil</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/decouvrir">Découvrir</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/comparatif">Comparatif</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/forum">Forum</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/quiz">Quiz</Link>
              </li>
            </ul>
          </div>
          <div className="px-4">
            <h2 className="text-lg font-semibold mb-2">
              En savoir plus sur Ecoscore
            </h2>
            <ul className="list-disc flex flex-col gap-1 text-gray-300">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/sitemap">Qui sommes nous ?</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/affiliations">Affiliations</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/engagements">Nos engagements</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/help">Besoin d&apos;aide</Link>
              </li>
            </ul>
            <ul className="list-disc pl-3"></ul>
          </div>
          <div className="px-4">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <ul className="list-disc  flex flex-col gap-2 text-gray-300">
              <li className="transform  flex gap-2 hover:translate-x-2 transition-transform duration-300 ">
                <AlternateEmailIcon />
                <p>execo@contact.com</p>
              </li>
              <li className="transform  hover:translate-x-2 transition-transform duration-300 ">
                <a
                  href="https://www.instagram.com/raph.otos/"
                  target="_blank"
                  className="flex gap-2"
                >
                  <InstagramIcon />
                  <p>@Execo</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-20 font-semibold">
          Copyright © {new Date().getFullYear()} Execo. Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

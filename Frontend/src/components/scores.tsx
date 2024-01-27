import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { gray } from "tailwindcss/colors";

export default function Score(props: any) {
  const [factor, setFactor] = useState(50);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/comparatif") {
      setFactor(40);
    }
  }, [router.pathname]);

  function calcBgColor(score: number) {
    if (score > 7) {
      return "#53C66C";
    } else if (score > 4) {
      return "#EEAA5A";
    } else {
      return "#E15C5C";
    }
  }

  function calcBgColorDas(score: number) {
    if (score < 0.7) {
      return "#53C66C";
    } else if (score > 0.7 && score < 1.4) {
      return "#EEAA5A";
    } else {
      return "#E15C5C";
    }
  }

  return (
    <div className="flex flex-col gap-2 border-[1px] border-gray-500 drop-shadow-sm rounded-lg py-4 px-4">
      {props.ecology && props.ecology.indice_de_reparabilite ? (
        <div>
          <p className="text-sm mb-1">Réparabilité :</p>
          <div className="flex gap-2 items-center ">
            <Image
              src={require("../../public/assets/icons/icon-reparabilite.png")}
              alt="Icone réparabilité"
              className="w-6 h-6"
            />
            <div
              className="w-6 h-3 rounded-full bg-lime-500"
              style={{
                width: factor * props.ecology.indice_de_reparabilite,
                background: calcBgColor(props.ecology.indice_de_reparabilite),
              }}
            ></div>
            <p className="text-sm">{props.ecology.indice_de_reparabilite}/10</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm mb-1">Réparabilité :</p>
          <div className="flex gap-2 items-center ">
            <Image
              src={require("../../public/assets/icons/icon-reparabilite.png")}
              alt="Icone réparabilité"
              className="w-6 h-6"
            />
            <div
              className="w-6 h-3 rounded-full bg-lime-500"
              style={{
                width: 40,
                background: gray[300],
              }}
            ></div>
            <p className="text-sm">NA/10</p>
          </div>
        </div>
      )}
      {props.tech && props.tech.das_tete ? (
        <div>
          <p className="text-sm mb-1">DAS tête :</p>
          <div className="flex gap-2 items-center ">
            <Image
              src={require("../../public/assets/icons/icon-das.png")}
              alt="Icone DAS"
              className="w-6 h-6"
            />
            <div
              className="w-6 h-3 rounded-full bg-lime-500"
              style={{
                width: factor * props.tech.das_tete * 5,
                background: calcBgColorDas(props.tech.das_tete),
              }}
            ></div>
            <p className="text-sm line-clamp-1">{props.tech.das_tete} W/kg</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm mb-1">DAS tête :</p>
          <div className="flex gap-2 items-center ">
            <Image
              src={require("../../public/assets/icons/icon-das.png")}
              alt="Icone DAS"
              className="w-6 h-6"
            />
            <div
              className="w-6 h-3 rounded-full bg-lime-500"
              style={{
                width: 40,
                background: gray[300],
              }}
            ></div>
            <p className="text-sm line-clamp-1">NA W/kg</p>
          </div>
        </div>
      )}
      {props.tech && props.tech.batterie ? (
        <div>
          <p className="text-sm mb-1">Batterie :</p>
          <div className="flex gap-2 items-center">
            <Image
              src={require("../../public/assets/icons/icon-battery.png")}
              alt="Icone batterie"
              className="w-6 h-6"
            />
            <div
              className="w-6 h-3 rounded-full bg-lime-500"
              style={{
                width: factor * (props.tech.batterie / 500),
                background: calcBgColor(props.tech.batterie),
              }}
            ></div>
            <p className="text-sm line-clamp-1">{props.tech.batterie} mAh</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm mb-1">Batterie :</p>
          <div className="flex gap-2 items-center ">
            <Image
              src={require("../../public/assets/icons/icon-battery.png")}
              alt="Icone batterie"
              className="w-6 h-6"
            />
            <div
              className="w-6 h-3 rounded-full bg-lime-500"
              style={{
                width: 40,
                background: gray[300],
              }}
            ></div>
            <p className="text-sm">NA / mAh</p>
          </div>
        </div>
      )}
    </div>
  );
}

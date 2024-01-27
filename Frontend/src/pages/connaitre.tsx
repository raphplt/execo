import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from 'next/image';


export default function Connaitre() {

    return (
      <div className="bg-[#E7F1E6]">
        <Header />
        <div className="pb-16">
          <h2 className="mb-16 mt-28 py-5 px-16 rounded-xl text-xl w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
            Mieux connaitre les fondateurs d&apos;Execo et leur parcours
          </h2>
          <div className="flex items-center justify-evenly mt-28">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className=" rounded-[50%] bg-[#579452] text-white w-28 h-28 flex flex-col items-center shadow-md justify-center">
                <p className=" text-4xl ">5</p>
                <p className="">Dévelopeurs</p>
              </div>
              <div className="py-1 px-2  rounded-xl text-lg w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
                Junior derrière la création de Execo
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <div className=" rounded-[50%] bg-[#579452] text-white w-28 h-28 flex flex-col items-center shadow-md justify-center">
                <p className=" text-4xl ">1</p>
                <p className="">Année</p>
              </div>
              <div className="py-1 px-2  rounded-xl text-lg w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
                De travail en parrallel de leurs études
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 w-full gap-y-48 mb-24 mt-16">
          <div className="mx-auto w-2/3">
            <div className=" text-left mt-5 backdrop-blur-sm bg-white/30 rounded-xl py-8 px-24">
              <h2 className="text-2xl mb-4">
                PLASSART Raphaël
                <br />
                Chef de Projet
                <br />
                Developeur Fullstack
                <br />
              </h2>
              Coucou c&apos;est moi Saviez-vous que nos habitudes de
              consommation en ligne ont un impact considérable sur
              l&apos;environnement ? L&apos;achat en ligne est en constante
              augmentation, mais cette pratique n&apos;est malheureusement pas
              sans conséquences sur notre planète. Selon des études récentes, le
              commerce électronique est responsable d&apos;une augmentation
              significative des émissions de gaz à effet de serre. Rien
              qu&apos;au cours de l&apos;année dernière, les livraisons de colis
              ont généré près de 10% des émissions totales de CO2 dans certains
              pays. Il est temps de prendre conscience de l&apos;empreinte
              écologique de nos achats en ligne et de réfléchir à des solutions
              pour consommer de manière plus responsable
            </div>
          </div>
          <Image
            src={require("../../public/assets/index/raph.jpg")}
            alt="Photo Raph"
            className="mx-auto border-4 rounded-[50%] border-secondary-color"
          />

          <Image
            src={require("../../public/assets/index/lucas.jpg")}
            alt="Photo Lucas"
            className="mx-auto border-4 rounded-[50%] border-secondary-color"
          />
          <div className="mx-auto w-2/3">
            <div className=" text-left mt-5 backdrop-blur-sm bg-white/30 rounded-xl py-8 px-24">
              <h2 className="text-2xl mb-4">
                Lucas AYMARD <br />
                Developeur Fullstack
              </h2>
              Saviez-vous que nos habitudes de consommation en ligne ont un
              impact considérable sur l&apos;environnement ? L&apos;achat en
              ligne est en constante augmentation, mais cette pratique
              n&apos;est malheureusement pas sans conséquences sur notre
              planète. Selon des études récentes, le commerce électronique est
              responsable d&apos;une augmentation significative des émissions de
              gaz à effet de serre. Rien qu&apos;au cours de l&apos;année
              dernière, les livraisons de colis ont généré près de 10% des
              émissions totales de CO2 dans certains pays. Il est temps de
              prendre conscience de l&apos;empreinte écologique de nos achats en
              ligne et de réfléchir à des solutions pour consommer de manière
              plus responsable
            </div>
          </div>

          <div className="mx-auto w-2/3">
            <div className=" text-left mt-5 backdrop-blur-sm bg-white/30 rounded-xl py-8 px-24">
              <h2 className="text-2xl mb-4">
                Clément SCHOBERT
                <br />
                Developeur Fullstack
              </h2>
              Saviez-vous que nos habitudes de consommation en ligne ont un
              impact considérable sur l&apos;environnement ? L&apos;achat en
              ligne est en constante augmentation, mais cette pratique
              n&apos;est malheureusement pas sans conséquences sur notre
              planète. Selon des études récentes, le commerce électronique est
              responsable d&apos;une augmentation significative des émissions de
              gaz à effet de serre. Rien qu&apos;au cours de l&apos;année
              dernière, les livraisons de colis ont généré près de 10% des
              émissions totales de CO2 dans certains pays. Il est temps de
              prendre conscience de l&apos;empreinte écologique de nos achats en
              ligne et de réfléchir à des solutions pour consommer de manière
              plus responsable
            </div>
          </div>
          <Image
            src={require("../../public/assets/index/clement.jpg")}
            alt="Photo Clément"
            className="mx-auto border-4 rounded-[50%] border-secondary-color"
          />

          <Image
            src={require("../../public/assets/index/diego.jpg")}
            alt="Photo Diego"
            className="mx-auto border-4 rounded-[50%] border-secondary-color"
          />
          <div className="mx-auto w-2/3">
            <div className=" text-left mt-5 backdrop-blur-sm bg-white/30 rounded-xl py-8 px-24">
              <h2 className="text-2xl mb-4">
                Diego PLA FORTEA
                <br />
                Developeur Fullstack
              </h2>
              Saviez-vous que nos habitudes de consommation en ligne ont un
              impact considérable sur l&apos;environnement ? L&apos;achat en
              ligne est en constante augmentation, mais cette pratique
              n&apos;est malheureusement pas sans conséquences sur notre
              planète. Selon des études récentes, le commerce électronique est
              responsable d&apos;une augmentation significative des émissions de
              gaz à effet de serre. Rien qu&apos;au cours de l&apos;année
              dernière, les livraisons de colis ont généré près de 10% des
              émissions totales de CO2 dans certains pays. Il est temps de
              prendre conscience de l&apos;empreinte écologique de nos achats en
              ligne et de réfléchir à des solutions pour consommer de manière
              plus responsable
            </div>
          </div>

          <div className="mx-auto w-2/3">
            <div className=" text-left mt-5 backdrop-blur-sm bg-white/30 rounded-xl py-8 px-24">
              <h2 className="text-2xl mb-4">
                Rémy Penichon
                <br />
                Developeur Fullstack
                <br />
                UI/UX Designer
              </h2>
              Saviez-vous que nos habitudes de consommation en ligne ont un
              impact considérable sur l&apos;environnement ? L&apos;achat en
              ligne est en constante augmentation, mais cette pratique
              n&apos;est malheureusement pas sans conséquences sur notre
              planète. Selon des études récentes, le commerce électronique est
              responsable d&apos;une augmentation significative des émissions de
              gaz à effet de serre. Rien qu&apos;au cours de l&apos;année
              dernière, les livraisons de colis ont généré près de 10% des
              émissions totales de CO2 dans certains pays. Il est temps de
              prendre conscience de l&apos;empreinte écologique de nos achats en
              ligne et de réfléchir à des solutions pour consommer de manière
              plus responsable
            </div>
          </div>
          <Image
            src={require("../../public/assets/index/remy.jpg")}
            alt="Photo Rémy"
            className="mx-auto border-4 rounded-[50%] border-secondary-color"
          />
        </div>
        <Footer />
      </div>
    );
}
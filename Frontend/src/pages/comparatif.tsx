/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import SearchBarTiny from "@/components/searchBarTiny";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetails from "@/components/utils/productDetails";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SearchBar from "@/components/searchBar";

export default function Comparatif() {
  const [datas1, setDatas1]: any = useState([]);
  const [datas2, setDatas2]: any = useState([]);
  const router = useRouter();
  const [borderColor1, setBorderColor1] = useState("white");
  const [borderColor2, setBorderColor2] = useState("white");
  const [bgColor1, setBgColor1] = useState("white");
  const [bgColor2, setBgColor2] = useState("white");

  useEffect(() => {
    const item: any = localStorage.getItem("compare");
    setDatas1(JSON.parse(item));
  }, []);

  useEffect(() => {
    const item: any = localStorage.getItem("compare2");
    setDatas2(JSON.parse(item));
  }, []);

  const clearDatas1 = () => {
    localStorage.removeItem("compare");
    setDatas1([]);
    router.reload();
  };

  const clearDatas2 = () => {
    localStorage.removeItem("compare2");
    setDatas2([]);
    router.reload();
  };

  useEffect(() => {
    if (datas1 && datas2) {
      if (
        datas1.scoreEnergy + datas1.scoreCarbon + datas1.scoreRepair >
        datas2.scoreEnergy + datas2.scoreCarbon + datas2.scoreRepair
      ) {
        setBorderColor1("var(--scores-green)");
        setBorderColor2("var(--scores-red)");
        setBgColor1("var(--scores-green-secondary)");
        setBgColor2("var(--scores-red-secondary)");
      } else if (
        datas1.scoreEnergy + datas1.scoreCarbon + datas1.scoreRepair <
        datas2.scoreEnergy + datas2.scoreCarbon + datas2.scoreRepair
      ) {
        setBorderColor1("var(--scores-red)");
        setBorderColor2("var(--scores-green)");
        setBgColor1("var(--scores-red-secondary)");
        setBgColor2("var(--scores-green-secondary)");
      } else if (
        datas1.scoreEnergy + datas1.scoreCarbon + datas1.scoreRepair ===
        datas2.scoreEnergy + datas2.scoreCarbon + datas2.scoreRepair
      ) {
        setBorderColor1("scores-blue");
        setBorderColor2("scores-blue");
        setBgColor1("var(--scores-blue-secondary)");
        setBgColor2("var(--scores-blue-secondary)");
      }
    } else {
      setBorderColor1("white");
      setBorderColor2("white");
      setBgColor1("white");
      setBgColor2("white");
    }
  }, [datas1, datas2]);

  return (
    <div className="">
      <Header />
      <MetaData />
      <div
        className="sm:w-3/5 w-full py-8 mx-auto sm:shadow-md
       sm:bg-gray-200 sm:mt-12 mt-1 mb-32 sm:rounded-lg "
      >
        <div className="sm:mb-12 sm:mt-12">
          {!datas1 && !datas2 ? <SearchBar /> : <></>}
        </div>
        <div className="flex mx-auto w-full sm:w-11/12">
          <div className="sm:w-2/5 w-1/2 flex mx-auto flex-col">
            {!datas1 && datas2 ? (
              <div>
                <div className="text-center text-lg mb-6">
                  Choisir un produit à comparer
                </div>
                <SearchBarTiny />
              </div>
            ) : (
              datas1 && (
                <div
                  className="text-center bg-slate-100 py-4 border-2 sm:drop-shadow-md sm:px-10 sm:rounded-lg mb-5"
                  style={{
                    borderColor: borderColor1,
                    backgroundColor: bgColor1,
                  }}
                >
                  <button
                    onClick={clearDatas1}
                    className="bg-slate-300 flex gap-2 items-center my-2 rounded-2xl py-1 sm:drop-shadow-sm px-2 sm:px-5 w-fit mx-auto"
                  >
                    <p className="text-sm">Modifier le produit</p>
                    <SwapHorizIcon />
                  </button>
                  <ProductDetails data={datas1} />
                </div>
              )
            )}
          </div>
          <div className="sm:w-2/5 w-1/2 flex mx-auto flex-col ">
            {!datas2 && datas1 ? (
              <div>
                <div className="text-center text-lg mb-6">
                  Choisir un produit à comparer
                </div>
                <SearchBarTiny />
              </div>
            ) : (
              datas2 && (
                <div
                  className="text-center sm:drop-shadow-md bg-slate-200 py-4 border-2 sm:px-10 sm:rounded-lg mb-5"
                  style={{
                    borderColor: borderColor2,
                    backgroundColor: bgColor2,
                  }}
                >
                  <button
                    onClick={clearDatas2}
                    className="bg-slate-300 flex my-2 gap-2 items-center rounded-2xl py-1 sm:drop-shadow-sm px-2 sm:px-5 w-fit mx-auto"
                  >
                    <p className="text-sm">Modifier le produit</p>
                    <SwapHorizIcon />
                  </button>
                  <ProductDetails data={datas2} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

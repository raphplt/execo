/* eslint-disable @next/next/no-img-element */
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import ProductCardSquare from "@/components/productCardSquare";
import Score from "@/components/scores";
import {
  fetchProduct,
  fetchProducts,
} from "@/services/products/products.service";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Product() {
  const [data, setData]: any = useState([]);
  const [datas, setDatas]: any = useState([]);
  const router = useRouter();
  let { pid }: any = router.query;

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchProduct(pid);
      setData(result);
    };
    fetch();
  }, [pid]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchProducts();
      setDatas(result);
    };
    fetchData();
  }, []);

  const formatLabel = (label: any) => {
    return label
      .replace(/_/g, " ")
      .replace(/^\w/, (firstChar: any) => firstChar.toUpperCase());
  };

  return (
    <div className=" h-[100vh]">
      <MetaData />
      <Header />

      <div className="w-5/6 sm:w-3/4 flex mx-auto mt-6 sm:mt-24 gap-4 sm:gap-20 justify-evenly items-center">
        <img src={data.img} alt="Image" className="w-1/5 h-1/5 rounded-lg" />
        <div className="flex gap-5 flex-col rounded-lg py-10 px-2 sm:px-24">
          <div className="mb-6 flex flex-col gap-5 border-b-[1px] border-slate-300 pb-4">
            <div className="text-2xl">{data.title}</div>
            <div>{data.type}</div>
          </div>
          <div className="flex  w-full justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Image
                  src={require("../../../public/assets/icons/ecology-black.png")}
                  alt="logo"
                  width={22}
                  height={22}
                />
                <span>Valeurs écologiques</span>
              </div>
              <div className="w-64 px-4 py-2 border-[1px] border-gray-500 rounded-lg pl-2 hidden sm:flex flex-col">
                <ul className="flex flex-col gap-1 text-sm">
                  {data.ecological_data &&
                    Object.entries(data.ecological_data).map(
                      ([key, value]: any, index) => (
                        <li key={index} className="flex justify-between">
                          <p>{formatLabel(key)}</p>
                          <p>{value}</p>
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Image
                  src={require("../../../public/assets/icons/gear.png")}
                  alt="logo"
                  width={22}
                  height={22}
                />
                <span>Caractéristiques techniques</span>
              </div>
              <div className="w-64 px-4 py-2 border-[1px] border-gray-500 rounded-lg pl-2 hidden sm:flex flex-col">
                <ul className="flex flex-col gap-1 text-sm">
                  {data.technical_data &&
                    Object.entries(data.technical_data).map(
                      ([key, value]: any, index) => (
                        <li key={index} className="flex justify-between">
                          <p>{formatLabel(key)}</p>
                          <p>{value}</p>
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>
          <Score ecology={data.ecological_data} tech={data.technical_data} />
          <button className="mx-auto sm:mx-0 w-1/2 mt-12 bg-secondary-color border-secondary-color hover:bg-[#1d643b] text-center border-2 px-2 py-1 sm:px-4 sm:py-2 rounded-2xl text-white ">
            <Link href={"../comparatif"}>Ajouter au comparateur</Link>
          </button>
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-24">
        <h2 className="text-2xl">Voir plus</h2>
        <div className="w-full my-3 mb-5 h-[1px] bg-slate-300"></div>
        <div className="flex items-start gap-6 mt-4 overflow-scroll overflow-y-hidden pb-4">
          {datas &&
            datas.map((result: any) => (
              <ProductCardSquare data={result} key={result._id} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

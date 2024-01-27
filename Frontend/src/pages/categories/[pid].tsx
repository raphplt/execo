import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import ProductCard from "@/components/productCard";
import { searchProduct } from "@/services/products/products.service";
import Pagination from "@/components/utils/pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCardSquare from "@/components/productCardSquare";

export default function Categories() {
  const [data, setData] = useState([]);
  const [pages, setPages]: any = useState([]);
  const [showData, setShowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const size = window.innerWidth;
      setWindowWidth(size);
    }
  }, []);

  useEffect(() => {
    const pagesArray = [];
    for (let i = 1; i <= Math.floor(data.length / 20); i++) {
      pagesArray.push(i);
    }
    setPages(pagesArray);
  }, [data]);

  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await searchProduct(pid);
      setData(result);
    };
    fetchData();
  }, [pid]);

  return (
    <div>
      <Header />
      <MetaData />
      <h1 className="text-2xl capitalize text-center mt-4 mb-4"> {pid}</h1>
      <h2 className="text-center mb-6">{data.length} produits</h2>

      <div className="flex flex-col gap-5 items-center mx-auto w-10/12 sm:w-full">
        {showData &&
          showData.map((product: any) =>
            windowWidth > 900 ? (
              <ProductCard data={product} key={product.id} />
            ) : (
              <ProductCardSquare data={product} key={product.id} />
            )
          )}
      </div>
      <Pagination
        data={data}
        showData={showData}
        setShowData={setShowData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        setPages={setPages}
      />
      <Footer />
    </div>
  );
}

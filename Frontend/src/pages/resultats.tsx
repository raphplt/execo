import Filters from "@/components/filters";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Metadatas from "@/components/metadatas";
import ProductCard from "@/components/productCard";
import ProductCardSquare from "@/components/productCardSquare";
import SearchBar from "@/components/searchBar";
import Pagination from "@/components/utils/pagination";
import {
  fetchProducts,
  searchProduct,
} from "@/services/products/products.service";
import IProduct from "@/types/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Resultats() {
  const [resultats, setResultats] = useState<IProduct[]>([]);
  const [data, setData] = useState<IProduct[]>([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [showData, setShowData] = useState<IProduct[]>([]);
  const [filtersList, setFiltersList] = useState({
    categorys: [],
    brands: [],
    trendScore: 0,
    reconditionne: false,
    priceRange: [0, 10000],
  });
  const [initialData, setInitialData] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await searchProduct(router.query.name as string);
      setInitialData(result);
      setResultats(result);
    };
    fetchData();
  }, [router.query.name]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await fetchProducts();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="h-full">
      <Metadatas />
      <Header />
      <div className="mt-12">
        <div className="w-2/3 mx-auto">
          <SearchBar />
        </div>
      </div>
      <Filters
        filtersList={filtersList}
        setFiltersList={setFiltersList}
        data={initialData}
        setResultats={setResultats}
        initialData={initialData}
      />
      <div className="text-center text-lg mt-4 mb-6">
        {resultats.length} résultats - ({Math.round(resultats.length / 20)}{" "}
        pages)
      </div>
      <div className="flex flex-col gap-5 items-center w-full mt-4">
        {resultats &&
          resultats.map((product: any) => (
            <ProductCard data={product} key={product.id} />
          ))}
      </div>
      <Pagination
        data={resultats}
        showData={showData}
        setShowData={setShowData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        setPages={setPages}
      />
      <div className="mt-24 mb-24 text-center">Produits en vedette</div>
      <div className="flex items-start gap-12 mt-4 overflow-scroll overflow-y-hidden pb-4 w-3/4 mx-auto">
        {data &&
          data
            .slice(0, 6)
            .map((result) => (
              <ProductCardSquare data={result} key={result._id} />
            ))}
      </div>
      <Footer />
    </div>
  );
}

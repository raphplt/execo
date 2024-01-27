import { fetchBrands } from "@/services/brands/brand.service";
import { fetchCategories } from "@/services/categories/categories.service";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Filters = (props: any) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [scores] = useState(["8 à 10", "5 à 7", "3 à 4", "0 à 2"]);
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [initialDatas, setInitialDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await fetchCategories());
      setBrands(await fetchBrands());
    };
    fetchData();
  }, []);

  useEffect(() => {
    setInitialDatas(props.data);
  }, [props.data]);

const handleCheckboxClick = (filterType: string, filterValue: string) => {
  const updatedFilters = {
    ...props.filtersList,
    [filterType]: props.filtersList[filterType]?.includes(filterValue)
      ? props.filtersList[filterType].filter(
          (value: string) => value !== filterValue
        )
      : [...(props.filtersList[filterType] || []), filterValue],
  };

  const filteredResults = props.initialData.filter((product: any) => {
    return (
      (!updatedFilters.categorys.length ||
        updatedFilters.categorys.includes(product.category)) &&
      (!updatedFilters.brands.length ||
        updatedFilters.brands.includes(product.product_details.marque))
    );
  });

  props.setResultats(filteredResults);
};

const resetFilters = () => {
  props.setResultats(initialDatas);
};

return (
  <div className="mt-5 mb-6 drop-shadow-sm">
    <ul className="flex flex-col sm:flex-row w-fit bg-gray-200 px-12 py-3 rounded-xl mx-auto justify-center gap-28">
      <li className="flex items-center">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center"
        >
          Catégories
          {!showCategories ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </button>
        <div
          className={`flex justify-start flex-col gap-1 mt-2 ${
            showCategories ? "" : "hidden"
          }`}
        >
          {categories?.map((category: any) => (
            <label key={category.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                value={category.category}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={() =>
                  handleCheckboxClick("categorys", category.category)
                }
              />
              <p>{category.category}</p>
            </label>
          ))}
        </div>
      </li>
      <li className="flex flex-col items-center">
        <button
          onClick={() => setShowBrands(!showBrands)}
          className="flex items-center"
        >
          Marques
          {!showBrands ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </button>
        <div
          className={`flex justify-start flex-col gap-1 mt-2 ${
            showBrands ? "" : "hidden"
          }`}
        >
          {brands?.map((brand: any) => (
            <label key={brand.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                value={brand.brand}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => handleCheckboxClick("brands", brand.brand)}
              />
              <p>{brand.brand}</p>
            </label>
          ))}
        </div>
      </li>
      <li className="flex flex-col items-center">
        <button
          onClick={() => setShowScores(!showScores)}
          className="flex items-center"
        >
          Score vert
          {!showScores ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </button>
        <div
          className={`flex justify-start flex-col gap-1 mt-2 ${
            showScores ? "" : "hidden"
          }`}
        >
          {scores?.map((score: any) => (
            <label key={score} className="flex gap-2 items-center">
              <input
                type="checkbox"
                value={score}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <p>{score}</p>
            </label>
          ))}
        </div>
      </li>
    </ul>
    {(showCategories || showBrands || showScores) && (
      <div className="mx-auto flex items-center">
        <button
          onClick={resetFilters}
          className="mt-4 mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full"
        >
          Réinitialiser les filtres
        </button>
      </div>
    )}
  </div>
);
};

export default Filters;

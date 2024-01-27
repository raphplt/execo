import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/dist/client/router";
import { searchProduct } from "@/services/products/products.service";

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [suggest, setSuggest] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (router.pathname === "/comparatif") {
      localStorage.setItem("compare", JSON.stringify(searchText));
      router.reload();
    } else {
      setSuggest([]);
      router.push(
        { pathname: "/resultats", query: { name: searchText } },
        "/resultats"
      );
    }
  };

  const handleSubmitSuggest = async (suggestion: any) => {
    if (router.pathname === "/comparatif") {
      localStorage.setItem("compare", JSON.stringify(suggestion));
      router.reload();
    } else {
      router.push(
        { pathname: "/resultats", query: { name: suggestion } },
        "/resultats"
      );
    }
  };

  const handleChange = async (e: any) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setSuggest([]);
    } else if (e.target.value.length > 1) {
      const result: any = await searchProduct(e.target.value);
      setSuggest(result);
    }
  };

  const handleReset = () => {
    setSearchText("");
    setSuggest([]);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        className="flex items-center border-2 rounded-3xl py-5 border-secondary-color hover:border-[#579452] w-[90%] sm:w-[70%] h-10 mx-auto"
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => handleChange(e)}
          placeholder="Rechercher... "
          className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none pl-4"
          required
        />
        {searchText.length > 0 && (
          <button className="" onClick={handleReset}>
            <XMarkIcon className="sm:h-6 sm:w-6 h-4 w-4" />
          </button>
        )}
        <button
          className="flex-shrink-0 bg-secondary-color hover:bg-[#579452] text-sm text-white py-2 px-2 rounded-3xl "
          type="submit"
        >
          <MagnifyingGlassIcon className="sm:h-6 sm:w-6 h-4 w-4" />
        </button>
      </form>
      <div className="absolute flex flex-col pl-6 left-0 right-0 z-50 mx-auto bg-slate-400 bg-opacity-70 text-left w-[26.5%] px-48 rounded-b-md">
        {suggest &&
          suggest.slice(0, 5).map((suggestion: any) => {
            const index = suggestion.title
              .toLowerCase()
              .indexOf(searchText.toLowerCase());
            const beforeSearchText = suggestion.title.slice(0, index);
            const boldText = suggestion.title.slice(
              index,
              index + searchText.length
            );
            const afterSearchText = suggestion.title.slice(
              index + searchText.length
            );
            return (
              <button
                key={suggestion.id}
                onClick={() => handleSubmitSuggest(suggestion)}
                className="py-1 text-start"
              >
                {beforeSearchText}
                <strong>{boldText}</strong>
                {afterSearchText}
              </button>
            );
          })}
      </div>
    </div>
  );
}

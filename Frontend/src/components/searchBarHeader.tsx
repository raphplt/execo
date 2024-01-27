import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/dist/client/router";
import { searchProduct } from "@/services/products/products.service";

export default function SearchBarHeader() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [suggest, setSuggest] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    router.push(
      { pathname: "/resultats", query: { name: searchText } },
      "/resultats"
    );
  };

  const handleSubmitSuggest = async (suggestion: any) => {
    router.push(
      { pathname: "/resultats", query: { name: suggestion } },
      "/resultats"
    );
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

  return (
			<div>
				<form
					onSubmit={handleSubmit}
					className="flex items-center border-2 rounded-3xl border-secondary-color hover:border-[#579452] py-5 max-w-[70%] sm:w-[100%] h-8 mx-auto"
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
						<button className="">
							<XMarkIcon className="" />
						</button>
					)}
					<button
						className="flex-shrink-0 bg-secondary-color hover:bg-[#579452] text-sm text-white py-2 px-2 rounded-3xl "
						type="submit"
					>
						<MagnifyingGlassIcon className="sm:h-6 sm:w-6 h-4 w-4" />
					</button>
				</form>
				<div className="flex flex-col absolute px-2 z-50 mx-auto bg-slate-300 drop-shadow-smms bg-opacity-70 ml-3 w-[10%] rounded-b-md">
					{suggest &&
						suggest.slice(0, 3).map((suggestion: any) => {
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

import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/products/products.service";
import { fetchCategories } from "@/services/categories/categories.service";
import CategoryCard from "@/components/categoryCard";
import SearchBar from "@/components/searchBar";
import IProduct from "@/types/product";
import Carousel from "@/components/utils/carousel";

export default function Discover() {
	const [data, setData] = useState<IProduct[]>([]);
	const [categories, setCategories] = useState([]);
	const [userID, setUserID] = useState(0);

	useEffect(() => {
		const user: any = localStorage.getItem("user");
		if (user) {
			setUserID(JSON.parse(user).id);
		}
	}, [userID]);

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await fetchProducts();
			console.log(result);
			setData(result);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await fetchCategories();
			setCategories(result);
		};
		fetchData();
	}, []);

	return (
		<div>
			<Header />
			<MetaData />
			<div className="mx-auto w-2/3 mt-12 mb-12">
				<SearchBar />
			</div>
			<div className="mt-5 sm:w-2/3 mx-auto">
				<div className="mb-12">
					<h1 className="pl-4 py-1 text-lg w-10/12 mx-auto sm:w-full bg-slate-200 rounded-lg mb-4">
						Produits tendances
					</h1>
					<div className="flex flex-col sm:flex-row sm:w-full items-center w-10/12 justify-center sm:justify-around mx-auto gap-5">
						<CategoryCard
							title="Téléphonie"
							img="/assets/catImg/pict-phone.png"
							color2="#ffea61"
							color1="#887e53"
							url="téléphonie"
						/>
						<CategoryCard
							title="PC portables"
							img="/assets/catImg/pict-laptop.png"
							color1="#c08fc7"
							color2="#ac36be"
							url="pc-portables"
						/>
						<CategoryCard
							title="Chaussures"
							img="/assets/catImg/pict-clothe.png"
							color1="#A1E5AC"
							color2="#149441"
							url="chaussures"
						/>
						<CategoryCard
							title="Maquillage"
							img="/assets/catImg/pict-makeup.png"
							color1="#5BB3D7"
							color2="#00419F"
							url="maquillage"
						/>
					</div>
				</div>
				<h1 className="pl-4 py-1 text-lg w-10/12 mx-auto sm:w-full bg-slate-200 rounded-lg mb-4">
					Catégories tendances
				</h1>
				<div className="mx-auto bg-gradient-to-r from-[#aecfab] to-[#70ad6d] py-3 px-10 rounded-lg my-2 mt-3 mb-6">
					<h2 className="text-xl rounded-lg w-fit">Mieux notés</h2>
					<div className="grid grid-flow-col overflow-x-auto gap-3 pb-3">
						<Carousel data={data.slice(0, 14)} cardType="square" />
					</div>
				</div>
				{categories &&
					categories.map((category: any) => (
						<div key={category.category}>
							{data.filter((result) => result.category === category.category).length >
							0 ? (
								<div className="mx-auto bg-gradient-to-r from-[#c0e4bd] to-[#6f976d] py-4 px-10 rounded-lg my-10 mt-3">
									<h2 className="text-xl rounded-lg w-fit">{category.category}</h2>

									<Carousel
										data={data.filter((result) => result.category === category.category)}
										cardType="tiny"
									/>
								</div>
							) : null}
						</div>
					))}
			</div>
			<Footer />
		</div>
	);
}

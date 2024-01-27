import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import SearchBar from "@/components/searchBar";
import ShortCutButton from "@/components/shortcutButton";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/services/categories/categories.service";
import ICategory from "../types/category";
import CardTop from "@/components/index/cardTop";
import Image from "next/dist/client/image";
import LastArticles from "@/components/lastArticles";

export default function Index() {
	const [data, setData] = useState<ICategory[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchCategories();
			setData(result);
		};
		fetchData();
	}, []);

	return (
		<div className="bg-[#E7F1E6]">
			<MetaData />
			<div
				style={{
					backgroundImage: `url(${"/assets/svg/waveIndex.svg"})`,
					backgroundSize: "100%",
					backgroundRepeat: "no-repeat",
				}}
				className="h-[100vh]"
			>
				<Header />
				<div className="bg-white w-10/12 lg:w-2/5 mx-auto rounded-xl shadow-md mt-20">
					<div className="mx-auto flex items-center justify-center mt-6 mb-8 pt-6 gap-5">
						<Image
							src={require("../../public/assets/execo.png")}
							alt="logo"
							className="w-64"
						/>
					</div>
					<SearchBar />
					<div className="w-[80%] mx-auto flex gap-10 justify-center flex-wrap mt-16 sm:pb-[150px] pb-12">
						{data &&
							data.map((result) => (
								<ShortCutButton
									key={result._id}
									src={result.image}
									title={result.category}
									alt="icon"
								/>
							))}
					</div>
				</div>
				<div className="pb-32 w-10.">
					<h2 className="sm:mb-16 mt-28 py-5 sm:px-16 rounded-xl text-lg sm:text-xl sm:w-fit w-3/4 mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
						En utilisant Execo, vous participez à un monde plus vert:
					</h2>
					<div className="flex items-center sm:flex-row flex-col justify-evenly sm:mt-28 mt-4">
						<div className="flex flex-col justify-center items-center gap-5">
							<div className=" rounded-[50%] bg-[#579452] text-white sm:w-28 sm:h-28 w-20 h-20 flex flex-col items-center shadow-md justify-center">
								<p className="sm:text-4xl">129.1</p>
								<p className="">Mrds</p>
							</div>
							<div className="py-1 px-2  rounded-xl sm:text-lg w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
								Chiffre d&apos;affaire du e-commerce en 2021
							</div>
						</div>
						<div className="flex flex-col justify-center items-center gap-5">
							<div className=" rounded-[50%] bg-[#579452] text-white sm:w-28 sm:h-28 w-20 h-20 flex flex-col items-center shadow-md justify-center">
								<p className="sm:text-4xl">4.2</p>
							</div>
							<div className="py-1 px-2  rounded-xl sm:text-lg w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
								Paniers validés par acheteur par mois
							</div>
						</div>
						<div className="flex flex-col justify-center items-center gap-5">
							<div className=" rounded-[50%] bg-[#579452] text-white sm:w-28 sm:h-28 w-20 h-20 flex flex-col items-center shadow-md justify-center">
								<p className="sm:text-4xl">41.8</p>
								<p className="">millions</p>
							</div>
							<div className="py-1 px-2  rounded-xl sm:text-lg w-fit mx-auto text-[#1B4332] font-semibold backdrop-blur-sm bg-white/30">
								de Français ont acheté sur Internet
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" mx-auto sm:mb-36 mt-96 ">
				<CardTop
					img="/assets/index/bg-index-1.jpg"
					title="L'empreinte écologique cachée de l'achat en ligne"
					description="Saviez-vous que nos habitudes de consommation en ligne ont un
              impact considérable sur l'environnement ? L'achat en
              ligne est en constante augmentation, mais cette pratique
              n'est malheureusement pas sans conséquences sur notre
              planète. Selon des études récentes, le commerce électronique est
              responsable d'une augmentation significative des émissions de
              gaz à effet de serre. Rien qu'au cours de l'année
              dernière, les livraisons de colis ont généré près de 10% des
              émissions totales de CO2 dans certains pays. Il est temps de
              prendre conscience de l'empreinte écologique de nos achats en
              ligne et de réfléchir à des solutions pour consommer de manière
              plus responsable"
				/>
				<CardTop
					img="/assets/index/bg-index-2.jpg"
					title="Changez le cours de votre consommation en ligne"
					description="Chez Execo, nous croyons en la nécessité d'un changement de
              mentalité vis-à-vis de notre consommation en ligne. Il est
              essentiel d'adopter des pratiques plus durables pour
              minimiser notre impact sur l'environnement. En utilisant
              notre plateforme, vous pouvez contribuer à cette transition vers
              une consommation responsable. Nous avons développé un outil de
              recherche et de comparaison de produits écologiques qui vous
              permet de trouver facilement des articles respectueux de
              l'environnement tout en répondant à vos besoins. En prenant
              en compte des critères tels que la durabilité des matériaux,
              l'efficacité énergétique et la provenance, nous vous
              fournissons les informations nécessaires pour prendre des
              décisions d'achat éclairées."
				/>
				<CardTop
					img="/assets/index/bg-index-3.jpg"
					title="Façonnons un avenir durable à chaque clic de souris"
					description="En utilisant notre outil, vous faites un pas concret vers un mode
              de consommation plus respectueux de la planète. Chaque choix
              compte, et chaque action individuelle peut faire une différence
              significative. En optant pour des produits écologiques, vous
              contribuez à réduire les émissions de CO2, vous soutenez des
              entreprises engagées dans des pratiques durables et vous
              encouragez l'innovation environnementale. De plus, choisir
              des produits de qualité qui durent plus longtemps permet de
              réduire la quantité de déchets générés par notre société de
              consommation. Ensemble, nous avons le pouvoir de créer un avenir
              plus durable. Rejoignez-nous dans cette démarche responsable et
              utilisez notre outil dès aujourd'hui pour faire des achats en
              ligne qui préservent notre planète pour les générations futures."
				/>
			</div>
			<div className="mb-24">
				<h2 className="w-2/3 mx-auto text-xl mb-6 font-semibold">
					Les derniers articles :
				</h2>
				<LastArticles />
			</div>
			<Footer />
		</div>
	);
}

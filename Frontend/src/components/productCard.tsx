/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Score from "./scores";
import { useRouter } from "next/router";

export default function ProductCard(props: any) {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/product/${props.data._id}`);
  };

const formatLabel = (label: any) => {
  return label
    .replace(/_/g, " ")
    .replace(/^\w/, (firstChar: any) => firstChar.toUpperCase());
};

return (
	<div
		key={props._id}
		className=" py-2 sm:w-[70%] border-[1px] border-gray-300 w-4/5 mx-auto rounded-xl shadow-md flex-wrap flex justify-around flex-col lg:flex-row"
	>
		<div className="flex  flex-col">
			<div className="sm-relative flex gap-3">
				<div className="flex gap-2 mb-2 items-center justify-center">
					<h2 className="text-lg ">{props.data.title}</h2>
					<div>
						{props.data && props.data.reconditionne ? (
							<div className="text-right  text-white bg-[#43853b] py-1 drop-shadow-md px-4 rounded-2xl w-fit flex justify-between gap-3 items-center">
								<Image
									src={require("../../public/assets/icons/ecology.png")}
									alt="logo"
									width={20}
									height={20}
								/>
								<p className="text-sm">Produit Reconditionné</p>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>

				<div className="sm:hidden relative h-12 w-12 bg-slate-500 rounded-lg"></div>
			</div>
			<div className="flex gap-4 items-center ">
				<img src={props.data.img} alt="Image" className="" />
				<Score
					ecology={props.data.ecological_data}
					tech={props.data.technical_data}
				/>
			</div>
		</div>
		<div className="mb-3"></div>
		<div className="flex flex-col justify-center items-center gap-5 w-fit">
			<div className="w-64 px-4 py-2 border-[1px] border-gray-500 rounded-lg pl-2 hidden sm:flex flex-col">
				<ul className="flex flex-col gap-1 text-sm">
					{props.data.ecological_data &&
						Object.entries(props.data.ecological_data).map(
							([key, value]: any, index) => (
								<li key={index} className="flex justify-between">
									<p>{formatLabel(key)}</p>
									<p>{value ? value : "N/A"}</p>
								</li>
							)
						)}
				</ul>
			</div>

			<div className="flex gap-4 justify-evenly ">
				<button
					className="bg-secondary-color text-sm transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover:bg-slate-200 hover:text-secondary-color hover:border-secondary-color border-2 duration-300 px-4 py-2 rounded-3xl text-white text-center"
					onClick={handleDetails}
				>
					Voir les détails
				</button>
				<button className="border-secondary-color text-sm border-2 px-4 py-2 rounded-3xl text-center text-secondary-color transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-secondary-color hover:text-white duration-300">
					Comparer
				</button>
			</div>
		</div>
	</div>
);
}

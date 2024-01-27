/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "./utils/button";
import { getScore, setTrend } from "@/services/products/products.service";

export default function ProductCardTiny(props: any) {
	const [score, setScore] = useState(props.trendScore);
	const router = useRouter();
	const [ecoScore, setEcoScore] = useState(0);

	const handleTrend = async () => {
		if (!props.userID) {
			router.push("/login");
		}
		const userID = props.userID;
		const productID = props.data._id;
		const res = await setTrend(productID, userID, score);
		if (res) {
			setScore(score + 1);
		}
	};
	const formatLabel = (label: any) => {
		return label
			.replace(/_/g, " ")
			.replace(/\b\w/g, (firstChar: any) => firstChar.toUpperCase());
	};

	useEffect(() => {
		const fetchEcoScore = async () => {
			const res = await getScore(props.data._id);
			setEcoScore(res);
		};
		fetchEcoScore();
	}, [props.data._id]);

	return (
		<div
			key={props.data._id}
			// href={`/product/${props.data._id}`}
			className="py-2 mx-1 border-[1px] px-2 w-fit rounded-xl flex justify-between bg-slate-100 drop-shadow-sm flex-col lg:flex-row gap-6"
		>
			<div className="flex flex-col">
				<div className="flex gap-2 items-center justify-between mx-1 mb-1">
					<button
						className=" w-fit py-1 px-2 bg-red-300 rounded-full mr-0"
						onClick={() => handleTrend()}
					>
						{props.data.trend_score} {props.data.trend_score >= 0 ? "🔥" : "🥶"}
					</button>

					<span className="rounded-full bg-green-400 text-white font-semibold drop-shadow-md p-2">
						{ecoScore}
					</span>
				</div>
				<div className="flex items-center gap-2 mb-2">
					<img
						src={props.data && props.data.img}
						alt="Product image"
						className="w-1/2 h-1/2 rounded-lg"
					/>
					<span className="text-sm h-14 overflow-hidden w-[90%]">
						{props.data.title}
					</span>
				</div>
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
				<div className="flex mt-1 sm:mx-0 mx-auto items-center gap-2">
					<Button
						title={"Détails"}
						color1={"fff"}
						color2={"#1C3E19"}
						function={"handleDetails"}
					/>
					<Button
						title={"Comparer"}
						color1={"1C3E19"}
						color2={"#fff"}
						function={"handleCompare"}
					/>
				</div>
			</div>
		</div>
	);
}

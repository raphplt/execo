/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Score from "../scores";
import { useState, useEffect } from "react";

export default function ProductDetails(props: any) {
  const [windowWidth, setWindowWidth] = useState(0);

  // Get window width
  useEffect(() => {
    if (typeof window !== "undefined") {
      const size = window.innerWidth;
      setWindowWidth(size);
    }
  }, []);

  const formatLabel = (label: any) => {
    return label
      .replace(/_/g, " ")
      .replace(/^\w/, (firstChar: any) => firstChar.toUpperCase());
  };

  return (
			<div className="text-sm">
				<h2 className="sm:text-lg sm:mb-4 overflow-hidden mb-2 sm:line-clamp-1 line-clamp-2">
					{props.data && props.data.title}
				</h2>
				{props.data && props.data.img && (
					<img
						src={props.data.img}
						alt="product"
						className="sm:w-1/2 sm:h-1/2 w-48 h-48 rounded-lg mx-auto mb-4"
					/>
				)}
				{windowWidth > 900 && (
					<div className="flex flex-col">
						{props.data.product_details && (
							<Score
								ecology={props.data.ecological_data}
								tech={props.data.technical_data}
							/>
						)}
					</div>
				)}
				<div className="flex mb-2 gap-2 mt-4 items-center bg-slate-200 rounded-lg py-1 px-2 pl-4">
					<Image
						src={require("../../../public/assets/icons/ecology-black.png")}
						alt="logo"
						width={22}
						height={22}
					/>
					<span className="text-lg">Valeurs écologiques</span>
				</div>
				<div className=" px-4 py-2 border-[1px] border-gray-500 rounded-lg pl-2 hidden sm:flex flex-col">
					<ul className="flex flex-col gap-1 text-sm">
						{props.data.ecological_data &&
							Object.entries(props.data.ecological_data).map(
								([key, value]: any, index) => (
									<li key={index} className="flex justify-between leading-6">
										<p>{formatLabel(key)}</p>
										<p>{value ? value : "N/A"}</p>
									</li>
								)
							)}
					</ul>
				</div>
				<div className="flex mb-2 gap-2 mt-4 items-center bg-slate-200 rounded-lg py-1 px-2 pl-4">
					<Image
						src={require("../../../public/assets/icons/gear.png")}
						alt="logo"
						width={22}
						height={22}
					/>
					<span className="text-lg">Spécifications techniques</span>
				</div>
				<div className=" px-4 py-2 border-[1px] border-gray-500 rounded-lg pl-2 hidden sm:flex flex-col">
					<ul className="flex flex-col gap-1 text-sm">
						{props.data.technical_data &&
							Object.entries(props.data.technical_data).map(
								([key, value]: any, index) => (
									<li
										key={index}
										className="flex justify-between leading-6 line-clamp-1"
									>
										<p className="line-clamp-1">{formatLabel(key)}</p>
										<p className="line-clamp-1">{value ? value : "N/A"}</p>
									</li>
								)
							)}
					</ul>
				</div>
			</div>
		);
}

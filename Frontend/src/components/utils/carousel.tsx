import {
  CarouselProvider,
  ButtonBack,
  Slider,
  Slide,
  ButtonNext,
} from "pure-react-carousel";
import ProductCardTiny from "../productCardTiny";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useEffect } from "react";

export default function Carousel({ data }: any) {
	const [userID, setUserID] = useState("");

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			console.log("user:", user);
			const userID = JSON.parse(user)._id;
			setUserID(userID);
		}
	}, []);
	return (
		<div className="flex items-center justify-center  py-4 sm:py-8 px-4">
			<CarouselProvider
				className="lg:block hidden"
				naturalSlideWidth={100}
				naturalSlideHeight={100}
				isIntrinsicHeight={true}
				totalSlides={10}
				visibleSlides={5}
				step={1}
				infinite={true}
				orientation="horizontal"
			>
				<div className="w-full mx-auto relative lg:max-w-[60vw]">
					<ButtonBack
						role="button"
						aria-label="slide backward"
						className="absolute left-0 top-1/2 -translate-y-1/2 focus:outline-none z-50 cursor-pointer transform transition-transform scale-100 focus:scale-110"
					>
						<ArrowBackIosIcon />
					</ButtonBack>

					<div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
						<Slider>
							{data.slice(0, 14).map((result: any, index: any) => (
								<Slide index={index} key={result._id}>
									<ProductCardTiny data={result} userID={userID} />
								</Slide>
							))}
						</Slider>
					</div>
					<ButtonNext
						role="button"
						aria-label="slide forward"
						className="absolute right-0 top-1/2 -translate-y-1/2 focus:outline-none z-50 cursor-pointer transform transition-transform scale-100 focus:scale-110"
					>
						<ArrowForwardIosIcon />
					</ButtonNext>
				</div>
			</CarouselProvider>
		</div>
	);
}

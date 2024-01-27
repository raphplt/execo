interface Iproducts {
	save: any;
	title: string;
	price: string;
	img: string;
	technical_data: Object;
	ecological_data: Object;
	category: string;
	trend_score: Array<number>;
	working: boolean;
}

export { Iproducts };

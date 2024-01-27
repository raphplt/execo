export default interface IProduct {
  _id: string;
  title: string;
  price: string;
  img: string;
  product_details: Object;
  category: string;
  trend_score: number;
  working: boolean;
  reconditionne: boolean;
}

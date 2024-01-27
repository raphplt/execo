import { useRouter } from "next/router";

export default function Button(props: any) {
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/product/${props.id}`);
  };

  return (
    <button
      className="bg-secondary-color text-sm transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 hover:bg-slate-200 hover:text-secondary-color hover:border-secondary-color border-2 duration-300 px-4 py-2 rounded-3xl text-white text-center"
      onClick={handleDetails}
    >
      {props.title}
    </button>
  );
}

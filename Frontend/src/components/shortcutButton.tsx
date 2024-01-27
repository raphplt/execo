import { api } from "@/services";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ShortCutButton(props: any) {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await api.get(`/products/search?query=${props.title}`);
    localStorage.setItem("searchResults", JSON.stringify(response.data));
    if (router.pathname === "/") {
      router.push("/resultats");
    } else router.reload();
  };
  return (
    <div>
      <div className="sm:w-16 sm:h-16 h-12 w-12 rounded-[30%] bg-[#E2F1E3] hover:bg-[#c9d6ca] shadow-md flex items-center justify-center sm:mx-5 hover:cursor-pointer">
        <button onClick={handleSubmit}>
          <div className="flex items-center justify-center">
            <Image src={props.src} width={35} height={35} alt={props.alt} />
          </div>
        </button>
      </div>
      <div className="text-center mt-2 text-sm text-black sm:block hidden">
        {props.title}
      </div>
    </div>
  );
}

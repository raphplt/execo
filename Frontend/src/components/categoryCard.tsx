import Image from "next/image";

export default function CategoryCard(props: any) {
  return (
    <a className="" href={`/categories/${props.url}`}>
      <div
        className={`flex items-center justify-center rounded-3xl drop-shadow-lg py-6 px-6 cursor-pointer`}
        style={{
          background: `linear-gradient(to right, ${props.color1}, ${props.color2})`,
        }}
      >
        <Image src={props.img} width={300} height={300} alt="phone image" />
        <h2 className="ml-5 text-white italic text-xl sm:text-2xl z-50 absolute bottom-3 left-0">
          <p className="bg-[#5e583e]"></p>
          {props.title}
        </h2>
      </div>
    </a>
  );
}

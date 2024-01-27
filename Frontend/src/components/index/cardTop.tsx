export default function CardTop(props: any) {
  return (
    <div
      style={{
        backgroundImage: `url(${props.img})`,
        backgroundSize: "100%",
      }}
      className="py-36 my-12"
    >
      <div className=" text-left mt-5 backdrop-blur-sm bg-white/30 rounded-xl py-8 sm:px-24 w-1/3 mx-auto">
        <h2 className="text-2xl mb-4">{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

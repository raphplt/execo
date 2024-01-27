export default function Advice(props: any) {
  return (
    <div className="rounded-lg flex flex-col items-center drop-shadow-md w-fit mx-auto py-2 px-8 bg-[#a4dda9]">
      <h1 className="text-xl">{props.title}</h1>
      <p className="text-lg w-3/4">{props.description}</p>
    </div>
  );
}

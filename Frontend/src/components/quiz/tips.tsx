/* eslint-disable @next/next/no-img-element */
export default function Tips(props: any) {
  return (
    <div className="flex flex-col px-3 py-3 rounded-lg bg-slate-200 h-96 w-64">
      <img
        src={props.img}
        alt="Tips"
        className="mx-auto mb-8 h-36 w-full rounded-lg"
      />
      <p className="text-md font-semibold mb-8 line-clamp-2">{props.title}</p>
      <p className="mx-auto text-sm">{props.tips}</p>
    </div>
  );
}

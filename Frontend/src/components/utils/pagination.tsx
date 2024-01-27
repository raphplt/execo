/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function Pagination(props: any) {
  const pageNumber = 20;
  useEffect(() => {
    const startIndex = (props.currentPage - 1) * pageNumber;
    const endIndex = props.currentPage * pageNumber;
    props.setShowData(props.data.slice(startIndex, endIndex));
  }, [props.data, props.currentPage]);

  const handlePageClick = (page: number) => {
    if (page === 1 || page === props.pages.length) {
      props.setCurrentPage(page);
    } else if (page > 1 && page < props.pages.length) {
      const newFirstPage = page - 1;
      props.setCurrentPage(newFirstPage);
    }
  };

  return (
    <div className="mx-auto mt-12 w-fit mb-12">
      <div className="flex gap-2">
        <button
          key={1}
          className="bg-slate-200 rounded-full w-8 h-8 px-2 py-1"
          onClick={() => handlePageClick(1)}
        >
          1
        </button>

        {props.pages.map((page: any, index: number) => {
          if (index >= props.currentPage && index < props.currentPage + 5) {
            return (
              <button
                key={page}
                className="bg-slate-200 rounded-full w-8 h-8 px-2 py-1"
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            );
          }
          return null;
        })}

        <button
          key={props.pages.length}
          className="bg-slate-200 rounded-full w-8 h-8 px-2 py-1"
          onClick={() => handlePageClick(props.pages.length)}
        >
          {props.pages.length}
        </button>
      </div>
    </div>
  );
}

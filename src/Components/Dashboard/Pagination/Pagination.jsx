import ReactPaginate from "react-paginate";
import "./Paginated.css"
import { useEffect } from "react";



export default function PaginatedItems({ searchLength, searchedData, data, setPage, limit, page }) {
  const pageCount = searchLength > 0 ? 
  +Math.ceil(searchedData.length / limit): +Math.ceil(data?.total / data?.per_page)  ;

  // Reset to page 1 if the current page is greater than available pages
  useEffect(() => {
    if (page > pageCount) {
      setPage(1);
    }
  }, [pageCount, page, setPage]);

  return (
    <>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(++e.selected)}
        pageRangeDisplayed={2}
        pageCount={+pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        activeLinkClassName="active-cl text-white bg-primary"
        containerClassName="custom-pagination flex justify-end align-center"
        pageLinkClassName=" mx-2 text-center leading-[30px] text-secondary transition duration-200
        rounded-full text-decoration-none block w-[30px] h-[30px] hover:bg-gray-200"
      />
    </>
  );
}


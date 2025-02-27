import ReactPaginate from "react-paginate";
import "./Paginated.css"



export default function PaginatedItems({ searchLength, searchedData, data, setPage, limit }) {
  const pageCount = searchLength > 0 ? 
  +Math.ceil(searchedData.length / limit): +Math.ceil(data?.total / data?.per_page)  ;

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


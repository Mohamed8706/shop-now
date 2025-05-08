import { useMemo, useCallback, useState, useEffect } from "react";
import {  XCircleIcon } from "lucide-react";
import { FormControl, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { baseUrl, Product } from "../../../Services/Api";
import Cookie from "cookie-universal";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";




export default function SearchIcon() {
    // States
    const [search, setSearch] = useState("");

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const cookie = Cookie();
    const token = cookie.get("e-commerce");

  // Search Query
  const { data, refetch: refetchSearch, isLoading, isError } = useQuery({
    queryKey: ["search-product", search],
    queryFn: async () => {
      const res = await axios.post(
        `${baseUrl}/${Product}/search`,
        { title: search },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: false, // Manual trigger only
  });
console.log(data?.length)
const handleSearch = () => {
    if (search.length > 0) {
        refetchSearch();
    }
}



    return (
        <>
        <div className="md:hidden">
        <FontAwesomeIcon  onClick={handleShow} className="cursor-pointer rounded-full"
        icon={faSearch} color="#06c44fcc" fontSize={32}/>
        </div>

                
        <Offcanvas show={show} onHide={handleClose} placement="end" className="items-center md:!w-[550px] f-cairo cart-cart">
            <Offcanvas.Header  className="text-2xl p-4">
                    <XCircleIcon onClick={handleClose} size={40} color="#06c44fcc" className="cursor-pointer"/> 
                <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="w-full">
            {/* Search Input and Icon */}
                <div className="relative flex items-center">
                    <FormControl
                    type="search"
                    id="search"
                    placeholder="Search Product"
                    className="shadow-none py-3 px-4 w-full border-3
                    !rounded-full "
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                <div className="absolute flex items-center top-1/2 translate-y-[-50%] right-0.5 px-6 
                    bg-primary h-[90%] rounded-full cursor-pointer transition hover:scale-95" 
                    onClick={handleSearch}>
                    <FontAwesomeIcon
                    fontSize={23}
                    color="white"
                    icon={faSearch}
                    />
                </div>
                </div>
                {/* Search Results */}
                <div className="w-full mt-2 overflow-y-auto" onClick={handleClose}>
                {isLoading && ( <div className="p-4 text-center text-gray-500">Loading...</div>)}
                {isError && ( <div className="p-4 text-center text-red-500"> Error fetching results </div>)}
                {data && data.length > 0 && (
                <ul className="m-0 p-0">
                {data.map((pro) => (
                <li key={pro.id}>
                <Link to={`/product/${pro.id}`} className="flex items-center p-3 text-gray-800
                hover:bg-gray-100 transition-colors duration-200">
                <img
                src={`${import.meta.env.VITE_API_BASE_URL}${pro.images[0].image}`}
                alt={pro.title}
                className="w-12 h-12 object-cover rounded mr-3"
                onError={(e) => (e.target.src = SearchIcon)}
                />
                <div>
                <p className="m-0 text-base font-medium">{pro.title}</p>
                <p className="m-0 text-sm text-gray-600">${pro.price}</p>
                </div>
                </Link>
                </li>
                ))}
                </ul>
                )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}
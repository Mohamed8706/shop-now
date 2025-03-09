import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap"; // Kept for form input functionality
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, Product } from "./../../../Services/Api";
import Cookie from "cookie-universal";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "../../../Assets/icons8-search-50.png";

export function SearchBar() {
  const [search, setSearch] = useState("");
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

  // Handle search conditionally
  const handleSearch = () => {
    if (search.length > 0) {
      refetchSearch();
    } else {
      console.log("Search is empty, no fetch triggered.");
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search Input and Icon */}
      <div className="relative flex items-center">
        <FormControl
          type="search"
          placeholder="Search Product"
          className="shadow-none py-3 px-4 w-full border-3
          !rounded-full  "
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

      {/* Search Results Dropdown */}
      {(isLoading || isError || (data && data.length > 0)) && (
        <div className="absolute left-0 w-full mt-2 bg-white shadow-xl 
          rounded-lg border border-gray-200 z-10 max-h-72 overflow-y-auto">
          {isLoading && ( <div className="p-4 text-center text-gray-500">Loading...</div>)}
          {isError && ( <div className="p-4 text-center text-red-500"> Error fetching results </div>)}
          {data && data.length > 0 && (
            <ul className="m-0 p-0">
              {data.map((pro) => (
                <li key={pro.id}>
                  <Link to={`/product/${pro.id}`} className="flex items-center p-3 text-gray-800
                  hover:bg-gray-100 transition-colors duration-200">
                    <img
                      src={`https://ecommerce-backend-production-5ad6.up.railway.app${pro.images[0].image}`}
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
      )}
    </div>
  );
}
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, Product } from "./../../../Services/Api";
import Cookie from "cookie-universal";
import axios from "axios";

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
      refetchSearch(); // Trigger the query manually
    } else {
      console.log("Search is empty, no fetch triggered.");
    
    }
  };

  return (
    <>
      <FormControl
        style={{ borderRadius: "100px" }}
        type="search"
        placeholder="Search Product"
        className="shadow-none cat-search form-control py-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        className="absolute flex items-center top-1/2 translate-y-[-50%] right-1 px-6 
          bg-primary h-[90%] rounded-full cursor-pointer transition hover:scale-95"
      >
        <FontAwesomeIcon
          fontSize={23}
          color="white"
          icon={faSearch}
          onClick={handleSearch}
        />
      </div>

    </>
  );
}
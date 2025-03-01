import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownButton, FormControl } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LoadingSubmit from "../../Loading/loading";
import { baseUrl, CAT } from "../../../Services/Api";
import axios from "axios";
import { Link } from "react-router-dom";

export function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);

  // Fetch and render Categories
  const fetchCategories = async (url) => {
    setLoading(true);
    const { data } = await axios.get(url);
    setCat(data);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    fetchCategories(`${baseUrl}/${CAT}`);
  }, []);

  return (
    <>
      {loading && <LoadingSubmit />}
      <FormControl
        style={{ borderRadius: "100px" }}
        type="search"
        placeholder="Search Product"
        className="shadow-none cat-search form-control py-3"
      ></FormControl>

      <div
        className="absolute flex items-center top-50 translate-y-[-50%] right-1 px-6 
          bg-primary  h-[90%] rounded-full cursor-pointer transition hover:scale-95"
      >
        <FontAwesomeIcon fontSize={23} color="white" icon={faSearch} />
      </div>

      <div
        className="flex categories absolute top-50 left-1 translate-y-[-50%]
                flex-row items-center gap-5 justify-center flex-wrap h-[90%] rounded-full bg-gray-100"
      >
        <DropdownButton
          id="dropdown-basic-button"
          title="All"
          className="font-bold text-lg text-[#333333]"
        >
          {cat.map((cat, ind) => (
            <div key={ind}>
              <Link to="/dashboard" className="">
                {cat.title.split(" ")[0]}
              </Link>
            </div>
          ))}
        </DropdownButton>
      </div>
    </>
  );
}

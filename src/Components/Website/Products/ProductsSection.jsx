import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "../../../Services/Api";
import ProductSkeleton from "../../Loading/ProductSkeleton";
import "./product.css"
import MainSwiper from "../../../helpers/MainSwiper";

export default function ProductSection(props) {
  const {title, endPoint} = props;
  const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(false);
  // Fetching data
    const fetchData = async (url) => {
        setLoading(true)
        const {data} = await axios.get((url));
        setFetchedData(data);
        setLoading(false)

    }

    const { mutate } = useSWR(`${baseUrl}/${endPoint}`, fetchData, 
        {
        revalidateOnFocus: false, 
        })
  

    const slides = loading ?
    Array.from({length: 5}).map((item) => <ProductSkeleton />) :
      fetchedData.map((item) => <ProductCard data={item}/>)


  return (
    <div className="h-full">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}

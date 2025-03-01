import React, { useReducer, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import MainSwiper from "../../../helpers/MainSwiper";
import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "../../../Services/Api";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "../../Loading/CategorySkeleton";



export default function Categoriesection(props) {
  const {title, endPoint} = props;
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching data
    const fetchData = async (url) => {
        setLoading(true)
        const { data } = await axios.get((url));
        setFetchedData(data.data);
        setLoading(false)
        

    }

    const { mutate } = useSWR(`${baseUrl}/${endPoint}?limit=8&page=1`, fetchData, 
        {
        revalidateOnFocus: false, 
        })


    const slides = loading ?
    Array.from({length: 6}).map((item) => <CategorySkeleton />) :
      fetchedData.map((item) => <CategoryCard data={item}/>)


  return (
    <div className="h-[500px]">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}
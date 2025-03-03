import React, { useReducer, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import MainSwiper from "../../../helpers/MainSwiper";
import axios from "axios";
import useSWR from "swr";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "../../Loading/CategorySkeleton";
import { useCategories } from "../../../hooks/useCategories";



export default function Categoriesection(props) {
  const {title} = props;
  const { data, isLoading} = useCategories();
  const slides = isLoading ?
  Array.from({length: 6}).map((item) => <CategorySkeleton />) :
    data?.map((item) => <CategoryCard data={item}/>)


  return (
    <div className="h-[500px]">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}
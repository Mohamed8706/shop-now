import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import MainSwiper from "../../../helpers/MainSwiper";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "../../Loading/CategorySkeleton";
import { useCategories } from "../../../hooks/useCategories";



export default function Categoriesection(props) {
  const {title} = props;
  const { allCategories: data, isAllLoading: isLoading} = useCategories();
  const slides = isLoading ?
  Array.from({length: 6}).map((_, ind) => <CategorySkeleton key={ind}/>) :
    data?.map((item) => <CategoryCard key={item.id} data={item}/>)


  return (
    <div className="h-[500px]">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}
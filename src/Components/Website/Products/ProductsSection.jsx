import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import ProductSkeleton from "../../Loading/ProductSkeleton";
import "./product.css"
import MainSwiper from "../../../helpers/MainSwiper";
import { useProducts } from "../../../hooks/useProducts";

export default function ProductSection(props) {
  const {title, data: fetchedData, isLoading: loading} = props;

    const slides = loading ?
    Array.from({length: 5}).map((item) => <ProductSkeleton />) :
      fetchedData?.map((item) => <ProductCard data={item}/>)


  return (
    <div className="h-full">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}

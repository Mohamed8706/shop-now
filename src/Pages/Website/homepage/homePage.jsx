import "./home.css";
import LandingSection from './../../../Components/Website/Landing/LandingSection';
import ProductSection from "../../../Components/Website/Products/ProductsSection";
import { CAT, LatestProducts, LatestSale, TopProducts } from "../../../Services/Api";
import OurFeatures from "../../../Components/Website/Dividers/OurFeatures";
import Subscribe from "../../../Components/Website/Dividers/Subscribe";
import Categoriesection from "../../../Components/Website/Categories/CategoriesSection";



export default function HomePage() {

    return (
        <>
            <LandingSection />
            <Categoriesection title="Categories" endPoint={CAT} />
            <OurFeatures />
            <ProductSection title="Deals Of The Day" endPoint={LatestSale} />
            <ProductSection title="Latest Products" endPoint={LatestProducts}  />
            <Subscribe />
            <ProductSection title="Top Rated Products" endPoint={TopProducts} />
        </>
    );
}

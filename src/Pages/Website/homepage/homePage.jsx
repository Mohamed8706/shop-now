import "./home.css";
import LandingSection from './../../../Components/Website/Landing/LandingSection';
import ProductSection from "../../../Components/Website/Products/ProductsSection";
import OurFeatures from "../../../Components/Website/Dividers/OurFeatures";
import Subscribe from "../../../Components/Website/Dividers/Subscribe";
import Categoriesection from "../../../Components/Website/Categories/CategoriesSection";
import { useProducts } from "../../../hooks/useProducts";
import Footer from "../../../Components/Website/Navigation/Footer";



export default function HomePage() {
    const {latestSale, latestProducts, topProducts} = useProducts();

    return (
        <>
            <LandingSection />
            <Categoriesection title="Categories" />
            <OurFeatures />
            <ProductSection title="Deals Of The Day"  data={latestSale.data} isLoading={latestSale.isLoading} />
            <ProductSection title="Latest Products"  data={latestProducts.data} isLoading={latestProducts.isLoading} />
            <Subscribe />
            <ProductSection title="Top Rated Products"  data={topProducts.data} isLoading={topProducts.isLoading} />
            <Footer />
        </>
    );
}

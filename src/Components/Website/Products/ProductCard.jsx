import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartShopping, faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductCounter from "../Utils/ProductCounter";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, handlePopUp, openCart } from "../../../Redux/Slices/CartSlice";
import { RatingStars } from "../../../helpers/RatingStars";



export default function ProductCard({ data }) {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        if (qty > 0 && data.stock >= qty) {
            dispatch(addToCart({product : data, qty}))
            dispatch(handlePopUp("adding"))
            
        } 
    };
    const Cart = useSelector((state) => state.cart.items);
    const productInCart = Cart?.find((item) => item.id === data.id);

    const handleShow = () => dispatch(openCart("open"));


    return (
        <div className="rounded-2xl p-3 max-h-[530px] bg-white hover:shadow-xl shadow-custom 
        border relative border-[#fbfbfb]">
            {/* Image */}
            <Link to={`/product/${data.id}`} className="text-[#333333] navigation-link">
                <div className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer">
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}` + data.images[0].image}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>
            {/* Card Content */}
            <div className="flex flex-col mt-4 truncate w-full h-full gap-2">
                <h4 className="text-[#333333] text-truncate h-8 font-semibold f-cairo">
                    {data.title}
                </h4>
                <div className="flex justify-start items-center gap-2 font-bold">
                    <RatingStars rating={data.rating} />
                </div>
                <div className="flex w-full flex-col items-stretch justify-start">
                    <h4 className="text-gray-800 font-bold">${data.price}</h4>
                    <p className="text-gray-400 text-lg line-through">
                        ${(+data.price + +(data.discount * data.price) / 100).toFixed(0)}
                    </p>
                    {data.stock < qty ? (
                        <p className="text-red-500 text-lg h-6">Only {data.stock} left in stock</p>
                    ) : (
                        <p className="h-6"></p>
                    )}
                </div>

                <div className="flex items-center justify-between flex-wrap">
                    {productInCart ? (
                        <div className="flex justify-end w-full cursor-pointer" onClick={handleShow}>
                        <FontAwesomeIcon icon={faCartShopping} className="mr-3 text-[#36ce70] " fontSize={27} />
                        <p className="font-semibold f-cairo">Go To Cart</p>
                        </div>
                    ) : (
                    <>
                    <ProductCounter setQty={setQty} />
                    <button disabled={qty === 0 || data.stock < qty || productInCart} onClick={handleAddToCart}>
                        <FontAwesomeIcon
                            icon={faCartPlus}
                            className={`mr-3 ${!productInCart && "hover:text-[#36ce70]"} transition-all duration-300`}
                            fontSize={27}
                        />
                    </button>
                    </>
                    )}
                </div>
            </div>
        </div>
    );
}

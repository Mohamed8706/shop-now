import { useMemo, useCallback, useState, useEffect } from "react";
import { XCircleIcon } from "lucide-react";
import { Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, handlePopUp, removeFromCart } from "../../../Redux/Slices/CartSlice";


export default function Cart() {
    // States
    const [show, setShow] = useState(false);
    

    const cartData = useSelector((state) => state.cart)   
    
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals())
    }, [cartData])

    const handleShow = () => setShow(true);
    const handleClose = useCallback(() => setShow(false), [setShow]);


const renderCartItems = useMemo(() => {
    return cartData.items.length > 0 ? (
        cartData.items.map((product, index) => (
            <div key={index} className="flex relative w-full justify-between border-b-2 p-3">
                <div className="w-2/3">
                    <p className="fw-bold mb-1 text-2xl">{product.title}</p>
                    <p className="text-muted mb-0 text-xl">{product.description}</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <XCircleIcon 
                        className="cursor-pointer" 
                        onClick={() => {
                            dispatch(removeFromCart(product.id))
                            dispatch(handlePopUp("removing"))
                        
                        }} 
                        size={35} 
                        color="red" 
                    />
                    <p className="text-gray-500 fw-bold">$ {product.price * product.count}</p>
                    <span className="bg-primary text-xl rounded-full w-8 h-8 flex justify-center items-center font-semibold text-white">
                        {product.count}
                    </span>
                </div>
            </div>
        ))
    ) : (
        <p className="p-3">No items in the cart.</p>
    );
}, [cartData]);

    return (
        <>
        <div className="relative">
        {cartData.totalItems > 0 && (
            <span className="absolute bottom-5 -right-3 bg-red-400 text-white rounded-full w-8 h-8 
            flex justify-center items-center">{cartData.totalItems}</span>
        )}
        <FontAwesomeIcon  onClick={handleShow} className="cursor-pointer"
        icon={faCartShopping} color="#06c44fcc" fontSize={35}/>
        </div>

                
        <Offcanvas show={show} onHide={handleClose} placement="end" className="items-center md:!w-[550px] f-cairo cart-cart">
            <Offcanvas.Header closeButton className="text-2xl p-4">
                <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="w-full">
                <div className="flex justify-between m-1">
                    <h1 className="font-semibold">Your Cart</h1>
                    <span className="bg-primary w-12 h-12 text-2xl text-white flex items-center justify-center font-bold rounded-3xl">
                        {cartData.totalItems}
                    </span>
                </div>
                <div className="border rounded-lg text-2xl">
                    {renderCartItems}
                    <div className="d-flex justify-content-between border-b-2 p-3">
                        <p>Total (USD)</p>
                        <p className="font-bold text-gray-600">${cartData.totalPrice}</p>
                    </div>
                </div>
                <div className="w-full text-center px-2 py-3">
                    <button className="w-full p-3 bg-primary !rounded-lg text-3xl transition 
                    duration-200 border border-primary hover:!bg-white hover:!text-black text-white">
                        Continue To Checkout
                    </button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

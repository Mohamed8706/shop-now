import { CircleMinus, CirclePlusIcon, DeleteIcon, Minus, Plus, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handlePopUp, ProductCount, removeFromCart } from "../../../Redux/Slices/CartSlice";

export default function CartProductCounter({ setQty, product }) {
const count = useSelector((state) => state.cart.items.find((item) => item.id === product.id).count);
const dispatch = useDispatch();

console.log(product.stock)
const handleDecrease = () => {
        if (count > 1) {
            setQty((prev) => prev - 1);
        }
        dispatch(ProductCount({ product, type: "decrement"}))
    };

    const handleIncrease = () => {
        setQty((prev) => prev + 1);
        dispatch(ProductCount({ product, type: "increment"}))
    };

    const handleInputChange = (e) => {
        setQty(+e.target.value);
    };

    useEffect(() => {
        setQty(count);
    }, [count]);

    return (
<div className="product-qty gap-1 flex flex-row -mr-3 items-center">
            <span className="cursor-pointer">
                    {count > 1 ? <CircleMinus onClick={handleDecrease} color="red" /> : 
                    <TrashIcon  onClick={() => { dispatch(removeFromCart(product.id))
                                                dispatch(handlePopUp("removing"))}}  color="red"/>}
            </span>
            <FormControl
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                className="!w-11"
                value={count}
                onChange={handleInputChange}
            ></FormControl>
            <span className="cursor-pointer">
                    <CirclePlusIcon onClick={handleIncrease} color="#06c44fcc"/>
            </span>
    </div>
    )
}
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";

export default function ProductCounter({ setQty }) {
const [count, setCount] = useState(1);

const handleDecrease = () => {
        if (count > 1) {
            setCount((prev) => prev - 1);
        }
    };

    const handleIncrease = () => {
        setCount((prev) => prev + 1);
    };

    const handleInputChange = (e) => {
        setCount(+e.target.value);
    };

    useEffect(() => {
        setQty(count);
    }, [count]);

    return (
<div className="product-qty w-1/2 gap-1 flex flex-row">
            <span>
                <Button onClick={handleDecrease} disabled={count === 1}>
                    <Minus />
                </Button>
            </span>
            <FormControl
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                className="!w-12"
                value={count}
                onChange={handleInputChange}
            ></FormControl>
            <span>
                <Button onClick={handleIncrease}>
                    <Plus />
                </Button>
            </span>
    </div>
    )
}
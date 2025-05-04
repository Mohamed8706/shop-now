import { Car, Medal, ShipWheelIcon, Truck } from "lucide-react";
import { Container } from "react-bootstrap";
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faPhone, faRightLeft, faUserShield } from "@fortawesome/free-solid-svg-icons";


const features = [
    {
        icon: <FontAwesomeIcon icon={faCarSide} size="2xl"/>,
        title: "Free Shipping",
        description: "Free on order over $300"
    },
    {
        icon: <FontAwesomeIcon icon={faUserShield} size="2xl"/>,
        title: "Security Payment",
        description: "100% security payment"
    },
    {
        icon: <FontAwesomeIcon icon={faRightLeft} size="2xl"/>,
        title: "30 Day Return",
        description: "30 day money guarantee"
    },
    {
        icon: <FontAwesomeIcon icon={faPhone} size="2xl"/>,
        title: "24/7 Support",
        description: "Support every time fast"
    }
]

export default function OurFeatures() {
    return (
            <section className="my-14 flex justify-between items-center flex-wrap">
                <Container className="flex flex-col gap-12 h-full justify-center">
                    <div className="flex flex-row flex-wrap w-full gap-9 justify-center ">
                        {features.map((item, ind) => 
                        <div key={ind} className="flex flex-col h-72 text-center rounded-2xl w-full 
                        md:w-[calc(50%-36px)] lg:w-[calc(25%-36px)] p-4 f-cairo
                        bg-[#f4f6f8] items-center justify-center text-[#45595b] gap-2">
                            <span className="bg-[#36ce70] min-w-28 min-h-28 mb-10
                            flex justify-center items-center rounded-full text-white relative
                            after:absolute after:w-9 after:h-9 after:bg-[#36ce70] after:top-[100%] 
                            after:right-[50%] after:transform after:translate-x-[50%] after:translate-y-[-65%] 
                            after:rotate-45">
                            {item.icon}
                            </span> 
                            <h4>{item.title}</h4>
                            <h6 className="text-secondary font-weight-thin">{item.description}</h6>
                        </div>
                        
                            )}
                    </div>
                    
                </Container>
            </section>
    )
}
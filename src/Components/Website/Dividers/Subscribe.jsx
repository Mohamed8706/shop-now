import { Button, Container, FormControl } from "react-bootstrap";


export default function Subscribe() {
    return (
            <section className="my-14 bg-slate-400 w-full p-5 flex justify-center items-center flex-wrap">
                <Container className="flex justify-center">
                    <div className="flex col-12 col-md-7 f-cairo flex-col text-center gap-5
                    items-center justify-center">
                    <div>
                    <h1 className="text-5xl font-bold">Subscribe To Get Discount Offers</h1>
                    <p className="text-xl mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                    </div>
                    <input type="email" placeholder="Enter Your Email" 
                    className="p-4  bg-white outline-none rounded-full w-[90%]">
                    </input>
                    <button className="btn-second md:w-2/5 !rounded-full text-xl">SUBSCRIBE</button>
                    </div>
                </Container>
            </section>
    )
}
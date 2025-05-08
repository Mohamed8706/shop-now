import { Container } from "react-bootstrap";
import myIcon from "../../../Assets/Ecommerce web page-amico.svg?url";


export default function LandingSection() {
  return (
    <section className="flex hand justify-between items-center flex-wrap mt-15" id="landing">
      <Container className="flex flex-row justify-between gap-7">
        <div className="flex align-items-center align-items-md-start gap-2 flex-col justify-center f-cairo">
          <h2 className="font-bold">Explore a World of Shopping, Built with Expertise!</h2>
          <h5 className="!font-normal">
            Welcome to Online Store by Mohamed Kabash — a dynamic e-commerce platform I crafted to demonstrate my expertise in
            front-end development skills.
          </h5>
        </div>

        <img src={myIcon} alt="Ecommerce Illustration" className="pag" />
      </Container>
    </section>
  );
}
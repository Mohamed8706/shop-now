import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useCategory } from "../../../hooks/useCategory";



export default function CategoryUpdate() {
const { id }  = useParams();
const {selectedCategory: category, isFetchingSelectedCategory: loading, update, isUpdating } = useCategory(id);

const [form, setForm] = useState({
    title: "",
    image: "",
});


useEffect(() => {
    if (category) {
        setForm({ ...form, title: category.title});
    }
}, [category])


// Animations for the label
const sections = document.querySelectorAll("#mySelect");
const observer = new IntersectionObserver((enteries) => {
    enteries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("apparate");
        }
        else {
            entry.target.classList.remove("apparate");
        }
    })
});
sections.forEach((el) => {
    observer.observe(el);
})





    async function handleUpdate(e) {
        e.preventDefault();
        update({id, form});     
    }

            
    if (loading || isUpdating) {
        return <LoadingSubmit />;
    }

    return( 
        <>
        <div className="row " style={{margin:"25px", height:"70vh"}}>
        <Form className="form" style={{height:"100%", padding: "30px"}} onSubmit={handleUpdate}>
        <Form.Group
            className="form-custom"
            controlId="formBasicName"
            id="my-select"
        >
            <span className="user-icon"></span>
            <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
            />
            <Form.Label>Title</Form.Label>

        </Form.Group>
        <Form.Group
            className="form-custom relative"
            controlId="image"
            id="my-select"
        >
            
        <FontAwesomeIcon icon={faImage} color="#06c44fcc" 
        className="absolute w-[30px] h-[30px] top-[50%] left-[93%] sm:left-[94%] md:left-[71%]
        lg:left-[75%] transform translate-y-[-50%] translate-x-[-50%]" /> 
            <Form.Control
                type="file"
                name="image"
                onChange={(e) => setForm({ ...form, image: e.target.files.item(0) })}
                required
            />
            <Form.Label>Image</Form.Label>
        </Form.Group>



    
        
        <button className="bn54" disabled={loading}>
            <span className="bn54span">Update</span>
        </button>

        </Form>
        </div>
        </>
    )

    
}

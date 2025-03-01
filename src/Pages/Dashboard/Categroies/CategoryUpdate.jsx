import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { baseUrl, CAT, Cat } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import  Cookie  from 'cookie-universal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";



export default function CategoryUpdate() {
const [title, setTitle] = useState("");
const [image, setImage] = useState("");


    const { id }  = useParams();
    const nav = useNavigate("");

    const [disable, setDisable] = useState(true);

    const [loading, setLoading] = useState(false);


        // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")

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



    
    // Get user details to fill up inputs
    useEffect(() => {
        setLoading(true)
        axios.get(`${baseUrl}/${Cat}/${id}`, {
            headers:{
            Authorization: "Bearer " + token,
            }
        })
        .then((data) => {setTitle(data.data.title)})
        .then(() => setLoading(false))
        .then(() => setDisable(false))
        .catch((err) => console.log(err))
    }, [])

    async function handleUpdate(e) {
        setLoading(true)
        e.preventDefault();
        const form = new FormData();
        form.append("title", title);
        form.append("image", image);
        try {
        const res = await axios.post(`${baseUrl}/${Cat}/edit/${id}`, form, {
        headers: {
            Authorization: "Bearer " + token,
            },
        });
        nav("/dashboard/categories")
        setLoading(false)
        
        } catch (err){
            console.log(err);
        }      
    }

            


    return( 
        <>
        {loading && <LoadingSubmit />}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setImage(e.target.files.item(0))}
                required
            />
            <Form.Label>Image</Form.Label>
        </Form.Group>



    
        
        <button className="bn54">
            <span className="bn54span">Update</span>
        </button>

        </Form>
        </div>
        </>
    )

    
}

import { useEffect, useRef, useState } from "react";
import { ADD, Cat, baseUrl } from "../../../Services/Api";
import axios from "axios";
import LoadingSubmit from '../../../Components/Loading/loading';
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


export default function AddCategory() {
// States
const [title, setTitle] = useState("");
const [image, setImage] = useState("");

const form = new FormData();
form.append("title", title);
form.append("image", image);


// Loading
const [loading, setLoading] = useState(false);


// Err
const [err, setErr] = useState("");

// Ref
const focus = useRef("");

// Handle focus 
useEffect(() => {
    focus.current.focus();
}, [])

// Navigate
const nav = useNavigate();


// Cookie
const cookie = Cookie();
const token = cookie.get("e-commerce");

// handle form change


// handle form submit
async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    try {
        const res = await axios.post(`${baseUrl}/${Cat}/${ADD}`, form, {
        headers: {
            Authorization: "Bearer " + token,
        },
        });
        setLoading(false);
        setErr("")
        
        nav("/dashboard/categories/", { replace: true });

    }
    catch (err) {
        setLoading(false)
        if (err.response.status === 422) {
            setErr("The email has already been taken")
        }
        else {
            setErr("Internal Server Error");
        }
    }
}
console.log(form)


return (
    <>
        {loading && <LoadingSubmit />}
            <div className="row " style={{margin:"15px", height:"70vh"}}>
                <Form className="form" onSubmit={handleSubmit} style={{padding: "10px"}}>
                    <div className="custom-form">

                        <Form.Group
                            className="form-custom"
                            controlId="formBasicName"
                        >
                            <span className="user-icon"></span>
                            <Form.Control
                                type="text"
                                placeholder="Title..."
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                ref={focus}
                            />
                            <Form.Label>Title</Form.Label>
                        </Form.Group>

                        <Form.Group
                            className="form-custom relative"
                            controlId="image"
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




                        <button disabled={title.length > 1 ? false : true} className="bn54">
                            <span className="bn54span">Add Cateogry</span>
                        </button>
                        {err !== "" && (<span className="err">{err}</span>)}

                    </div>
                </Form>
            </div>
    </>
);
}

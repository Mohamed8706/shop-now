import { useEffect, useRef, useState } from "react";
import LoadingSubmit from '../../../Components/Loading/loading';
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useCategories } from "../../../hooks/useCategories";
import { useCategory } from "../../../hooks/useCategory";


export default function AddCategory() {
    
const {add, isAdding: loading, err} = useCategory();

// States
const [title, setTitle] = useState("");
const [image, setImage] = useState("");

const form = new FormData();
form.append("title", title);
form.append("image", image);




// Ref
const focus = useRef("");

// Handle focus 
useEffect(() => {
    focus.current.focus();
}, [])





// handle form submit
async function handleSubmit(e) {
    e.preventDefault();
    add(form);
}

if (loading) return <LoadingSubmit />

return (
    <>
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
                                value={form.title}
                                onChange={(e) =>  setTitle(e.target.value)}
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
                        {err && <span className="err">{err.message || "Something went wrong"}</span>}


                    </div>
                </Form>
            </div>
    </>
);
}

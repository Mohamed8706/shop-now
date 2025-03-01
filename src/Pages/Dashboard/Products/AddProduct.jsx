import { useEffect, useRef, useState } from "react";
import { ADD, CAT, Product, baseUrl } from "../../../Services/Api";
import axios from "axios";
import LoadingSubmit from '../../../Components/Loading/loading';
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Upload from "../../../Assets/upload.png"



export default function AddProduct() {
// States
const [id, setId] = useState("");
const [images, setImages] = useState([]);

const [cat, setCat] = useState([]);
// Loading
const [loading, setLoading] = useState(false);
const [sent, setSent] = useState(false);
const [err, setErr] = useState("");

// Forms
const  [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    About: ''

})
const dummyData = {
    category: null,
    title: 'dummy',
    description: 'dummy',
    price: '220',
    discount: '0',
    stock: '0',
    About: 'About'

}


// Ref
const focus = useRef("");

const openImage = useRef(null);

const progress = useRef([]);

const imagesId = useRef([]);


// Handle refs 
useEffect(() => {
    focus.current.focus();
}, [])

function uploadImage () {
    openImage.current.click();
}
// Navigate
const nav = useNavigate();


// Cookie
const cookie = Cookie();
const token = cookie.get("e-commerce");

    // Get All Categories
    const getCategories = (Categories) => {
            axios.get(`${baseUrl}/${Categories}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(data => setCat(data.data))
        .catch(err => console.log(err))
    }

    const { mutate } = useSWR(`${CAT}`, getCategories)    

// handle form change
function handleChange(e) {
    setForm({...form, [e.target.name] : e.target.value});
    setSent(1)
    if (sent !== 1){
        handleFormSubmit();

    }

}




// handle form edit
async function handleEdit(e) {
    e.preventDefault();
    setLoading(true)
    try {
    

        const res = await axios.post(`${baseUrl}/${Product}/edit/${id}`, form, {
        headers: {
            Authorization: "Bearer " + token,
        },
        });
        setLoading(false);
        setErr("")
        
        nav("/dashboard/products/", { replace: true });

    }
    catch (err) {
        setLoading(false)
        if (err.response.status === 422) {
            setErr("The product already exists")
        }
        else {
            setErr("Internal Server Error");
        }
    }
}

// Handle initial Form submit
async function handleFormSubmit() {
    try {
        const res = await axios.post(`${baseUrl}/${Product}/${ADD}`, dummyData, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then((data) => setId(data.data.id))
    } catch (error) {
        console.log(error)
    }
}
let j = useRef(-1)
// Handle images changes
async function HandleImagesChanges(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;

    for (let i = 0; i < imagesAsFiles.length; i++) {
        j.current++;
        const data = new FormData();
        data.append("image", imagesAsFiles[i]);
        data.append("product_id", id);
        try {
            const res = await axios.post(`${baseUrl}/product-img/add`, data, {
                headers:{
                    Authorization: "Bearer " + token
                },
                onUploadProgress: (ProgressEvent) => {
                    const {loaded, total} = ProgressEvent;
                    const result = Math.floor((loaded * 100) / total);
                    if (result % 10 === 0) {
                        progress.current[j.current].style.width = `${result}%`;
                        progress.current[j.current].setAttribute('percent', result + '%');
                    }
                } 
            }).then((data) => imagesId.current[j.current] = data.data.id)
        } catch (error) {
            console.log("Could not send the image", error)
        }
        
    }
}
// Handle deleting image 
async function HandleDeletingImages(id, name) {
    setImages((prev) => prev.filter((img) => img.name !== name));
    imagesId.current = imagesId.current.filter((i) => i !== id);
    j.current--;
    try {
        const res = await axios.delete(`${baseUrl}/product-img/${id}`, {
            headers:{
                Authorization: "Bearer " + token
            }
        })
    } catch (error) {
        console.log("Could not delete image",error)
    }
}

// Maping 
const categories = cat?.map((cat, ind) => <option key={ind} value={cat.id}>{cat.title}</option>);

const imagesShow = images.map((img, key) => 
    <div key={key} className="w-100 relative border p-2">
    <div className="flex flex-row gap-2 ">
    <img src={URL.createObjectURL(img)} alt="product" className="w-[80px]"/>
    <div>
        <p className="mb-1">{img.name}</p>
        <p>{(img.size / 1024 < 900 ? (img.size / 1024).toFixed(2) + "KB" : 
        (img.size / (1024 * 1024)).toFixed(2) + 'MB' )}</p>
    </div>
    </div> 
    <div  className="custom-progress">
            <span ref={(e) => [progress.current[key] = e]} className="inner-progress"></span>
    </div>
            <FontAwesomeIcon icon={faTrash} style={{color: "orangered"}} 
            className="w-[30px] h-[30px] cursor-pointer mr-[8px] absolute right-4 top-4"
            onClick={() => HandleDeletingImages(imagesId.current[key], img.name)}
            /> 
        
    </div>
    )

return (
    <>
        {loading && <LoadingSubmit />}
            <div className="row " style={{margin:"12px"}}>
                <Form onSubmit={handleEdit} className="h-[95%] m-1">
                    <div className="h-100 bg-white p-5 rounded-xl shadow-2xl">



                        <Form.Group className="form-custom "controlId="formcategory">
                            <Form.Select
                                className="w-100"
                                name="category"
                                value={form.category}
                                onChange={(e) => {
                                    handleChange(e)
                                    
                                }}
                                ref={focus}
                                
                            >
                                <option disabled>Select Category</option>
                            {categories}
                            </Form.Select>
                        </Form.Group>
                        

                        <Form.Group
                            className="form-custom "
                            controlId="formBasicName"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Title..."
                                name="title"
                                value={form.title}
                                onChange={(e) => handleChange(e)}
                                disabled={!sent}
                            
                            />
                            <Form.Label>Title</Form.Label>
                        </Form.Group>

                        <Form.Group
                            className="form-custom"
                            controlId="formdescription"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Description..."
                                name="description"
                                value={form.description}
                                onChange={(e) => handleChange(e)}
                                disabled={!sent}
                                
                            />
                            <Form.Label>Description</Form.Label>
                        </Form.Group>


                        <Form.Group
                            className="form-custom"
                            controlId="formprice"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Price..."
                                name="price"
                                value={form.price}
                                onChange={(e) => handleChange(e)}
                                disabled={!sent}
                                
                            />
                            <Form.Label>Price</Form.Label>
                        </Form.Group>


                        <Form.Group
                            className="form-custom"
                            controlId="formdiscount"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Discount..."
                                name="discount"
                                value={form.discount}
                                onChange={(e) => handleChange(e)}
                                disabled={!sent}
                                
                            />
                            <Form.Label>Discount</Form.Label>
                        </Form.Group>

                        <Form.Group
                            className="form-custom"
                            controlId="formstock"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Stock..."
                                name="stock"
                                value={form.stock}
                                onChange={(e) => handleChange(e)}
                                disabled={!sent}
                                
                            />
                            <Form.Label>Stock</Form.Label>
                        </Form.Group>

                        <Form.Group
                            className="form-custom"
                            controlId="formabout"
                        >
                            
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="About..."
                                name="About"
                                value={form.About}
                                onChange={(e) => handleChange(e)}
                                disabled={!sent}
                                
                            />
                            <Form.Label>About</Form.Label>
                        </Form.Group>


                        <Form.Group
                            className="form-custom relative"
                            controlId="image"
                        >
                            
                            <Form.Control
                                ref={openImage}
                                hidden
                                type="file"
                                name="image"
                                multiple
                                onChange={HandleImagesChanges}
                                disabled={!sent}
                            />
                        
                        </Form.Group>
                        <div onClick={uploadImage} 
                        className="flex items-center justify-center py-3 w-100 flex-col rounded 
                         gap-2 "
                        style={{border: !sent ? "2px dashed gray" : "2px dashed #0086fe", cursor: sent && "pointer"}}
                        >
                        <img style={{filter: !sent && "grayscale(1)"}} src={Upload} alt="upload" className="w-[100px]"/>
                        <p style={{color: !sent ? "gray" : "#0086fe"}} className="font-bold">Upload Images</p>
                        </div>
                    <div className="flex flex-col p-4 items-start justify-center gap-4">
                            {imagesShow} 
                    </div>


                        <button disabled={form.title.length > 1 ? false : true} className="bn54">
                            <span className="bn54span">Add Porduct</span>
                        </button>
                        {err !== "" && (<span className="err">{err}</span>)}

                    </div>
                </Form>
            </div>
    </>
);
}

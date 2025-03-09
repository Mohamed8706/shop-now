import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import Upload from "../../../Assets/upload.png";
import { useCategories } from './../../../hooks/useCategories';
import { useSelectedProduct } from "../../../hooks/useSelectedProduct";
import { useProducts } from './../../../hooks/useProducts';
import { uploadProductImage } from "../../../Services/Api";
import LoadingSubmit from '../../../Components/Loading/loading';

export default function AddProduct() {
    // Hooks
    const { allCategories: cat, isAllLoading: isLoading } = useCategories();
    const { deleteProductImages } = useSelectedProduct();
    const { addProduct, addedProductData: product, editProduct, isEditing } = useProducts();

    // States
    const [images, setImages] = useState([]);
    const [sent, setSent] = useState(false);
    

    const [form, setForm] = useState({
        category: 'Select Category',
        title: '',
        description: '',
        price: '',
        discount: '',
        stock: '',
        About: ''
    });

    const dummyData = {
        category: null,
        title: 'dummy',
        description: 'dummy',
        price: '220',
        discount: '0',
        stock: '0',
        About: 'About'
    };

    // Refs
    const openImage = useRef(null);
    const progress = useRef([]);
    const imagesId = useRef([]);


    // Handlers
    const uploadImage = () => {
        openImage.current.click();
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (!sent) {
            setSent(true);
            handleFormSubmit();
        }
    };

    const handleFormSubmit = async () => {
        addProduct(dummyData);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        editProduct({ form, id: product?.id });
    };

    const uploadImageMutation = useMutation({
        mutationFn: ({ file, productId, index }) => {
            const data = new FormData();
            data.append("image", file);
            data.append("product_id", productId);
            return uploadProductImage(data, (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percent = Math.floor((loaded * 100) / total);
                if (percent % 10 === 0 && progress.current[index]) {
                    progress.current[index].style.width = `${percent}%`;
                    progress.current[index].setAttribute("percent", `${percent}%`);
                }
            });
        },
        onSuccess: (data, variables) => {
            imagesId.current[variables.index] = data.id;
            
        }
    });

    const handleImagesChanges = async (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file, index) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            uploadIndex: images.length + index,
        }));

        setImages((prev) => [...prev, ...newImages]);

        newImages.forEach((img, relativeIndex) => {
            const absoluteIndex = images.length + relativeIndex;
            uploadImageMutation.mutate({
                file: img.file,
                productId: product?.id,
                index: absoluteIndex,
            });
        });
    };

    const handleDeleteImage = async (id, name) => {
            setImages((prev) => prev.filter((img) => img.name !== name));
            imagesId.current = imagesId.current.filter((i) => i !== id);
            deleteProductImages([id]);

    };

    // Mapping
    const categories = cat?.map((cat, ind) => (
        <option key={ind} value={cat.id}>{cat.title}</option>
    ));

    const imagesShow = images.map((img, key) => (
        <div key={key} className="w-100 relative border p-2">
            <div className="flex flex-row gap-2">
                <img src={img.preview} alt="product" className="w-[80px]"/>
                <div>
                    <p className="mb-1">{img.name}</p>
                    <p>{(img.size / 1024 < 900 ? 
                        (img.size / 1024).toFixed(2) + "KB" : 
                        (img.size / (1024 * 1024)).toFixed(2) + 'MB')}
                    </p>
                </div>
            </div>
            <div className="custom-progress">
                <span ref={(e) => (progress.current[key] = e)} className="inner-progress"></span>
            </div>
            <FontAwesomeIcon 
                icon={faTrash} 
                style={{color: "orangered"}} 
                className="w-[30px] h-[30px] cursor-pointer mr-[8px] absolute right-4 top-4"
                onClick={() => handleDeleteImage(imagesId.current[key], img.name)}
            />
        </div>
    ));

    if (isLoading || isEditing) return <LoadingSubmit />;

    return (
        <div className="row" style={{margin: "12px"}}>
            <Form onSubmit={handleEdit} className="h-[95%] m-1">
                <div className="h-100 bg-white p-5 rounded-xl shadow-2xl">
                    <Form.Group className="form-custom" controlId="formcategory">
                        <Form.Select
                            className="w-100"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                        >
                            <option disabled>Select Category</option>
                            {categories}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="formBasicName">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="Title..."
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            disabled={!sent}
                        />
                        <Form.Label>Title</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="formdescription">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="Description..."
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            disabled={!sent}
                        />
                        <Form.Label>Description</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="formprice">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="Price..."
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            disabled={!sent}
                        />
                        <Form.Label>Price</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="formdiscount">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="Discount..."
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            disabled={!sent}
                        />
                        <Form.Label>Discount</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="formstock">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="Stock..."
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            disabled={!sent}
                        />
                        <Form.Label>Stock</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="formabout">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="About..."
                            name="About"
                            value={form.About}
                            onChange={handleChange}
                            disabled={!sent}
                        />
                        <Form.Label>About</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom relative" controlId="image">
                        <Form.Control
                            ref={openImage}
                            hidden
                            type="file"
                            name="image"
                            multiple
                            onChange={handleImagesChanges}
                            disabled={!sent}
                        />
                    </Form.Group>

                    <div 
                        onClick={uploadImage}
                        className="flex items-center justify-center py-3 w-100 flex-col rounded gap-2"
                        style={{
                            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
                            cursor: sent && "pointer"
                        }}
                    >
                        <img 
                            style={{filter: !sent && "grayscale(1)"}}
                            src={Upload} 
                            alt="upload" 
                            className="w-[100px]"
                        />
                        <p 
                            style={{color: !sent ? "gray" : "#0086fe"}}
                            className="font-bold"
                        >
                            Upload Images
                        </p>
                    </div>

                    <div className="flex flex-col p-4 items-start justify-center gap-4">
                        {imagesShow}
                    </div>

                    <button 
                        disabled={form.title.length <= 1}
                        className="bn54"
                    >
                        <span className="bn54span">Add Product</span>
                    </button>
                    {uploadImageMutation.error && <span className="err">{uploadImageMutation.error.message}</span>}
                </div>
            </Form>
        </div>
    );
}
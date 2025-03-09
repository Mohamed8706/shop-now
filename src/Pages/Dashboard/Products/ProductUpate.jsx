import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingSubmit from "../../../Components/Loading/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import updateIcon from "../../../Assets/upload.png";
import { useSelectedProduct } from "../../../hooks/useSelectedProduct";
import { useMutation } from "@tanstack/react-query";
import { uploadProductImage } from "../../../Services/Api";

export default function ProductUpdate() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
        category: "",
        stock: "",
    });

    const [images, setImages] = useState([]);
    const [productImages, setProductImages] = useState([]);

    const { id } = useParams();


    const {
        selectedProduct,
        isFetchingSelectedProduct,
        update,
        isUpdating,
        deleteProductImages,
    } = useSelectedProduct(id);

    // Refs
    const progress = useRef([]);
    const imagesId = useRef([]);
    const deletedImagesId = useRef([]);
    const openImage = useRef(null);

    // Image upload mutation
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
        },
        onError: (error) => {
            console.error("Image upload failed:", error);
        },
    });

    useEffect(() => {
        if (selectedProduct) {
            setForm({
                title: selectedProduct.title,
                description: selectedProduct.description,
                price: selectedProduct.price,
                discount: selectedProduct.discount,
                About: selectedProduct.About,
                category: selectedProduct.category,
                stock: selectedProduct.stock,
            });
            setProductImages(selectedProduct.images);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (deletedImagesId.current.length > 0) {
            deleteProductImages(deletedImagesId.current);
        }
        update({ id, form });
    };

    const handleImagesChanges = async (e) => {
        const files = Array.from(e.target.files);
        const previewImages = files.map((file, index) => ({
            file,
            preview: URL.createObjectURL(file),
            uploadIndex: images.length + index, // Unique index for each upload
        }));

        setImages((prev) => [...prev, ...previewImages]);

        previewImages.forEach((img, relativeIndex) => {
            const absoluteIndex = images.length + relativeIndex;
            uploadImageMutation.mutate({
                file: img.file,
                productId: id,
                index: absoluteIndex,
            });
        });
    };

    const handleDeletingImages = (id, name) => {
        setImages((prev) => prev.filter((img) => img.file.name !== name));
        imagesId.current = imagesId.current.filter((i) => i !== id);
        deleteProductImages([id]);
    };

    const productImagesChanges = (image) => {
        setProductImages((prev) => prev.filter((img) => img.image !== image));
    };

    const imagesShow = images.map((img, key) => (
        <div key={key} className="w-100 relative border p-2">
            <div className="flex flex-row gap-2">
                <img src={img.preview} alt="Preview" className="w-[80px]" />
                <div>
                    <p className="mb-1">{img.file.name}</p>
                    <p>
                        {img.file.size / 1024 < 900
                            ? (img.file.size / 1024).toFixed(2) + "KB"
                            : (img.file.size / (1024 * 1024)).toFixed(2) + "MB"}
                    </p>
                </div>
            </div>
            <div className="custom-progress">
                <span
                    ref={(el) => (progress.current[img.uploadIndex] = el)}
                    className="inner-progress"
                ></span>
            </div>
            <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "orangered" }}
                className="w-[30px] h-[30px] cursor-pointer mr-[8px] absolute right-4 top-4"
                onClick={() =>
                    handleDeletingImages(imagesId.current[img.uploadIndex], img.file.name)
                }
            />
        </div>
    ));

    const showProductImages = productImages.map((img, key) => (
        <div key={key} className="w-100 relative border p-2">
            <div className="flex flex-row gap-2">
                <img
                    src={`https://ecommerce-backend-production-5ad6.up.railway.app${img.image}`}
                    alt="product"
                    className="w-[80px]"
                />
            </div>
            <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "orangered" }}
                className="w-[30px] h-[30px] cursor-pointer mr-[8px] absolute right-4 top-4"
                onClick={() => {
                    productImagesChanges(img.image);
                    deletedImagesId.current = [...deletedImagesId.current, img.id];
                }}
            />
        </div>
    ));

    if (isFetchingSelectedProduct || isUpdating) return <LoadingSubmit />;

    return (
        <div className="row p-2" style={{ margin: "12px" }}>
            <Form
                className="border bg-white rounded-xl ml-1 p-4 shadow-2xl h-100"
                onSubmit={handleUpdate}
            >
                <Form.Group className="form-custom" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>Title</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom" controlId="formBasicDescription">
                    <Form.Control
                        type="text"
                        placeholder="Description..."
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>Description</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom" controlId="formBasicPrice">
                    <Form.Control
                        type="text"
                        placeholder="Price..."
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>Price</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom" controlId="formBasicDiscount">
                    <Form.Control
                        type="text"
                        placeholder="Discount..."
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>Dicsount</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom" controlId="formBasicStock">
                    <Form.Control
                        type="search"
                        placeholder="Stock..."
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>Stock</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom" controlId="formBasicAbout">
                    <Form.Control
                        type="text"
                        placeholder="About..."
                        name="About"
                        value={form.About}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>About</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom" controlId="formBasicCategory">
                    <Form.Control
                        type="text"
                        placeholder="Category..."
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-100"
                    />
                    <Form.Label>Category</Form.Label>
                </Form.Group>

                <Form.Group className="form-custom relative" controlId="image">
                    <Form.Control
                        ref={openImage}
                        hidden
                        type="file"
                        name="image"
                        multiple
                        onChange={handleImagesChanges}
                    />
                </Form.Group>

                <div
                    onClick={() => openImage.current.click()}
                    className="flex items-center justify-center py-3 w-100 flex-col rounded gap-2"
                    style={{ border: "2px dashed #0086fe", cursor: "pointer" }}
                >
                    <img src={updateIcon} alt="upload" className="w-[100px]" />
                    <p style={{ color: "#0086fe" }} className="font-bold">
                        Upload Images
                    </p>
                </div>

                <div className="flex flex-col p-4 items-start justify-center gap-4">
                    {showProductImages}
                </div>

                <div className="flex flex-col p-4 items-start justify-center gap-4">
                    {imagesShow}
                </div>

                <button className="bn54" type="submit">
                    <span className="bn54span">Update</span>
                </button>
            </Form>
        </div>
    );
}

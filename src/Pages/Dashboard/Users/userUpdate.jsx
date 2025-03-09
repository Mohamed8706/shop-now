import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import { useUser } from "../../../hooks/useUser";



export default function UserUpdate() {
    // State for form inputs
    const [form, setForm] = useState({
            name: "",
            email: "",
            role: "",
        });
        
    const { id } = useParams();

    // Fetch selected user
    const { selectedUser, isFetchingSelectedUser, update, isUpdating } = useUser(id);

    useEffect(() => {
        if (selectedUser) {
            setForm({
                name: selectedUser.name || "",
                email: selectedUser.email || "",
                role: selectedUser.role || "",
            });
        }
    }, [selectedUser]);

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


    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    

    async function handleUpdate(e) {
        e.preventDefault();
        update({ id, form });
    }

    if (isFetchingSelectedUser || isUpdating) {
        return <LoadingSubmit />;
    }


    return( 
        <>
        <div className="row " style={{margin:"25px", height:"70vh"}}>
        <Form className="form" style={{height:"100%", padding: "30px"}} onSubmit={handleUpdate}>
        <Form.Group
            className="form-custom"
            controlId="formBasicName"
        >
            <span className="user-icon"></span>
            <Form.Control
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <Form.Label>Name</Form.Label>
        </Form.Group>

        <Form.Group
            className="form-custom"
            controlId="formBasicEmail"
        >
            <span className="email-icon"></span>
            <Form.Control
                type="email"
                placeholder="Enter your e-mail"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <Form.Label>Email</Form.Label>
        </Form.Group>

        
        <Form.Group
            className="form-custom"
            controlId="formBasicRoles"
        >
            <Form.Select
                name="role"
                onChange={handleChange}
                value={form.role}
                id="mySelect"
            > 
            <option value="" disabled>Select A Role</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Categories</option>

            </Form.Select>
            <Form.Label>Roles</Form.Label>
        </Form.Group>
        
        <button disabled={isFetchingSelectedUser} className="bn54">
            <span className="bn54span">Update</span>
        </button>

        </Form>
        </div>
        </>
    )
    
}
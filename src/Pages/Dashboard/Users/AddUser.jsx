import { useEffect, useRef, useState } from "react";
import LoadingSubmit from '../../../Components/Loading/loading';
import { Form } from "react-bootstrap";
import  GoogleIcon  from "../../../Assets/icons8-google.svg";
import { useAuth } from "../../../hooks/useAuth";
import { baseUrl } from "../../../Services/Api";




export default function AddUser() {
    // States
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    });

    const {add, isAdding, addingError} = useAuth();

    // Ref
    const focus = useRef("");

    // Handle focus 
    useEffect(() => {
        focus.current.focus();
    }, [])





    // handle form change
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        add(form)
    }


    if (isAdding) {
        return <LoadingSubmit />;
    }

    return (
        <>
        <div className="row rounded-2xl" style={{margin:"5px", height:"70vh"}}>
            <Form className="form" onSubmit={handleSubmit} style={{padding: "10px"}}>
                <div className="custom-form">
                    <div className="google-wraper">
                        <a href={`${baseUrl}/login-google`}>
                        <img src={GoogleIcon} className="google-icon"
                                    alt="google-icon" />
                            <p className="par">Continue with Google</p>
                        </a>
                    </div>
                    <span className="divider">or</span>

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
                            ref={focus}
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
                        controlId="formBasicPassword"
                    >
                        <span className="pass-icon"></span>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />
                        <Form.Label>Password</Form.Label>
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
                            <option value="1999">Prodcut Manager</option>
                            </Form.Select>
                            <Form.Label>Roles</Form.Label>
                    </Form.Group>


                    <button disabled={form.name.length > 1 &&
                                    form.email.length > 1 &&
                                    form.password.length > 6 &&
                                    form.role !== "" ? false : true} className="bn54">
                        <span className="bn54span">Register</span>
                    </button>
                    {addingError && (<span className="err">{addingError.message}</span>)}

                </div>
            </Form>
        </div>
        </>
    );
}

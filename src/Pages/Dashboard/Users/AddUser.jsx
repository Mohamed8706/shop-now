import { useEffect, useRef, useState } from "react";
import { ADD, REGISTER, USER, baseUrl } from "../../../Services/Api";
import axios from "axios";
import LoadingSubmit from '../../../Components/Loading/loading';
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import  GoogleIcon  from "../../../Assets/icons8-google.svg";



export default function AddUser() {
    // States
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    });


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
    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/${USER}/${ADD}`, form, {
            headers: {
                Authorization: "Bearer " + token,
            }
            });
            setLoading(false);
            setErr("")
            
            nav("/dashboard/users/", { replace: true });

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


    return (
        <>
            {loading && <LoadingSubmit />}
                <div className="row " style={{margin:"15px", height:"70vh"}}>
                    <Form className="form" onSubmit={handleSubmit} style={{padding: "10px"}}>
                        <div className="custom-form">
                            <div className="google-wraper">
                                <a href="http://127.0.0.1:8000/login-google">
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
                            {err !== "" && (<span className="err">{err}</span>)}

                        </div>
                    </Form>
                </div>
        </>
    );
}

import { useEffect, useRef, useState } from "react";
import LoadingSubmit from '../../../Components/Loading/loading';

import { Form } from "react-bootstrap";
import GoogleIcon from "../../../Assets/icons8-google.svg";

import { useAuth } from "../../../hooks/useAuth";



    export default function Register() {
    // States
    const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
    });

    const {register, isRegistering, registerError} = useAuth();

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
    register(form);
    }


    return (
    <>
    {isRegistering && <LoadingSubmit />}
    <div className="container">
    <div className="row h-100vh">
    <Form className="form" onSubmit={handleSubmit}>
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

    <button className="bn54">
    <span className="bn54span">Register</span>
    </button>
    {registerError !== null && (<span className="err">{registerError}</span>)}

    </div>
    </Form>
    </div>
    </div>
    </>
    );
    }

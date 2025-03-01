import {  useEffect, useRef, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { Link } from "react-router-dom";
import myIcon from "../../../Assets/Login-amico.svg";
import { Form } from "react-bootstrap";
import { Google } from "../../../Components/Website/Utils/Google";
import { useAuth } from './../../../hooks/useAuth';


    export default function LogIn() {

    const  {login, isLoggingIn, loginError} = useAuth();

    // States
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    // Ref
    const foc = useRef(null);

    useEffect(() => {
        foc.current.focus();
    }, [])

    // handle form change
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        login(form)
    }

    return (
        <>
        {isLoggingIn && <LoadingSubmit />}
        <div className="container">
            <div className="row ">
            <Form className="form" onSubmit={handleSubmit}>
                <div className="custom-form">
                    <Google />
                <span className="divider">or</span>

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
                    ref={foc}
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
                <span className="bn54span">Login</span>
                </button>
                {loginError !== null && (
                    <>
                    <p className="foot-note">
                        <Link to="/register">Don't have an email?</Link>
                    </p>
                    <span className="err">{loginError}</span>
                    </>
                )}
                {loginError === null && (
                    <div className="icon-span">
                    <p className="foot-note">
                        <Link to="/register">Don't have an email?</Link>
                    </p>
                    <img src={myIcon} alt="Ecommerce Illustration" className="my-icon" />
                    </div>
                )}
                </div>
            </Form>
            </div>
        </div>
        </>
    );
    }

import React, { useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, Form, FormGroup, FormCheck } from 'react-bootstrap'
import { useAuth } from "../contextAuth";
//import Button from "../components/button";
import FormInput from "../components/formInput";
import './style.css';
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } =useAuth();
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        await delay(500);
        try {
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/home");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Incorrect email or password.");
            } else if (error.message === "Network Error") {
                setError("Network error, please try again later.");
            } else {
                setError("Failed to log in. Please try again.");
            }
        }
        setLoading(false);
    }, [login, navigate]);

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (

        <div className="login-wrapper">
            <div className="login-form-container">
                <h2 className="login-title">Welcome Back!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="login-form" onSubmit={handleSubmit} >
                    <FormGroup className="mb-3" id="email">
                        <FormInput label="Email"
                            type="email"
                            ref={emailRef}
                            placeholder="Enter Email"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" id="Password">
                        <FormInput label="Password"
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter password"
                            // onChange={(e) => setPassword(e.target.value)}
            
                        />
                    </FormGroup>
                    <FormGroup className="mb-2" controlId="checkbox">
                        <FormCheck type="checkbox" label="Remember me" />
                    </FormGroup>

                    
                        <Button disabled={loading} className="w-100" variant="primary" type="submit">
                            <FaSignInAlt/> {loading ? "Logging In..." : "Log In"}</Button>
            
           
            
                </Form>
                <p className="ms-5">Don't have an account?<Link className="text-decoration-none" to="/signup">  Sign up</Link></p>
            </div>
        </div>

    );
};

export default Login;
import React, { useRef, useState, useCallback } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Button, Alert, Form, FormGroup } from 'react-bootstrap'
import { useAuth } from "../contextAuth";
//import Button from "../components/button";

import FormInput from "../components/formInput";
import { FaUserPlus } from "react-icons/fa";
import './style.css';


const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        await delay(500);
        try {
            if (passwordRef.current.value !== confirmPasswordRef.current.value) {
                setError('passwords do not match');
                return;
            } 
            setError("");
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/home");
        } catch {
            setError("Failed to create an account");
        } finally {
            setLoading(false);
        }
    }, [signup, navigate]);

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                <h2 className="login-title">Register with us</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="login-form" onSubmit={handleSubmit}>
                    <FormGroup className="mb-3" id="email">
                        <FormInput label="Email"
                            type="email"
                            ref={emailRef}
                            placeholder="Enter Email"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" id="password">

                        <FormInput label="Password"
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter password"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" id="password-Confirm">
                        <FormInput label="Confirm Password"
                            type="password"
                            ref={confirmPasswordRef}
                            placeholder= "Confirm Password"
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormGroup>

                    <Button disabled={loading} className="w-100" type="submit">
                        <FaUserPlus /> {loading ? "Registering..." : "Sign Up"}
                    </Button>

                </Form>
                <p className="ms-5">Already have an account? <Link className="text-decoration-none" to="/login">Login</Link> </p>
            </div>
        </div>
    );
};

export default Signup;
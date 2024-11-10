import React from 'react';
import {Form} from 'react-bootstrap';
const FormInput = React.forwardRef(({ label, type, placeholder }, ref) => (
    
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                ref={ref}
                type={type}
                placeholder={placeholder}
                // onChange={onChange}
            />
        </>

));

export default FormInput;
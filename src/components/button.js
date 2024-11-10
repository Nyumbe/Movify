import React from 'react';
import { Button as BButton } from 'react-bootstrap';

const Button = ({ variant, type, children }) => {
    return(
        <BButton variant={variant} type={type}>{children}</BButton>
    );
};

export default Button;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextAuth";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import Brand from "../images/Brand.png";
import { FaUser } from "react-icons/fa6";

const NavBar = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [navColour, updateNavbar] = useState(false);

    function scrollHandler() {
        if (window.scrollY >= 20) {
            updateNavbar(true);
        } else {
            updateNavbar(false);
        }
    }

    window.addEventListener("scroll", scrollHandler);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <Navbar expand="md" sticky="top" className={navColour ? "sticky" : "navbar"}>
            <Container>
                <Navbar.Brand>
                    <Link to="/trending">
                        <img src={Brand} alt="Brand" className="d-inline-block align-top" width="40" height="40" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" defaultActiveKey="#home">
                        <Nav.Link as={Link} to="/home" exact>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/movies">
                            Movies
                        </Nav.Link>
                        <Nav.Link as={Link} to="/tv">
                            TV Shows
                        </Nav.Link>
                        <Nav.Link as={Link} to="/toprated">
                            Top IMDB
                        </Nav.Link>
                        {currentUser ? (
                                                    <NavDropdown
                                                    title={
                                                        <>
                                                            <FaUser className="mr-2" />
                                                            {currentUser.email}
                                                        </>
                                                    }
                                                    id="basic-nav-dropdown"
                                                >
                                <NavDropdown.Item as={Link} to="/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} onClick={handleLogout}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button variant="primary" onClick={() => navigate("/login")}>
                                Sign In
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
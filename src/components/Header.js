import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavbarText, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import logo from '../images/quizLogo.svg'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import EditPictureModal from './auth/EditPictureModal';

const Header = ({ auth }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let location = useLocation();

    const authLinks = (
        <>
            <NavbarText className="mx-0 p-0 text-warning d-flex justify-content-center align-items-center toDashboard">

                <EditPictureModal auth={auth} />

                <Link to="/#">
                    <small className="text-warning ml-2 d-none d-lg-flex">
                        {auth.user && auth.user ? auth.user.name.split(" ")[0] : ''}
                    </small>
                </Link>

                <Dropdown isOpen={isOpen} toggle={toggle}>
                    <DropdownToggle>
                        <span className='profileDropDown mx-2 mx-lg-3'>
                            <i className={`fa fa-angle-${isOpen ? 'up' : 'down'}`}></i>
                        </span>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>
                            <ListGroup>

                                <ListGroupItem className='bg-warning'>
                                    <h6 className='mb-0 font-weight-bolder text-white text-uppercase'>{auth.user && auth.user ? auth.user.name.split(" ")[0] : ''}</h6></ListGroupItem>

                                <ListGroupItem>
                                    {auth.user && auth.user.school ?
                                        <Link to="#/">
                                            <span className={`${auth.user && !auth.user.school ? 'text-danger' : ''}`}>
                                                {(auth.user && auth.user.school.title)}
                                            </span>
                                        </Link> :
                                        <Link to={`/edit-profile/${auth.user && auth.user._id}`}>
                                            Please add a school
                                        </Link>}
                                </ListGroupItem>

                                <ListGroupItem>
                                    {auth.user && auth.user.level ?
                                        <Link to="#/">
                                            <span className={`${auth.user && !auth.user.level ? 'text-danger' : ''}`}>
                                                {(auth.user && auth.user.level.title)}
                                            </span>
                                        </Link> :
                                        <Link to={`/edit-profile/${auth.user && auth.user._id}`}>
                                            Please add a level
                                        </Link>}
                                </ListGroupItem>

                                <ListGroupItem>
                                    {auth.user && auth.user.faculty ?
                                        <Link to="#/">
                                            <span className={`${auth.user && !auth.user.faculty ? 'text-danger' : ''}`}>
                                                {(auth.user && auth.user.faculty.title)}
                                            </span>
                                        </Link> :
                                        <Link to={`/edit-profile/${auth.user && auth.user._id}`}>
                                            Please add a faculty
                                        </Link>}
                                </ListGroupItem>

                                <ListGroupItem>
                                    {auth.user && auth.user.year ?
                                        <Link to="#/">
                                            <span className={`${auth.user && !auth.user.year ? 'text-danger' : ''}`}>
                                                {(auth.user && auth.user.year)}
                                            </span>
                                        </Link> :
                                        <Link to={`/edit-profile/${auth.user && auth.user._id}`}>
                                            Please add a year
                                        </Link>}
                                </ListGroupItem>
                            </ListGroup>
                        </DropdownItem>

                        <DropdownItem text>
                            <Link to="/webmaster">
                                Dashboard
                            </Link>
                        </DropdownItem>

                        <DropdownItem text>
                            <Link to={`/edit-profile/${auth.user && auth.user._id}`}>
                                Edit Profile
                            </Link>
                        </DropdownItem>

                        <DropdownItem text className='d-flex'>
                            <Logout />
                        </DropdownItem>

                    </DropdownMenu>
                </Dropdown>
            </NavbarText>

            <NavbarText className="logout ml-2 d-none">
                <Logout />
            </NavbarText>
        </>)

    const guestLinks = (
        <>
            <NavbarText className="mr-2 login-modal">
                <LoginModal isAuthenticated={auth.isAuthenticated} />
            </NavbarText>

            <NavbarText className="ml-2 register-modal">
                <RegisterModal isAuthenticated={auth.isAuthenticated} />
            </NavbarText>
        </>
    )

    return (
        <header style={{ boxShadow: "0 2px 10px -1px rgba(0,0,0,0.75)" }}>

            <Navbar color="primary" light expand="lg" className="px-lg-5 py-md-3">
                <NavbarBrand href="/" className="text-white" style={{ fontWeight: "900" }}>
                    <img src={logo} alt="Quiz Blog Logo" />
                </NavbarBrand>

                <Collapse navbar>
                    <Nav className="mr-auto d-none d-lg-flex" navbar></Nav>

                    {
                        location.pathname !== '/' ?

                            <Button color="success" size="md" className="mr-2 px-md-2 mr-md-4 back-home">
                                <Link to="/" className="text-white back-home-link">Back Home</Link>
                            </Button> :

                            location.pathname !== '/all-categories' ?
                                <NavbarText className="mr-2 mr-md-4">
                                    <Link to="/all-categories" className="text-white">Categories</Link>
                                </NavbarText> :
                                null
                    }

                    <NavbarText className="mr-2 mr-md-4">
                        <Link to="/course-notes" className="text-white">Notes</Link>
                    </NavbarText>
                    <NavbarText className="mr-2 mr-md-4">
                        <Link to="/about" className="text-white">About</Link>
                    </NavbarText>
                    <NavbarText className="mr-2 mr-md-4">
                        <Link to="/contact" className="text-white">Contact</Link>
                    </NavbarText>
                    {auth.isAuthenticated ? authLinks : guestLinks}
                </Collapse>

            </Navbar>
        </header>
    )
}

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

export default Header
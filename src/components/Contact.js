import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button, Col, Row, Form, FormGroup, Input, Alert } from 'reactstrap';
// import ResponsiveAd from './adsenses/ResponsiveAd';
// // import ResponsiveAd from '../adsenses/ResponsiveAd';

import { clearErrors } from '../redux/error/error.actions'
import { sendMsg } from '../redux/contacts/contacts.actions'

const Contact = ({ clearErrors, error, sendMsg }) => {

    const [state, setState] = useState({
        contact_name: '',
        email: '',
        message: ''
    })

    const onChangeHandler = e => {
        clearErrors();
        const { name, value } = e.target
        setState(state => ({ ...state, [name]: value }))
    };

    const onContact = e => {
        e.preventDefault();

        const { contact_name, email, message } = state;

        // Create user object
        const contactMsg = {
            contact_name,
            email,
            message
        };

        // Attempt to contact
        sendMsg(contactMsg);

        // Reset fields
        setState({
            contact_name: '',
            email: '',
            message: ''
        })
    }

    return (
        <div className='py-0 py-lg-5'>
            <Jumbotron className="p-2 text-center border border-info">
                <h1 className="display-5 font-weight-bold text-success">Let's connect!</h1>
                <p className="lead mb-1">
                    Quiz Blog is a web application that provides a multi-category space for people to quiz from.
                </p>

                <p>It gives people good time to fix what they studied and even prepare for exams.</p>

                <hr className="my-2" />
                <small className='font-weight-bolder text-info'>Do you need further clarifications? Don't hesitate to contact us!</small>
            </Jumbotron>

            <Row className="mx-2 px-1 mx-md-5 px-md-5 contact d-md-flex justify-content-center">

                <Col sm="12">
                    <h6 className="text-center text-uppercase text-success mb-md-3 font-weight-bolder">
                        <u>Contact Quiz Blog</u>
                        </h6>
                </Col>

                <Col sm="6" className="mb-5">
                    {/* Google responsive 1 ad */}
                    {/* <ResponsiveAd /> */}
                    {error.id === "ADD_CONTACT_FAIL" ?
                        <Alert color='danger' className='border border-warning'>
                            <small>{error.msg.msg}</small>
                        </Alert> :
                        null
                    }

                    <Form onSubmit={onContact}>
                        <FormGroup>
                            <Input type="text" name="contact_name" placeholder="Name" minLength="4" maxLength="30" onChange={onChangeHandler} value={state.contact_name} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="email" name="email" placeholder="Email" onChange={onChangeHandler} value={state.email} required />
                        </FormGroup>

                        <FormGroup row>
                            <Input type="textarea" name="message" placeholder="Message" rows="5" minLength="10" maxLength="1000" onChange={onChangeHandler} value={state.message} required />
                        </FormGroup>
                        <Button color="primary">Send</Button>
                    </Form>
                    {/* Google square ad */}
                    {/* <SquareAd/> */}
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.errorReducer
})

export default connect(mapStateToProps, { clearErrors, sendMsg })(Contact)

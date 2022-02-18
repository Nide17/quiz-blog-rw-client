import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOneNotePaper } from '../../redux/notes/notes.actions'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'

const ViewNotePaper = ({ auth, nPaper, getOneNotePaper }) => {

    // Access route parameters
    const { notePaperId } = useParams()

    useEffect(() => {
        getOneNotePaper(notePaperId);
    }, [getOneNotePaper, notePaperId]);

    const { title, description, courseCategory, course, chapter, notes_file, createdAt } = nPaper.oneNotePaper

    let date = new Date(createdAt);

    return (

        !auth.isAuthenticated ?

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal isAuthenticated={auth.isAuthenticated} />
                }
            </div> :

            nPaper.isOneNotePaperLoading ?

                <>
                    <div className="py-3 d-flex justify-content-center align-items-center">
                        <Spinner color="warning" style={{ width: '10rem', height: '10rem' }} />
                    </div>
                    <div className="py-3 d-flex justify-content-center align-items-center">
                        <h4 className="blink_load">Loading ...</h4>
                    </div>
                    <div className="py-3 d-flex justify-content-center align-items-center">
                        <Spinner type="grow" color="success" style={{ width: '10rem', height: '10rem' }} />
                    </div>
                </> :

                notes_file && notes_file ?

                    <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80">

                        <div className="question-view">
                            <Row>
                                <Col>

                                    <Card body className='question-section text-center my-2 mx-auto w-75'>
                                        <CardTitle tag="h5" className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                            {title})
                                        </CardTitle>

                                        <CardText>{description}</CardText>

                                        <small className='text-center text-info font-weight-bolder'>{date.toDateString()}</small>

                                        <div className='answer d-flex justify-content-center mx-auto mt-2 w-lg-50'>
                                            <a href={notes_file}>
                                                <Button className="btn btn-outline-primary mt-3">
                                                    Download
                                                </Button>
                                            </a>

                                            <Link to={'/'}>
                                                <Button className="btn btn-outline-primary mt-3">
                                                    Back
                                                </Button>
                                            </Link>
                                        </div>

                                        <small className="mt-3 text-info">
                                            ~{courseCategory.title} | {course.title} | {chapter.title}~
                                        </small>

                                    </Card>

                                </Col>
                            </Row>
                        </div>

                    </Container> :

                    <div className="pt-5 d-flex justify-content-center align-items-center">
                        <h4>This file is unavailable!</h4>
                        <Link to={'/'}>
                            <Button className="btn btn-outline-primary mt-3">
                                Go back
                            </Button>
                        </Link>
                    </div>)
}

ViewNotePaper.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    nPaper: state.notesReducer
});

export default connect(mapStateToProps, { getOneNotePaper })(ViewNotePaper)
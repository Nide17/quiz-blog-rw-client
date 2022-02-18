import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { Row, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import { getTakerScores } from '../../redux/scores/scores.actions'

const Reports = ({ auth, sCT, getTakerScores }) => {

    const userId = auth.user._id

    useEffect(() => {
        getTakerScores(userId);
    }, [getTakerScores, userId]);

    return (

        auth.isAuthenticated ?

            sCT.isLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                    <ReactLoading type="cylon" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                </div> :

                <>
                    <Row className="text-center m-3 mb-1 m-lg-5 d-flex justify-content-center past-scores">
                        <h3 className="mb-0 font-weight-bolder text-uppercase">
                            <u>Your past scores</u>
                        </h3>
                    </Row>

                    <Row className="mx-0 mb-4 justify-content-center">
                        {
                            sCT && sCT.takerScores.length < 1 ?
                                <p className='my-5 text-danger font-weight-bolder p-2 border border-dark rounded'>
                                    Seems like you have nothing here! Please try to take some quizes
                                </p> :

                                sCT && sCT.takerScores.map(score => (

                                    <Col sm="3" key={score._id} className="px-2 mt-2 report-toast">
                                        <Toast>
                                            <ToastHeader className="text-success">
                                                <strong>{score.quiz && score.quiz.title}</strong>&nbsp;
                                                <small className="d-flex align-items-center">
                                                    ({score.category && score.category.title})
                                                </small>
                                            </ToastHeader>

                                            <ToastBody>

                                                {score.quiz && score.quiz.questions.length > 0 ?
                                                    <Link to={`/review-quiz/${score.id}`} className="font-weight-bold text-info">
                                                        Review answers
                                                    </Link> :
                                                    <p className="text-danger">Review unavailable!</p>}

                                                <p className="mt-1">Score:&nbsp;
                                                    <strong className="text-warning">
                                                        {score.marks}/{score.out_of}
                                                    </strong>
                                                </p>

                                                {auth.user.role === 'Admin' ?
                                                    <PDFDownloadLink
                                                        document={<PdfDocument review={score.review} />}
                                                        fileName={`${score.review.title ? score.review.title.split(' ').join('-') : score.review.title}.pdf`}
                                                        style={{
                                                            textDecoration: "none",
                                                            padding: "3px 5px",
                                                            color: "white",
                                                            backgroundColor: "#157a6e",
                                                            border: "1px solid #ffc107",
                                                            borderRadius: "4px",
                                                            display: "block",
                                                            width: "fit-content"
                                                        }}
                                                    >
                                                        {({ blob, url, loading, error }) =>
                                                            loading ? 'Preparing document...' : 'Download pdf'
                                                        }
                                                    </PDFDownloadLink> : null}

                                                <small className="text-center">
                                                    On {score.test_date.split('T').slice(0, 2).join(' at ')}
                                                </small>
                                            </ToastBody>
                                        </Toast>

                                    </Col>
                                ))}
                    </Row> </> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    sCT.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal isAuthenticated={auth.isAuthenticated} />
                }
            </div>
    )
}

Reports.propTypes = {
    auth: PropTypes.object,
}

// Map  state props
const mapStateToProps = state => ({
    sCT: state.scoresReducer
});

export default connect(mapStateToProps, { getTakerScores })(Reports)
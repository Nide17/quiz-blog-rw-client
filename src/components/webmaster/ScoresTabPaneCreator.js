import React, { useEffect } from 'react'
import { Row, TabPane, Table, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCreatorScores, deleteScore } from '../../redux/scores/scores.actions'
import ReactLoading from "react-loading";
import trash from '../../images/trash.svg';

const ScoresTabPaneCreator = ({ auth, getCreatorScores, scores, deleteScore }) => {

    const uId = auth && auth.user._id

    // Lifecycle methods
    useEffect(() => {
        getCreatorScores(uId);
    }, [getCreatorScores, uId]);

    const cScores = scores && scores.creatorScores

    return (

        <TabPane tabId="6">

            {
                scores.isLoading ?
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                        <ReactLoading type="spinningBubbles" color="#33FFFC" />
                    </div> :

                    <Row>

                        {scores && scores.creatorScores.length > 0 ?
                            <Table bordered className='all-scores table-success' hover responsive striped size="sm">
                                <thead className='text-uppercase table-dark'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Taker</th>
                                        <th scope="col">Quiz</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Marks</th>
                                        <th scope="col">Out of</th>
                                        <th scope="col">❌</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {cScores && cScores.map((score, index) => (

                                        <tr key={index}>
                                            <th scope="row" className="table-dark">{index + 1}</th>
                                            <td>{score.test_date.split('T').slice(0, 1)}</td>
                                            <td className='text-uppercase'>{score && score.users_scores_name}</td>
                                            <td>{score && score.quiz_scores_title}</td>
                                            <td>{score && score.category_scores_title}</td>
                                            <td className={

                                                // IF IT'S COMPTIA
                                                score.category && score.category._id === '60e9a2ba82f7830015c317f1' ?
                                                    score.out_of * 4 / 5 > score.marks ? "font-weight-bold text-danger" : "text-success" :
                                                    score.out_of / 2 > score.marks ? "font-weight-bold text-danger" : "text-success"}>
                                                {score.marks}
                                            </td>
                                            <td className={score.out_of / 2 > score.marks ? "font-weight-bold text-danger" : "text-success"}>
                                                {score.out_of}
                                            </td>
                                            <td className="table-dark">
                                                <Button size="sm" color="link" className="mt-0 p-0" onClick={() => deleteScore(score._id)}>
                                                    <img src={trash} alt="" width="16" height="16" />
                                                </Button>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </Table> :
                            <Alert color="danger" className="w-100 text-center">
                                No scores for your quizzes yet!
                            </Alert>}

                        <div className="your-past-scores my-3 w-100 text-center">
                            <Link to="/reports-admin">
                                <Button outline color="info" size="sm">
                                    Click here for your past scores
                                </Button>
                            </Link>
                        </div>

                    </Row>}
        </TabPane>
    )
}

const mapStateToProps = state => ({
    scores: state.scoresReducer
})

export default connect(mapStateToProps, { getCreatorScores, deleteScore })(ScoresTabPaneCreator)
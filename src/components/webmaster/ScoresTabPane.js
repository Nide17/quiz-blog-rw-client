import React, { useState, useEffect } from 'react'
import { Row, TabPane, Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setScores, deleteScore } from '../../redux/scores/scores.actions'
import ReactLoading from "react-loading";
import trash from '../../images/trash.svg';
import Pagination from './Pagination';
import PageOf from './PageOf';

const ScoresTabPane = ({ scores, setScores, deleteScore }) => {

    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // Lifecycle methods
    useEffect(() => {
        setScores(pageNo);
        setNumberOfPages(scores.totalPages);
    }, [setScores, pageNo, scores.totalPages]);

    return (

        <TabPane tabId="6">

            {
                scores.isLoading ?
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                        <ReactLoading type="spinningBubbles" color="#33FFFC" />
                    </div> :

                        <Row>
                        <PageOf pageNo={pageNo} numberOfPages={numberOfPages} />
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

                                    {scores && scores.allScores.map((score, index) => (

                                        <tr key={index}>
                                            <th scope="row" className="table-dark">{((pageNo - 1) * 20) + index + 1}</th>
                                            <td>{score.test_date.split('T').slice(0, 1)}</td>
                                            <td className='text-uppercase'>
                                                {score.taken_by && score.taken_by.name}
                                                </td>
                                            <td>{score.quiz && score.quiz.title}</td>
                                            <td>{score.category && score.category.title}</td>
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
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                            <Pagination pageNo={pageNo} setPageNo={setPageNo} numberOfPages={numberOfPages} />

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

export default connect(mapStateToProps, { setScores, deleteScore })(ScoresTabPane)
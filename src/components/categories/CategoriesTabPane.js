import React from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { deleteCategory } from '../../redux/categories/categories.actions'
import ReactLoading from "react-loading";

import AddQuiz from '../quizes/AddQuiz';
import EditCategory from './EditCategory';
import DeleteIcon from '../../images/remove.svg';

const CategoriesTabPane = ({ auth, categories, deleteCategory }) => {

    return (
        <TabPane tabId="1">

        {categories.isLoading ? 
                <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                    <ReactLoading type="spinningBubbles" color="#33FFFC" />
                </div>:
            <Row>
                {categories.allcategories && categories.allcategories.map(category => (

                    <Col sm="6" className="mt-2" key={category._id}>

                        <Card body>

                            <CardTitle>
                                <Link to={`/category/${category._id}`} className="text-success text-uppercase">
                                    {category.title} Quizes ({category.quizes.length})
                            </Link>
                            </CardTitle>

                            <CardText>{category.description}</CardText>

                            <div className="actions ml-3">

                                <Button size="sm" outline color="info" className="mx-2">
                                    <strong><AddQuiz category={category} auth={auth} /></strong>
                                </Button>

                                {
                                    auth.user.role === 'Admin' ?
                                        <>
                                            <Button size="sm" color="link" className="mx-2">
                                                <EditCategory auth={auth} idToUpdate={category._id} editTitle={category.title} editingCategory={category.description} />
                                            </Button>

                                            <Button size="sm" color="link" className="mx-2" onClick={() => deleteCategory(category._id)}>
                                                <img src={DeleteIcon} alt="" width="16" height="16" />
                                            </Button>
                                        </>
                                        : null
                                }

                            </div>

                        </Card>
                    </Col>
                ))}
            </Row>
        }

        </TabPane>
    )
}

export default connect(null, { deleteCategory })(CategoriesTabPane)
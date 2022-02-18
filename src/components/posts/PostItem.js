import React from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";

const PostItem = ({ quiz, fromSearch }) => {

    const { _id, title, description, creation_date, category, created_by, questions } = quiz

    let date = new Date(creation_date);

    return (
        <Card body className={fromSearch ? 'bg-info text-white py-3 px-1 px-lg-3 my-2 my-lg-3 border' : 'bg-secondary py-3 px-1 px-lg-3 my-2 my-lg-3 border'}>

            <CardTitle tag="h4" className={`mb-0 ${fromSearch ? 'text-white' : 'text-primary'} text-capitalize`}>
                <Link to={`/view-quiz/${_id}`}>{title && title}
                    &nbsp;<span className="text-danger">({questions && questions.length})</span>
                </Link>
            </CardTitle>

            <div className="small-text d-flex justify">
                <p className="mr-2 mr-md-5 my-1 text-dark">{date.toDateString()}</p>
                <p className="mr-2 mr-md-5 my-1 text-dark">-{category && category.title}
                    <small>&nbsp;({created_by && created_by.name})</small>
                </p>
            </div>

            <CardText className="mt-1 details text-secondary text-capitalize">{description && description}</CardText>
        </Card>
    )
}
export default PostItem
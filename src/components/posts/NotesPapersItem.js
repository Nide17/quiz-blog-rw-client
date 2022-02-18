import React from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";

const NotesPapersItem = ({ note, fromSearch }) => {

    const { _id, title, description, courseCategory, course, chapter, createdAt } = note

    let date = new Date(createdAt);

    return (
        <Card body className={fromSearch ? 'bg-info text-white py-3 px-1 px-lg-3 my-2 my-lg-3' : 'bg-transparent py-3 px-1 px-lg-3 my-2 my-lg-3'}>

            <CardTitle tag="h4" className={`mb-0 ${fromSearch ? 'text-white' : 'text-primary'} text-capitalize`}>
                <Link to={`/view-note-paper/${_id}`}>{title && title}
                </Link>
            </CardTitle>

            <div className="small-text d-flex justify">
                <p className="mr-2 mr-md-5 my-1 text-dark">{date.toDateString()}</p>
                <p className="mr-2 mr-md-5 my-1 text-dark">{courseCategory && courseCategory.title}</p>
                <p className="mr-2 mr-md-5 my-1 text-dark">- {course && course.title}
                    <small>&nbsp;({chapter && chapter.title})</small>
                </p>
            </div>

            <CardText className="mt-1 details text-secondary text-capitalize">{description && description}</CardText>
        </Card>
    )
}

export default NotesPapersItem
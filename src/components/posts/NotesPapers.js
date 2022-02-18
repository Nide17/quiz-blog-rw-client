import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'reactstrap';
import ReactLoading from "react-loading";
// import SearchInput from '../SearchInput'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLandingDisplayNotes, getLandingDisplayNotesNoLimit } from '../../redux/notes/notes.actions'

// import ResponsiveAd from '../adsenses/ResponsiveAd';

// import SquareAd from '../adsenses/SquareAd';
import NotesPapersItem from './NotesPapersItem';

const NotesPapers = ({ getLandingDisplayNotes, getLandingDisplayNotesNoLimit, lDLimitedNotes, lDLimitedNotesLoading }) => {

    // const [searchKey, setSearchKey] = useState('')
    const [limit] = useState(10)

    // Lifecycle methods
    useEffect(() => {
        getLandingDisplayNotes(limit)
        // getLandingDisplayNotesNoLimit()
    }, [getLandingDisplayNotes, getLandingDisplayNotesNoLimit, limit])

    return (

        <Row className="mt-1 mx-0 px-2 px-lg-5 notes-paper">

            <Col sm="12" className="px-1 px-lg-4 mt-md-2">
                {/* Google responsive 1 ad */}
                {/* <ResponsiveAd /> */}
            </Col>

            {/* <Col sm="8" className="px-1 px-lg-4 mt-md-2"> */}
            <Col sm="12" className="px-1 px-lg-5 mt-md-2 mx-lg-5">
                <h3 className="mt-0 mt-lg-3 pt-4 py-lg-3 text-danger text-center font-weight-bold">Newest Notes & Past Papers</h3>

                {lDLimitedNotesLoading ?
                    <div className="p-5 m-5 d-flex justify-content-center align-items-center">
                        <ReactLoading type="spokes" color="#33FFFC" />
                    </div> :
                    <>

                        {/* Search input*/}
                        {/* {
                            lDNotesNoLimitLoading ?
                                <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                    <ReactLoading type="bubbles" color="#33FFFC" /> </div> :
                                <SearchInput setSearchKey={setSearchKey} placeholder=" Search notes here ...  " />
                        } */}

                        {/* {searchKey === "" ? null :

                            lDNotesNoLimit && lDNotesNoLimit
                                .map(note => (

                                    note.title.toLowerCase().includes(searchKey.toLowerCase()) ?
                                        <NotesPapersItem key={note._id} note={note} fromSearch={true} /> : null
                                ))} */}


                        {lDLimitedNotes && lDLimitedNotes
                            .map(note => (
                                <NotesPapersItem key={note._id} note={note} />
                            ))}


                        {/* Newest 10 notes */}
                        {lDLimitedNotes.length > 0 ?

                            <div className="my-4 d-flex justify-content-center">
                                <Link to="/course-notes">
                                    <Button outline color="info">View all notes ...</Button>
                                </Link>
                            </div> :
                            null}
                    </>
                }
            </Col>

            {/* <Col sm="4">
                <Row className="mb-5">
                </Row> */}
            {/* Google square ad */}
            {/* <SquareAd/> */}
            {/* </Col> */}

        </Row>
    )
}

const mapStateToProps = state => ({
    lDLimitedNotes: state.notesReducer.allLandingDisplayNotesLimited,
    lDLimitedNotesLoading: state.notesReducer.isLandingDisplayNotesLimitedLoading,
    // lDNotesNoLimit: state.notesReducer.allLandingDisplayNotesNoLimit,
    // lDNotesNoLimitLoading: state.notesReducer.allLandingDisplayNotesNoLimitLoading
})

export default connect(mapStateToProps, { getLandingDisplayNotes, getLandingDisplayNotesNoLimit })(NotesPapers)
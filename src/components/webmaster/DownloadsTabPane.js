import React, { useState, useEffect } from 'react'
import { Row, TabPane, Table, Button } from 'reactstrap';
import ReactLoading from "react-loading";
import { getDownloads, deleteDownload } from '../../redux/downloads/downloads.actions'
import { connect } from 'react-redux'
import trash from '../../images/trash.svg';
import Pagination from './Pagination';

const DownloadsTabPane = ({ downloads, getDownloads, deleteDownload }) => {

    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const downloadsToUse = downloads && downloads.allDownloads

    useEffect(() => {
        getDownloads(pageNo)
        setNumberOfPages(downloadsToUse.totalPages);
    }, [getDownloads, pageNo, downloads.totalPages])

    return (
        <TabPane tabId="7">

            {downloads.isLoading ?
                <ReactLoading type="spinningBubbles" color="#33FFFC" /> :

                <>
                    <p className="text-right my-2">
                        Page <strong>{pageNo}</strong> of <strong>{numberOfPages}</strong>
                    </p>
                <Row>
                    <Table size="sm" className="all-scores" hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>User</th>
                                <th>File</th>
                                <th>Chapter</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {downloadsToUse && downloadsToUse.downloads.map((download, index) =>

                                <tr key={download._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{download.createdAt.split('T').slice(0, 1)}</td>
                                    <td>{download.downloaded_by && download.downloaded_by.name}</td>
                                    <td>{download.notes && download.notes.title}</td>
                                    <td>{download.chapter && download.chapter.title}</td>
                                    <td>{download.course && download.course.title}</td>
                                    <td>
                                        <Button size="sm" color="link" className="mt-0 p-0" onClick={() => deleteDownload(download._id)}>
                                            <img src={trash} alt="" width="16" height="16" />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                        <Pagination pageNo={pageNo} setPageNo={setPageNo} numberOfPages={numberOfPages} />
                </Row>
                </>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    downloads: state.downloadsReducer,
})

export default connect(mapStateToProps, { getDownloads, deleteDownload })(DownloadsTabPane)
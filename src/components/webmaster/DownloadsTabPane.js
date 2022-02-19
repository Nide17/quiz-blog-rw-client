import React, { useState, useEffect } from 'react'
import { Row, TabPane, Table, Button } from 'reactstrap';
import ReactLoading from "react-loading";
import { getDownloads, deleteDownload } from '../../redux/downloads/downloads.actions'
import { connect } from 'react-redux'
import trash from '../../images/trash.svg';
import Pagination from './Pagination';
import PageOf from './PageOf';

const DownloadsTabPane = ({ downloads, getDownloads, deleteDownload }) => {

    const [pageNo, setPageNo] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(0);
    const downloadsToUse = downloads && downloads.allDownloads

    useEffect(() => {
        getDownloads(pageNo)
        setNumberOfPages(downloadsToUse.totalPages);
    }, [getDownloads, pageNo, downloadsToUse.totalPages])

    return (
        <TabPane tabId="7">

            {downloads.isLoading ?
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
                                <th scope="col">User</th>
                                <th scope="col">File</th>
                                <th scope="col">Chapter</th>
                                <th scope="col">Course</th>
                                <th scope="col">❌</th>
                            </tr>
                        </thead>

                        <tbody>
                            {downloadsToUse && downloadsToUse.downloads.map((download, index) =>

                                <tr key={download._id}>
                                    <th scope="row" className="table-dark">{index + 1}</th>
                                    <td>{download.createdAt.split('T').slice(0, 1)}</td>
                                    <td className='text-uppercase'>
                                        {download.downloaded_by && download.downloaded_by.name}
                                    </td>
                                    <td>{download.notes && download.notes.title}</td>
                                    <td>{download.chapter && download.chapter.title}</td>
                                    <td>{download.course && download.course.title}</td>
                                    <td className="table-dark">
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
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    downloads: state.downloadsReducer,
})

export default connect(mapStateToProps, { getDownloads, deleteDownload })(DownloadsTabPane)
import React, { useEffect } from 'react'
import { Row, TabPane, Table, Button, Alert } from 'reactstrap';
import ReactLoading from "react-loading";
import { getCreatorDownloads, deleteDownload } from '../../redux/downloads/downloads.actions'
import { connect } from 'react-redux'
import trash from '../../images/trash.svg';

const DownloadsTabPaneCreator = ({ auth, downloads, getCreatorDownloads, deleteDownload }) => {

    const uId = auth && auth.user._id

    useEffect(() => {
        getCreatorDownloads(uId)
    }, [getCreatorDownloads, uId])

    const cDownloads = downloads && downloads.creatorDownloads

    return (
        <TabPane tabId="7">

            {downloads.isLoading ?
                <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                    <ReactLoading type="spinningBubbles" color="#33FFFC" />
                </div> :
                <Row>

                    {cDownloads && cDownloads.length > 0 ?
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
                                {cDownloads && cDownloads.map((download, index) =>

                                    <tr key={index}>
                                        <th scope="row" className="table-dark">{index + 1}</th>
                                        <td>{download && download.updatedAt.split('T').slice(0, 1)}</td>
                                        <td className='text-uppercase'>
                                            {download && download.users_downloads_name}
                                        </td>
                                        <td>{download && download.notes_downloads_title}</td>
                                        <td>{download && download.chapters_downloads_title}</td>
                                        <td>{download && download.courses_downloads_title}</td>
                                        <td className="table-dark">
                                            <Button size="sm" color="link" className="mt-0 p-0" onClick={() => deleteDownload(download._id)}>
                                                <img src={trash} alt="" width="16" height="16" />
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table> :
                        <Alert color="danger" className="w-100 text-center">
                            No downloads for your notes yet!
                        </Alert>}
                </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    downloads: state.downloadsReducer,
})

export default connect(mapStateToProps, { getCreatorDownloads, deleteDownload })(DownloadsTabPaneCreator)
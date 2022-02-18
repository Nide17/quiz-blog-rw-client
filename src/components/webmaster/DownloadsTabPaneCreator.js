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
                <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                <Row>

                    {cDownloads && cDownloads.length > 0 ?
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
                                {cDownloads && cDownloads.map((download, index) =>

                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{download && download.updatedAt.split('T').slice(0, 1)}</td>
                                        <td>{download && download.users_downloads_name}</td>
                                        <td>{download && download.notes_downloads_title}</td>
                                        <td>{download && download.chapters_downloads_title}</td>
                                        <td>{download && download.courses_downloads_title}</td>
                                        <td>
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
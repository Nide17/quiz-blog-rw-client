import React, { useState } from 'react'
import ReactLoading from "react-loading";
import { Row, Col, Button, TabContent, Nav, NavItem, NavLink, Alert } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CreateCategory from '../categories/CreateCategory';
import CategoriesTabPane from '../categories/CategoriesTabPane';
import QuizesTabPane from '../quizes/QuizesTabPane';
import SubscribersTabPane from './SubscribersTabPane';
import UsersTabPane from '../users/UsersTabPane';
import Reports from './Reports';
import LoginModal from '../auth/LoginModal'
import ContactsTabPane from '../contacts/ContactsTabPane';
import ScoresTabPane from './ScoresTabPane';
import ScoresTabPaneCreator from './ScoresTabPaneCreator';
import DownloadsTabPaneCreator from './DownloadsTabPaneCreator';
import DownloadsTabPane from './DownloadsTabPane';
import BroadcastModal from './BroadcastModal'
import dashimg from '../../images/dashboard.svg';

const Webmaster = ({ auth, categories }) => {
    // State
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // render
    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?
                <>
                    <Row className="m-lg-4 px-lg-5 d-flex justify-content-between align-items-center text-primary">

                        <div className="dashboard-img">
                            <img src={dashimg} alt="dashimg" />
                        </div>
                        <div className='text-center'>
                            <Alert className='border border-warning'>
                                <h4 className="alert-heading">
                                    <strong>{auth.user && auth.user.name}</strong>
                                </h4>
                                <p>
                                    <strong>Welcome to the {auth.user && auth.user.role} dashboard page</strong>
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Here you can add, edit and remove features, cheers!!
                                </p>
                            </Alert>
                        </div>

                        <div className="master-btns">

                            {auth.user.role === 'Admin' ?
                                <Button size="sm" outline color="secondary">
                                    <BroadcastModal auth={auth} />
                                </Button> :
                                null}

                            &nbsp;

                            {auth.user.role === 'Admin' || auth.user.role === 'Creator' ?
                                <Button size="sm" outline color="secondary">
                                    <CreateCategory auth={auth} />
                                </Button> :
                                null}
                        </div>

                    </Row>

                    <Row className="m-lg-5">
                        <Col sm="12" className="px-0 d-flex justify-content-around">

                            <Nav tabs className="webmaster-navbar d-block d-sm-flex mb-0 mb-lg-5 p-2 border rounded border-success bg-light text-uppercase font-weight-bolder">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}>
                                        <u>Categories</u>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}>
                                        <u>Quizes</u>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '6' })}
                                        onClick={() => { toggle('6'); }}>
                                        <u>All scores</u>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '7' })}
                                        onClick={() => { toggle('7'); }}>
                                        <u>Downloads</u>
                                    </NavLink>
                                </NavItem>

                                {
                                    auth.user.role === 'Admin' ?
                                        <>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '3' })}
                                                    onClick={() => { toggle('3'); }}>
                                                    <u>Subscribers</u>
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '4' })}
                                                    onClick={() => { toggle('4'); }}>
                                                    <u>Users</u>
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '5' })}
                                                    onClick={() => { toggle('5'); }}>
                                                    <u>Contacts</u>
                                                </NavLink>
                                            </NavItem>
                                        </> : null
                                }

                            </Nav>
                        </Col>

                        <Col sm="12" className="px-0">
                            <TabContent activeTab={activeTab}>
                                <CategoriesTabPane auth={auth} categories={categories} />
                                <QuizesTabPane auth={auth} categories={categories} />

                                {auth.user.role === 'Admin' ?
                                    <>
                                        <ScoresTabPane auth={auth} />
                                        <DownloadsTabPane auth={auth} />
                                    </> :
                                    <>
                                        <ScoresTabPaneCreator auth={auth} />
                                        <DownloadsTabPaneCreator auth={auth} />
                                    </>
                                }
                                <SubscribersTabPane />
                                <UsersTabPane auth={auth} />
                                <ContactsTabPane auth={auth} />
                            </TabContent>
                        </Col>

                    </Row>
                </> :
                <Reports auth={auth} /> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal isAuthenticated={auth.isAuthenticated} />
                }
            </div>
    )
}

Webmaster.propTypes = {
    auth: PropTypes.object
}

export default Webmaster
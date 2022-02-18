import React, { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner, Toast, ToastHeader } from 'reactstrap';

// REDUX
import { connect } from 'react-redux'
import store from './redux/store'
import { setCategories } from './redux/categories/categories.actions'
import { loadUser } from './redux/auth/auth.actions'

// components
import Header from './components/Header';
import Contact from './components/Contact';
import About from './components/About';
import Footer from './components/footer/Footer';

// auth
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Unsubscribe from './components/auth/Unsubscribe';
import EditProfile from './components/auth/EditProfile';

// others
import Privacy from './components/others/Privacy';
import Disclaimer from './components/others/Disclaimer';
import Placeholder from './components/others/Placeholder';

// categories
import SingleCategory from './components/categories/SingleCategory';
import AllCategories from './components/categories/AllCategories';

// quizes
import CountDown from './components/quizes/CountDown';
import QuizQuestions from './components/quizes/QuizQuestions';
import GetReady from './components/quizes/GetReady';
import ReviewQuiz from './components/quizes/ReviewQuiz';
import QuizRanking from './components/quizes/QuizRanking';
import SelectChallengee from './components/quizes/SelectChallengee';

// questions
import CreateQuestions from './components/questions/CreateQuestions';
import SingleQuestion from './components/questions/SingleQuestion';
import EditQuestion from './components/questions/EditQuestion';

// webmaster
import ReportsAdmin from './components/webmaster/ReportsAdmin';

// courseNotes
import Index from './components/courseNotes/Index';
import ViewCourse from './components/courseNotes/ViewCourse';

// Schools
import SchoolsLanding from './components/schools/SchoolsLanding'

// lazy loading posts
const Webmaster = lazy(() => import('./components/webmaster/Webmaster'));
const Posts = lazy(() => import('./components/posts/Posts'));
const AllPosts = lazy(() => import('./components/posts/AllPosts'));
const ViewNotePaper = lazy(() => import('./components/posts/ViewNotePaper'));


const App = ({ auth, categories, setCategories }) => {

    useEffect(() => {
        store.dispatch(loadUser())
        setCategories()
    }, [setCategories]);

    const NonEmptyFields = auth.isAuthenticated && Object
        .keys(auth.user)
        .filter(x => auth.user[x].length !== 0 || auth.user[x] !== '')
        .length

    const percentage = (NonEmptyFields - 3) * 10

    // const initial = successful.id ? true : errors.id ? true : false
    const initial = (auth.isAuthenticated && percentage < 100) ? true : false

    //properties of the modal
    const [modal, setModal] = useState(initial)
    useEffect(() => { setModal(initial) }, [initial])

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    return (
        <Router>

            <Toast isOpen={modal} className={`mw-100 popup-toast`}>
                <ToastHeader toggle={toggle} className="bg-warning" icon="danger">
                    <p className='text-dark text-center font-weight-bolder d-block mb-0'>
                        Your profile is {`${percentage && percentage}`} % up to date!
                        &nbsp;&nbsp;&nbsp;
                        <Link to={`/edit-profile/${auth.user && auth.user._id}`}>
                            <strong className='text-underline text-danger bg-dark'>Consider updating ...</strong>
                        </Link>
                    </p>
                </ToastHeader>
            </Toast>

            {/* <Toast isOpen={modal} className={`mw-100 popup-toast`}>
                <ToastHeader toggle={toggle} className={`${successful.id ? 'bg-dark' : 'bg-danger'}`}>
                    {successful.id ?
                        <p className='text-white text-center d-block mb-0'>
                            {successful.msg}
                        </p> :
                        errors.id ?
                            <p className='text-white text-center d-block mb-0'>
                                {errors.status === 500 ? 'Something went wrong please refresh ...' : errors.msg}
                            </p> : ''}
                </ToastHeader>
            </Toast> */}

            <Header auth={auth} />

            <Switch>

                <Route path="/about" component={About} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/disclaimer" component={Disclaimer} />
                <Route exact path="/unsubscribe" render={() => <Unsubscribe auth={auth} />} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" render={() => <ResetPassword auth={auth} />} />

                <Route exact path="/countdown" component={CountDown} />
                <Route exact path="/category/:categoryId" render={() => <SingleCategory auth={auth} categories={categories} />} />
                <Route exact path="/edit-profile/:userId" render={() => <EditProfile auth={auth} />} />
                <Route exact path="/view-quiz/:quizId" render={() => <GetReady />} />
                <Route exact path="/attempt-quiz/:readyQuizId" render={() => <QuizQuestions auth={auth} />} />

                <Route exact path="/view-question/:questionId" render={() => <SingleQuestion auth={auth} />} />
                <Route exact path="/edit-question/:questionId" render={() => <EditQuestion auth={auth} categories={categories} />} />

                <Route exact path="/review-quiz/:reviewId" render={() => <ReviewQuiz auth={auth} />} />
                <Route exact path="/reports-admin" render={() => <ReportsAdmin auth={auth} />} />
                <Route exact path="/quiz-ranking/:quizId" render={() => <QuizRanking auth={auth} />} />
                <Route exact path="/questions-create/:quizId" render={() => <CreateQuestions auth={auth} categories={categories} />} />
                <Route exact path="/challenge/:quizId/:userId/" render={() => <SelectChallengee auth={auth} />} />

                <Route path="/contact" component={Contact} />
                <Route path="/all-categories" render={() => <AllCategories categories={categories} />} />
                <Route path="/course-notes" render={() => <Index auth={auth} />} />
                <Route exact path="/view-course/:courseId" render={() => <ViewCourse auth={auth} />} />
                <Route exact path="/view-note-paper/:notePaperId" render={() => <ViewNotePaper auth={auth} />} />

                <Route exact path="/schools" render={() => <SchoolsLanding auth={auth} />} />

                {/* <Route path="/ads.txt">
                    google.com, pub-8918850949540829, DIRECT, f08c47fec0942fa0
                </Route> */}

                <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                    <Spinner style={{ width: '10rem', height: '10rem' }} />
                </div>}>
                    <Route exact path="/"><Posts categories={categories} /></Route>
                    <Route exact path="/allposts"><AllPosts /></Route>
                    <Route exact path="/webmaster"><Webmaster auth={auth} categories={categories} /></Route>
                </Suspense>

                <Route path="*">
                    <Placeholder />
                </Route>

            </Switch>
            <Footer />
        </Router>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    categories: state.categoriesReducer,
    errors: state.errorReducer,
    successful: state.successReducer
})

export default connect(mapStateToProps, { setCategories })(App);
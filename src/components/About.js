import React from 'react'
import { Jumbotron, Button } from 'reactstrap';
// import ResponsiveAd from './adsenses/ResponsiveAd';
// import ResponsiveAd from '../adsenses/ResponsiveAd';

import bruce from '../images/Bruceimg.png'
import parmenide from '../images/Parmenideimg.png'
import instagram from '../../src/images/instagram.svg';
import linkedin from '../../src/images/linkedin.svg';
import facebook from '../../src/images/facebook.svg';
import whatsapp from '../../src/images/whatsapp.svg';

const About = () => {
    return (
        <section className="about-section py-0 py-lg-4">

            <div className="container about-container">

                <Jumbotron className="py-0 text-center">
                    <h1 className="display-5 font-weight-bold">Quiz-Blog</h1>
                    <p className="lead">
                        Quiz Blog is a web application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.
                    </p>

                    <p>Reach us on <strong>
                        <a href="mailto:quizblog.rw@gmail.com?subject=Contact%20Quiz%20Blog">quizblog.rw@gmail.com</a>
                    </strong> for further details.</p>
                    <hr className="my-2" style={{ height: "2px", borderWidth: 0, color: "#157A6E", backgroundColor: "#157A6E" }} />
                </Jumbotron>

                {/* Google responsive 1 ad */}
                {/* <ResponsiveAd /> */}

                <div className="row my-4">

                    <div className="col-12 col-sm-4 d-flex flex-column align-items-center justify-content-center">

                        <div className="memberImg">
                            <img className="w-100 mt-2 mt-lg-0" src={bruce && bruce} alt="quiz" />
                        </div>

                        <div className="social w-100 d-flex justify-content-around mx-0 px-md-3 py-md-3">

                            <strong>
                                <img src={whatsapp} alt="0780579067" width="20" height="20" />&nbsp;&nbsp;<span style={{ verticalAlign: "sub" }}>0780579067</span>
                            </strong>

                            <Button size="sm" color="link">
                                <a href="https://www.linkedin.com/in/ndatimana-patrice-bruce-20b363195">
                                    <img src={linkedin} alt="ndatimana-patrice-bruce" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link">
                                <a href="https://www.instagram.com/dr.active4">
                                    <img src={instagram} alt="dr.active4" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link">
                                <a href="https://www.facebook.com/ndatimana.bruce">
                                    <img src={facebook} alt="ndatimana.bruce" width="20" height="20" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="col-12 col-sm-8">
                        <h2 className="text-center py-3 font-weight-bolder w-100">Ndatimana Patrice Bruce</h2>
                        <h5 className="font-weight-bolder">Owner and Idea Innovator</h5>
                        <div className="profile-desc mt-lg-4">
                            <small>NDATIMANA Patrice Bruce is a passionate student nurse who is happy to help others. He is a hard worker, initiative, self-motivated, highly adaptable, persistent person, able to complete assigned tasks within the deadline, and capable of working under any challenging situation. He is an ICT enthusiast and he is currently an undergraduate student at the University of Rwanda, College of Medicine and Health Sciences at Rwamagana campus where he is doing a Bachelor with Honors in Nursing. He worked at NAEB/PRICE as Data Entry Officer in 2019, and he is interested in data management and data entry of various types.</small>
                        </div>
                    </div>

                </div>

                <div className="row my-4">

                    <div className="col-12 col-sm-4 d-flex flex-column align-items-center justify-content-center">

                        <div className="memberImg">
                            <img className="w-100 mt-2 mt-lg-0" src={parmenide && parmenide} alt="quiz" />
                        </div>

                        <div className="social w-100 d-flex justify-content-around mx-0 px-md-3 py-md-3">
                            <strong>
                                <img src={whatsapp} alt="0788551997" width="20" height="20" />&nbsp;&nbsp;<span style={{ verticalAlign: "sub" }}>0788551997</span>
                            </strong>

                            <Button size="sm" color="link" className="ml-0 pl-0 mr-2">
                                <a href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/">
                                    <img src={linkedin} alt="niyomwungeri-parmenide-ishimwe-1a5394123" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.instagram.com/ishimwe_parmenide/">
                                    <img src={instagram} alt="ishimwe_parmenide" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.facebook.com/nide.drogba.7/">
                                    <img src={facebook} alt="nide.drogba.7" width="20" height="20" />
                                </a>
                            </Button>
                        </div>

                    </div>

                    <div className="col-12 col-sm-8">
                        <h2 className="text-center py-3 font-weight-bolder w-100">Niyomwungeri Parmenide Ishimwe</h2>
                        <h5 className="font-weight-bolder">Application Developer</h5>
                        <div className="profile-desc mt-lg-4">
                            <small>ISHIMWE Niyomwungeri Parmenide is a well-disciplined engineer who believes passionately in new computing technologies. He is an ICT enthusiast and passionate about solving the problem using ICT knowledge and skills. He puts great effort to learn and discover new skills and latest technologies and hence developing them to achieve newer experiences. He is comfortable working on small and big projects personally and with teams and usually striving for customer satisfaction. He holds a Bachelor's degree with honors in Computer Science from the University of Rwanda. He is an experienced full- stack web developer, as he worked on various designs and development software projects.</small>
                        </div>
                    </div>

                </div>
                {/* Google square ad */}
                {/* <SquareAd/> */}
            </div>
        </section>)
}

export default About
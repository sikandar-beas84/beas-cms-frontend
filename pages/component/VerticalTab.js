import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

const VerticalTabs = () => {
    return (
        <div className="tab-option">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col xs={5} lg={5}>
                        <Nav className="flex-column tab-option-txt">
                            <ul>
                                <li>
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">
                                            <span className="big-txt">Application Solution</span>
                                            <span className="small-txt">Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </li>
                                <li>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            <span className="big-txt">AI/ML/DML</span>
                                            <span className="small-txt">Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </li>
                                <li>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">
                                            <span className="big-txt">Cloud Computing</span>
                                            <span className="small-txt">Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </li>
                                <li>
                                    <Nav.Item>
                                        <Nav.Link eventKey="fourth">
                                            <span className="big-txt">Cyber Security</span>
                                            <span className="small-txt">Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.Mauris porttitor ante ut cursus proin purus, semper et risus at dignissi.</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </li>
                            </ul>
                        </Nav>
                    </Col>
                    <Col xs={7} lg={7}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                
                                <div className="aboutImg">
                                    <img src="/assets/images/services-bg.png" alt="image" className="img-fluid"/>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {/* <div className="aboutImg">
                                    <img src="/assets/images/choose-us.png" alt="image" className="img-fluid" />
                                </div> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                {/* <div className="aboutImg">
                                    <img src="/assets/images/choose-us.png" alt="image" className="img-fluid" />
                                </div> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                {/* <div className="aboutImg">
                                    <img src="/assets/images/choose-us.png" alt="image" className="img-fluid" />
                                </div> */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default VerticalTabs;

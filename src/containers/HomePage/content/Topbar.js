import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { history } from '../../../redux'
import {
    Navbar,
    Button,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import {languages} from "../../../utils";
import {connect} from "react-redux";
import {changeLanguageApp} from "../../../store/actions";
import '../HomePage.scss'

const Topbar = ({ toggleSidebar, changeLanguageApp, languageRedux }) => {
    const [topbarIsOpen, setTopbarOpen] = useState(true);
    const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
    function changeLanguage(language) {
        // fire redux event: actions
        changeLanguageApp(language)
    }

    return (
        <Navbar
            color="light"
            light
            className="navbar p-3 bg-white"
            style={{position: 'sticky', top:'0',zIndex: '999', boxShadow: 'rgb(0 0 0 / 6%) 0px 25px 20px -20px'}}
            expand="md"
        >
            <Button color="warning" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faAlignJustify} />
            </Button>
            <NavbarToggler onClick={toggleTopbar} />
            <Collapse isOpen={topbarIsOpen} navbar>
                <div className="logo-header" onClick={() => history.push('/home')} >
                    <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt=""/>
                </div>
                <Nav className="ml-auto w-100 justify-content-center" navbar>
                    <NavItem>
                        <NavLink className="nav-link-header" tag={Link} to={"/page-1"}>
                            Chuyên khoa
                        </NavLink>
                        <span className="sub-header">Tìm bác sĩ theo chuyên khoa</span>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link-header" tag={Link} to={"/page-2"}>
                            Cơ sở y tế
                        </NavLink>
                        <span className="sub-header"> Chọn bệnh viện và phòng khám</span>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link-header" tag={Link} to={"/page-3"}>
                            Bác sĩ
                        </NavLink>
                        <span className="sub-header">Chọn bác sĩ giỏi</span>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link-header" tag={Link} to={"/page-4"}>
                            Gói khám
                        </NavLink>
                        <span className="sub-header">Khám sức khỏe tổng quát</span>
                    </NavItem>
                </Nav>
            </Collapse>
            <div className="language">
                <span className={languageRedux === languages.VI ? 'vi active' : 'vi'}><span onClick={() => changeLanguage(languages.VI)}>VI</span></span>
                <span className={languageRedux === languages.EN ? 'en active' : 'en'}><span onClick={() => changeLanguage(languages.EN)}>EN</span></span>
            </div>
        </Navbar>
    );
};
const mapStateToProps = state => {
    return {
        languageRedux: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);

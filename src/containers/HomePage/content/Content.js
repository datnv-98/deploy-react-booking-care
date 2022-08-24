import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Topbar from "./Topbar";
import {faHospital, faMicrophone, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FormattedMessage } from 'react-intl';
import Specialty from "../section/Specialty";
import MedicalFacillity from "../section/MedicalFacillity";
import OutStandingDoctor from "../section/OutStandingDoctor";
import HandBook from "../section/HandBook";
import About from "../section/About";
import HomeFooter from "../HomeFooter";
import './Content.scss'


const Content = ({ sidebarIsOpen, toggleSidebar }) => {
    const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
};
    return (
    <Container
        fluid
        className={classNames("p-0", { "is-open": sidebarIsOpen })}
    >
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="main-content">
            <div className="main-content-center">
                <h1 className='main-title'>
                    Nền tảng y tế <br/>
                    <b><FormattedMessage id={"home-header.all"}/></b>
                </h1>
                <div className="tim-kiem">
                    <div className="timkiem-onhap">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="search" placeholder="Tìm chuyên khoa khám bệnh ..."/>
                    </div>
                </div>
                <div className="main-option">
                    <div className="main-option-div">
                        <div className = "border-icon">
                            <div className="dichvu chuyen_khoa"/>
                        </div>
                        <p>Khám <br/> chuyên khoa</p>
                    </div>
                    <div className="main-option-div">
                        <div className ="border-icon">
                            <div className="dichvu tong_quat"/>
                        </div>
                        <p>Khám <br/> tổng quát</p>
                    </div>
                    <div className="main-option-div">
                        <div className ="border-icon">
                            <div className="dichvu xet_nghiem"/>
                        </div>
                        <p>Xét nghiệm <br/> Y học</p>
                    </div>
                    <div className="main-option-div">
                        <div className ="border-icon">
                            <div className="dichvu suc_khoe"/>
                        </div>
                        <p>Sức khỏe <br/> tinh thần</p>
                    </div>
                    <div className="main-option-div">
                        <div className ="border-icon">
                            <div className="dichvu nha_khoa"/>
                        </div>
                        <p>Khám <br/> nha khoa</p>
                    </div>
                    <div className="main-option-div">
                        <div className ="border-icon">
                            <div className="dichvu phau_thuat"/>
                        </div>
                        <p>Gói <br/> phẫu thuật</p>
                    </div>
                    <div className="main-option-div">
                        <div className ="border-icon">
                            <div className="dichvu san_pham_y_te"/>
                        </div>
                        <p>Sản phẩm <br/> y tế</p>
                    </div>
                </div>
            </div>
            <div >
                <Specialty settings = {settings} />
                <MedicalFacillity settings = {settings} />
                <OutStandingDoctor settings = {settings} />
                <HandBook settings = {settings} />
                <About />
                <HomeFooter />
            </div>

        </div>
    </Container>

)};

export default Content;

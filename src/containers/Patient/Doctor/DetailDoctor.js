import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useParams} from "react-router";
import Topbar from "../../HomePage/content/Topbar";
import './DetailDoctor.scss'
import * as actions from "../../../store/actions";
import {languages} from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import SideBar from "../../HomePage/sidebar/Sidebar";

const DetailDoctor = ({getDetailDoctorsId, infoDoctor, lang, fetchAllScheduleTime}) => {
    const [sidebarIsOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    const { id } = useParams();
    useEffect(() => {
        getDetailDoctorsId(id);
    },[])

    console.log('infoDoctor', infoDoctor)

    let nameVi = '';
    let nameEn = '';
    if(infoDoctor && infoDoctor.positionData) {
        nameVi = `${infoDoctor.positionData.valueVi}, ${infoDoctor.firstName} ${infoDoctor.lastName}`
        nameEn = `${infoDoctor.positionData.valueEn}, ${infoDoctor.lastName} ${infoDoctor.firstName}`
    }
    return (
        <div style={{height: '100vh', overflow: 'auto'}}>
            <Topbar toggleSidebar={toggleSidebar} />
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor d-flex">
                        <div className="content-left">
                            <img src={infoDoctor && infoDoctor.image ? infoDoctor.image : ''} alt=""/>
                        </div>
                        <div className="content-right">
                            <strong>{lang === languages.VI ? nameVi: nameEn}</strong>
                            <div>
                                {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.description &&
                                <span>
                                    {infoDoctor.Markdown.description}
                                </span>}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor-home">
                        <div className="content-left">
                            <DoctorSchedule doctorId ={id}/>
                        </div>
                        <div className="content-right">
                           <DoctorExtraInfo
                               doctorId={id}
                           />
                        </div>
                    </div>
                    <div className="detail-info-doctor">
                        {infoDoctor&& infoDoctor.Markdown  && infoDoctor.Markdown.contentHTML
                        && <div dangerouslySetInnerHTML={{__html: infoDoctor.Markdown.contentHTML}}/>
                        }
                    </div>
                    <div className="comment-doctor"></div>
                </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        infoDoctor: state.admin.infoDoctor,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorsId: (id) => dispatch(actions.getDetailDoctorsId(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

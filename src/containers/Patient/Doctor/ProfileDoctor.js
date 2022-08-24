import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useParams} from "react-router";
import './DetailDoctor.scss'
import * as actions from "../../../store/actions";
import {languages} from "../../../utils";
import {getProfileDoctorById} from "../../../services/userService";
import './ProfileDoctor.scss'
import * as PropTypes from "prop-types";
import moment from "moment";
import {history} from "../../../redux";

const ProfileDoctor = ({lang,isShowMore, isShowDescription, dataTime, isShowDateTime, doctor_id}) => {

    const [infoDoctor, setInfoDoctor] = useState({})
    useEffect(async () => {
        let response = await getProfileDoctorById(doctor_id)
        setInfoDoctor(response.data)
    },[doctor_id])
    let nameVi = '';
    let nameEn = ''
    if(infoDoctor && infoDoctor.positionData) {
        nameVi = `${infoDoctor.positionData.valueVi} : ${infoDoctor.firstName} ${infoDoctor.lastName}`
        nameEn = `${infoDoctor.positionData.valueEn} : ${infoDoctor.lastName} ${infoDoctor.firstName}`
    }
    // console.log('infoDoctor', infoDoctor)
    // console.log('dataTime', dataTime)
    return (
        <div className="booking-doctor-container">
            <div className="intro-doctor d-flex">
                <div className="content-left">
                    <img src={infoDoctor && infoDoctor.image ? infoDoctor.image : ''} alt=""/>
                </div>
                <div className="content-right">
                    <strong>{lang === languages.VI ? nameVi: nameEn}</strong>
                    {isShowDescription &&
                        <div>
                            {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.description &&
                            <span>
                                    {infoDoctor.Markdown.description}
                                </span>}
                        </div>
                    }
                    {isShowDateTime &&
                        <div className='font-weight-bold'>Thời gian:
                            {lang === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn}
                            , Ngày { moment.unix( + dataTime.date /1000).format("dddd - DD/MM/YYYY")}
                        </div>
                    }
                </div>
            </div>
            {isShowMore === false && <div onClick={() => history.push(`/details-doctor/${doctor_id}`)} className='show-more'>Xem thêm</div>}
        </div>
    );
}

ProfileDoctor.propTypes = {
    isShowDescription: PropTypes.bool,
    dataTime: PropTypes.object,
    isShowDateTime: PropTypes.bool,
    doctor_id: PropTypes.string,
    isShowMore: PropTypes.bool,
}

const mapStateToProps = state => {
    return {
        infoDoctor: state.admin.infoDoctor,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

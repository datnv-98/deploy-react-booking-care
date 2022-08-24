import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import * as actions from "../../../store/actions";
import {CommonUtils, languages} from "../../../utils";
import './DoctorExtraInfo.scss'
import {getExtraInfoDoctorById} from "../../../services/userService";
import {emitter} from "../../../utils/emitter";

const DoctorExtraInfo = ({lang,doctorId}) => {
   const [showDetail, setShowDetail] = useState(false)
    const [infoDoctor, setInfoDoctor] = useState()
    let formatVND = '';
    let formatDollar = ''
    if(infoDoctor && infoDoctor.priceTypeData) {
        formatVND = CommonUtils.formatVND(infoDoctor.priceTypeData.valueVi)
        formatDollar = CommonUtils.formatDollar(infoDoctor.priceTypeData.valueEn)
    }

    useEffect(async ()=> {
       let response = await getExtraInfoDoctorById(parseInt(doctorId) )
        setInfoDoctor(response.data)
    },[])
    useEffect(()=> {
        emitter.emit('EVENT_GET_FORMAT_PRICE', lang === languages.VI ? formatVND :formatDollar)
    })
    const handleToggleDetail = () => {
        setShowDetail(!showDetail)
    }

    return (
        <div className="doctor-schedule-container">
            <p>
                <strong>ĐỊA CHỈ KHÁM</strong>
            </p>
            <strong>{infoDoctor && infoDoctor.nameClinic}</strong>
            <p>{infoDoctor && infoDoctor.addressClinic}</p>
            <hr/>
            <strong>GIÁ KHÁM:</strong> {lang === languages.VI ? formatVND : formatDollar}, &nbsp;
            <span className="toggle-view-detail " onClick={handleToggleDetail}>{showDetail ? 'Ẩn bảng giá' : 'Xem chi tiết'}</span>
            {showDetail &&
                <div className="detail-price-doctor">
                    <div className="d-flex justify-content-between pb-2">
                        <strong>Giá khám</strong>
                        <strong>{lang === languages.VI ? formatVND : formatDollar}</strong>
                    </div>
                    <p>{infoDoctor.note}</p>
                    <strong>Người bệnh có thể thanh toán bằng hình thức: {lang === languages.VI ? infoDoctor.paymentTypeData.valueVi : infoDoctor.paymentTypeData.valueEn}</strong>
                </div>
            }
        </div>
    );
}

DoctorExtraInfo.propTypes = {
    doctorId: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo)

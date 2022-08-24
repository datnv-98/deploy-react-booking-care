import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useParams} from "react-router";
import Topbar from "../HomePage/content/Topbar";
import {postVerifyBookAppointment} from "../../services/userService";

const VerifyEmail = ({}) => {
    const [isSuccess, setIsSucess] = useState(true)

    useEffect(async () => {
        if(window.location && window.location.search) {
            const params = new URLSearchParams(window.location.search) // id=123
            let doctorId = params.get('doctorId') // 123
            let token = params.get('token') // 123
            let data = await postVerifyBookAppointment(token, doctorId)
            if(data.errCode === 2) {
                setIsSucess(false)
            }

        }

    },[])

    return (
        <div>
            <Topbar />
            <div className="doctor-detail-container text-center font-weight-bold">
                {isSuccess ? <div class="text-info">CHÚC MỪNG BẠN ĐÃ ĐẶT LỊCH THÀNH CÔNG !!!</div> :
                 <div class="font-italic text-red">LỊCH HẸN ĐÃ ĐƯỢC KÍCH HOẠT HOẶC KHÔNG TỒN TẠI!!!</div>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

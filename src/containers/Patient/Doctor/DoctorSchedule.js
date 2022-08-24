import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useParams} from "react-router";
import './DoctorSchedule.scss'
import localization from 'moment/locale/vi'
import moment from "moment";
import {languages} from "../../../utils";
import {createNewUser, getScheduleDoctorByDate, postPatientBookAppointment} from "../../../services/userService";
import * as PropTypes from "prop-types";
import * as actions from "../../../store/actions";
import ModalUser from "../../System/ModalUser";
import BookingModal from "./Modal/BookingModal";
import {emitter} from "../../../utils/emitter";
import {toast} from "react-toastify";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../assets/images/loading.gif";

const DoctorSchedule = ({lang, doctorId, allScheduleTime, fetchAllScheduleTime}) => {
    const [allDays, setAllDays] = useState([])
    const [allAvailableTime, setAllAvailableTime] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [dataTime,setDataTime] = useState({})
    const [isLoading, setIsloading] = useState(false)
    // const {id} = useParams()

    useEffect(async ()=> {
        fetchAllScheduleTime()
        let arrDate = [];
        for (let i = 0; i< 7; i++) {
            let object= {};
            if(lang === languages.VI) {
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi)
                }

            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object)
        }
        setAllDays(arrDate)
        let response = await getScheduleDoctorByDate(parseInt(doctorId) , arrDate[0].value)
        setAllAvailableTime(response.data)

    },[lang])

    const handleChangeTime = async (e) => {
        let response = await getScheduleDoctorByDate(parseInt(doctorId) , e.target.value)
        setAllAvailableTime(response.data)
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const formSubmitCreateBooking = async (data) => {
        setIsloading(true)
        // console.log('data', data)
        try{
            let response = await postPatientBookAppointment(data);


            if(response && response.errCode !==0) {
                setIsloading(false)
                toast.error(response.errMessage)
            }
            if(response && response.errCode === 0) {
                setIsloading(false)
                toast.success('Đặt lịch khám bệnh thành công, vui lòng kiểm tra email để xác nhận lịch hẹn')
                toggleModal()
                emitter.emit('EVENT_CLOSE_MODAL_CREATE_BOOKING')
            }
        }
        catch (e) {
            console.log('e', e.response)
        }
    }

    const toggleModal = (item) => {
        setIsOpenModal(!isOpenModal)
        console.log('item', item)
        if(item) {
            setDataTime(item)
        }
        emitter.emit('EVENT_CLOSE_MODAL_CREATE_BOOKING')
    }

    return (
        <div className="doctor-schedule-container">
            {isLoading ? (<LoadingScreen bgColor="rgba(255,255,255,0.5)" children='' loading={true} logoSrc={spinner}/>) : (
            <div>
                <div className="all-schedule">
                    <select onChange={(e) => handleChangeTime(e)} className="select-time" name="" id="">
                        {allDays.map((item, index) => {
                            return (
                                <option className="select-option" key={index} value={item.value}>{item.label}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calender">
                    <span>
                        <i className="fa fa-fw fa-calculator"/>
                        <strong>LỊCH KHÁM</strong>
                    </span>
                    </div>
                    <div className="time-content d-flex flex-wrap">
                        {allAvailableTime && allAvailableTime.length > 0 ? allAvailableTime.map((item, index) => {
                            return (
                                <button key={index} onClick={ () => toggleModal(item)} className="btn btn-time">{lang === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                            )
                        }) : <div className="font-italic">Không có dữ liệu trong khoảng thời gian này, vui lòng chọn khoảng thời gian khác</div>}
                    </div>
                    {allAvailableTime && allAvailableTime.length > 0 ? <div>Chọn <i className="fa fa-fw fa-hand-point-up"/> và đặt miễn phí</div> : ''}
                </div>
                <BookingModal
                    doctor_id = {doctorId}
                    isOpen = {isOpenModal}
                    isClose = {toggleModal}
                    createBooking={formSubmitCreateBooking}
                    dataTime = {dataTime}
                />
            </div>)}
        </div>
    );
};

DoctorSchedule.propTypes = {
    doctorId: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        allScheduleTime: state.admin.allScheduleTime,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)

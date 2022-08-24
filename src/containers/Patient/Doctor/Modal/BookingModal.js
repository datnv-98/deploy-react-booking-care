import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {ModalBody, ModalHeader, Button, Modal, FormGroup, Input, Label, Form, FormText} from "reactstrap";
import * as PropTypes from "prop-types";
import {emitter} from "../../../../utils/emitter";
import ProfileDoctor from "../ProfileDoctor";
import {languages} from "../../../../utils";
import * as actions from "../../../../store/actions";
import DatePicker from "../../../../components/Input/DatePicker";
import moment from "moment";

const BookingModal = ({isOpen,isClose,fetchGenderStart,createBooking, lang, dataTime, genderRedux, doctor_id}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        date: '',
        birthday: '',
        timeType: '',
        gender: 'M',
        doctorId: '',
        language: lang,
        timeString: '',
        doctorName: ''
    });
    // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    const [priceBooking, setPriceBooking] = useState('')
    const [currentDate, setCurrentDate] = useState();
    console.log('dataTime', dataTime)
    useEffect( () => {
        listenToEmitter()
        fetchGenderStart()
    }, [])
    function listenToEmitter(){
        emitter.on('EVENT_CLOSE_MODAL_CREATE_BOOKING', () => {
            setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                date: '',
                birthday: '',
                timeType: '',
                gender: 'M',
                doctorId: '',
                language: lang,
                timeString: '',
                doctorName: ''
            })
        })
        emitter.on('EVENT_GET_FORMAT_PRICE', (price) => {
            setPriceBooking(price)
        })
    }

    const {fullName,phoneNumber,email,address,reason, gender} = formData
    const toggle = () => {
        isClose()
    }
    const onchangeForm = (e) => {
        setFormData({
            ...formData,
            doctorId: dataTime.doctorId,
            timeType: dataTime.timeType,
            [e.target.name]: e.target.value,
        })
    }
    const buildTimeBooking =(dataTime) => {
        if(lang === languages.VI) {
            return `${dataTime.timeTypeData.valueVi} , Ngày ${ moment.unix( + dataTime.date /1000).format("dddd - DD/MM/YYYY")} `
        }
        else {
            return `${dataTime.timeTypeData.valueEn} , Day ${ moment.unix( + dataTime.date /1000).format("dddd - DD/MM/YYYY")} `

        }
    }

    const handleOnchangeDate = (date) => {
        console.log('date', date)
        let nameVi = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
        let nameEn = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`

        setCurrentDate(date[0])
        console.log('currentDate', currentDate)
        let formatDate = new Date(currentDate).getTime();
        console.log('formatDate',formatDate)
        setFormData({
            ...formData,
            date: dataTime.date,
            birthday: formatDate,
            timeString: buildTimeBooking(dataTime),
            doctorName: lang === languages.VI ? nameVi : nameEn

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formData', formData)
        createBooking(formData);
    }

    return (
        <div>

            <Modal
                isOpen={isOpen}
                toggle={toggle}
                style={{maxWidth: '70vw', width: '100%'}}
            >
                <ModalHeader
                    toggle={toggle}>Đặt lịch khám bệnh</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <ProfileDoctor
                            doctor_id={doctor_id}
                            isShowDescription={true}
                            dataTime={dataTime}
                            isShowDateTime ={true}
                        />
                        <div className="col-5">Giá khám: {priceBooking}</div>
                        <div className="d-flex justify-content-between pb-3">
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleEmail">Họ và tên</Label>
                                    <Input autoComplete="off" type="text" name="fullName" value={fullName} onChange={(e) => onchangeForm(e)} required />
                                </FormGroup>
                            </div>
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleSelect">Số điện thoại</Label>
                                    <Input type="number" name="phoneNumber" value={phoneNumber} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between pb-3">
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleSelect">Địa chỉ email</Label>
                                    <Input type="text" name="email" value={email} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>

                            </div>
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleEmail">Địa chỉ liên hệ</Label>
                                    <Input type="text" name="address" value={address} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between pb-3">
                            <div className="col-12">
                                <FormGroup>
                                    <Label for="exampleEmail">Lý do khám bệnh</Label>
                                    <Input type="text" name="reason" value={reason} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleSelect">Ngày sinh</Label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={date => { handleOnchangeDate(date) }}
                                        value={currentDate}
                                        required
                                    />
                                </FormGroup>

                            </div>
                            <div className="col-5">
                                <FormGroup>
                                    <Label>Giới tính</Label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => onchangeForm(e)}
                                        name="gender"
                                        value={gender}
                                        required>

                                        {genderRedux && genderRedux.map((item, index) => (
                                            <option
                                                key={index} value={item.keyMap}>{lang === languages.VI ? item.valueVi : item.valueEn}</option>
                                        ))}

                                    </select>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <Button type="submit" color="primary" className="mr-3">Đặt lịch</Button>
                            <Button type="button" outline color="secondary" onClick={() => isClose()} >Hủy</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
BookingModal.propTypes = {
    isOpen: PropTypes.bool,
    isClose: PropTypes.func,
    createBooking: PropTypes.func,
    dataTime: PropTypes.object,
    doctor_id: PropTypes.string,
}
const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
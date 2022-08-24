import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from "react-select";
import * as actions from "../../../store/actions";
import {CommonUtils, dateFormat, languages} from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import './Doctor.scss'
import moment from "moment";
import {toast} from "react-toastify";
import {getAllPatientByDoctor, postSendRemedy, saveBulkScheduleDoctor} from "../../../services/userService";
import {useParams} from "react-router";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import Lightbox from "react-image-lightbox";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../assets/images/loading.gif";

const ManagePatient = ({userInfo, lang}) => {
    const [currentDate, setCurrentDate] = useState(moment(new Date()).startOf('day').valueOf());
    const [isOpen, setIsOpen] = useState(false)
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    const [isLoading, setIsloading] = useState(false)
    const [dataAllPatient, setDataAllPatient] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        imageBase64: '',
        patientId: '',
        timeType: '',
        doctorId: '',
        patientName: '',
        language: lang
    });
    const {email} = formData
    console.log('formData', formData)

    useEffect(async () => {
        await fettAllPatient()
    },[])
    const fettAllPatient = async () => {
        let response = await getAllPatientByDoctor(userInfo.id, currentDate);
        setDataAllPatient(response.data)
    }

    useEffect(() => {
        setFormData({
            ...formData,
            language: lang
        })
    },[lang])


    const handleOnchangeDatepk = async (date) => {
        console.log('date', date)
        setCurrentDate(date[0])
        let formatDate = new Date(currentDate).getTime();
        let response = await getAllPatientByDoctor(userInfo.id, formatDate);
        setDataAllPatient(response.data)
    }
    const confirnPatient = (item) => {
        console.log('data', item)
        setIsOpen(true)
        setFormData({
            ...formData,
            patientName: item.patientData.firstName,
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item && item.patientData && item.patientData.email,
            timeType: item.timeType
        })

    }
    const toggle =() => {
        setIsOpen(false)
    }

    const handleSubmit = async (e) => {
        setIsloading(true)
        e.preventDefault()
        console.log('data', formData)
        let response = await postSendRemedy(formData);
        if(response && response.errCode === 0) {
            setIsloading(false)
            toast.success('Send Remedy success')
        }
        else {
            setIsloading(false)
            toast.error('Error from server')
        }
        console.log('response', response)
        await fettAllPatient()
        setIsOpen(false)

    }
    const onchangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const onSelectFile = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            setFormData({
                ...formData,
                imageBase64: base64
            })
        }
    }

    return (
        <div className="manage-doctor-container">
            {isLoading ? (<LoadingScreen bgColor="rgba(255,255,255,0.5)" children='' loading={true} logoSrc={spinner}/>) : (
                <div>
                    <div className="manage-doctor-header">
                        <h2>Thông tin đặt lịch khám bệnh</h2>
                    </div>
                    <div className="more-info d-flex justify-content-between">
                        <div className="content-right w-50">
                            <label>Chọn ngày: </label>
                            <DatePicker
                                className="form-control"
                                onChange={date => { handleOnchangeDatepk(date) }}
                                value={currentDate}
                                // minDate={yesterday}
                                required
                            />
                        </div>

                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Thời gian</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Giới tính</th>
                            <th style={{width: '150px', textAlign: 'center'}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            dataAllPatient && dataAllPatient.length > 0 ? dataAllPatient.map((data, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{lang ===languages.VI ? data.timeTypeDataPatient.valueVi : data.timeTypeDataPatient.valueEn}</td>
                                        <td>{data && data.patientData && data.patientData.firstName}</td>
                                        <td>{data && data.patientData && data.patientData.email}</td>
                                        <td>{data && data.patientData && data.patientData.address}</td>
                                        <td>{data && data.patientData && data.patientData.phoneNumber}</td>
                                        <td>{lang ===languages.VI ? data && data.patientData &&data.patientData.genderData && data.patientData.genderData.valueVi : data && data.patientData &&data.patientData.genderData && data.patientData.genderData.valueEn}</td>
                                        <td className="text-center">
                                            <button onClick={() => confirnPatient(data)} className="btn btn-confirn mr-0">Xác nhận</button>
                                        </td>
                                    </tr>
                                )
                            }) : <tr>
                                <td colSpan='6'>No data</td>
                            </tr>
                        }

                        </tbody>
                    </table>
                    <Modal
                        isOpen={isOpen}
                        style={{maxWidth: '70vw', width: '100%'}}
                    >
                        <ModalHeader
                            toggle={toggle}>Chi tiết lịch hẹn</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={(event) => handleSubmit(event)}>
                                <div className="d-flex justify-content-between">
                                    <div className="col-5">
                                        <FormGroup>
                                            <Label for="exampleEmail">Email bệnh nhân</Label>
                                            <Input type="email" name="email" value={email} onChange={(e) => onchangeForm(e)} required />
                                        </FormGroup>
                                    </div>
                                    <div className="col-5">
                                        <FormGroup>
                                            <label >Chọn file đơn thuốc </label>
                                            <Input onChange={onSelectFile} type="file" name="imageBase64"/>

                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button type="submit" className="btn-add-new mr-3">Send</Button>
                                    <Button type="button" className="btn btn-outline-secondary">Cancel</Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
                )}
        </div>
    )
}
ManagePatient.propTypes = {


}
const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
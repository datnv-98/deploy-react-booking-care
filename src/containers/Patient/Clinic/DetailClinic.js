import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useParams} from "react-router";
import './DetailClinic.scss'
import Topbar from "../../HomePage/content/Topbar";
import {getDetailClinicById, getDetailSpecialtyById} from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";

const DetailClinic = ({}) => {
    const { id } = useParams();
    const [descriptionClinic, setDescriptionClinic] = useState()
    const [listDoctorIds, setListDoctorIds] = useState([])
    const [getData, setGetData] = useState({
        name: '',
        address: ''
    })
    useEffect(async () => {
        let response = await getDetailClinicById(id)
        setDescriptionClinic(response.data.descriptionHTML)
        setGetData({
            name: response.data.name,
            address: response.data.address
        })
        let arr = response && response.data &&  response.data.doctorClinic && response.data.doctorClinic.map((item, index) => {
            return item.doctorId
        })
        setListDoctorIds(arr)
    },[])

    const {name, address} = getData

    return (
        <div style={{height: '100vh', overflow: 'auto'}}>
            <Topbar />
            <div className="doctor-detail-container">
                <div>{name}</div>
                <div>{address}</div>
                <div className="description">
                    <div dangerouslySetInnerHTML={{__html: descriptionClinic}} />
                </div>
                {listDoctorIds && listDoctorIds.map((item, index) => {
                    return(
                        <div className='d-flex each-doctor'>
                            <div className='content-left w-50 pr-4'>
                                <ProfileDoctor
                                    key={index}
                                    doctor_id={item}
                                    isShowDescription={true}
                                    isShowDateTime={false}
                                    isShowMore={false}
                                />
                            </div>

                            <div className='content-right pl-4 w-50'>
                                <DoctorSchedule
                                    doctorId ={item}/>
                                <DoctorExtraInfo
                                    key={index}
                                    doctorId={item}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);

import React, {Component, useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useParams} from "react-router";
import './DetailSpecialty.scss'
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DetailDoctor from "../Doctor/DetailDoctor";
import Topbar from "../../HomePage/content/Topbar";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import Select from "react-select";
import {CommonUtils, languages} from "../../../utils";
import * as actions from "../../../store/actions";
import {getDetailSpecialtyById} from "../../../services/userService";
import ShowMoreText from "react-show-more-text";
import SideBar from "../../HomePage/sidebar/Sidebar";
import $ from 'jquery';

const DetailSpecialty = ({allRequiredDoctorInfo, lang,getRequiredDoctorInfo}) => {
    console.log('lang', lang)
    const { id } = useParams();
    const [listDoctorIds, setListDoctorIds] = useState([])
    const [selectedProvince, setSelectedProvince] = useState({label: lang === languages.VI ?'Toàn quốc': 'All', value:'ALL'})
    const [listProvince, setListProvince] = useState([]);
    const [descriptionSpecialty, setDescriptionSpecialty] = useState()
    const [sidebarIsOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    useEffect(async () => {
        getRequiredDoctorInfo();
        let response = await getDetailSpecialtyById(id, 'ALL');
        console.log('response')
        setDescriptionSpecialty(response.data.descriptionHTML)
        let arr = response && response.data &&  response.data.doctorSpecialty && response.data.doctorSpecialty.map((item, index) => {
            return item.doctorId
        })
        setListDoctorIds(arr)
    },[])


    useEffect(() => {
        setListProvince(allRequiredDoctorInfo.resProvince)
    },[allRequiredDoctorInfo])


    const handleChangeSelectProvince = async (selectedOption) => {
        console.log('selectedOption', selectedOption)
        setSelectedProvince(selectedOption)
        let response = await getDetailSpecialtyById(id, selectedOption.value)
        console.log('response', response)
        let arr = response.data.doctorSpecialty.map((item, index) => {
            return item.doctorId
        })
        setListDoctorIds(arr)
    }
    const optionsProvince = CommonUtils.buildDataInputSelect(listProvince, lang,'PROVINCE');
    optionsProvince.unshift({
        label: lang === languages.VI ? 'Toàn quốc' : 'ALL',
        value: 'ALL'
    })
    const toggleText = () => {
        if($(".text").hasClass("show-more-height")) {
            $('.show-more').text("Show Less");
        } else {
            $('.show-more').text("Show More");
        }

        $(".text").toggleClass("show-more-height");
    }
    console.log('listDoctorIds', listDoctorIds)
    return (
        <div style={{height: '100vh', overflow: 'auto'}}>
            <Topbar toggleSidebar={toggleSidebar}/>
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <div className="doctor-detail-container">
                <div id="profile-description" className="description">
                    <div className="text show-more-height" dangerouslySetInnerHTML={{__html: descriptionSpecialty}}>
                    </div>
                    <div className="show-more" onClick={toggleText}>Show More</div>
                </div>
                <div className='pb-4' style={{width: '200px'}}>
                    <Select
                        value={selectedProvince}
                        onChange={handleChangeSelectProvince}
                        options={optionsProvince}
                        name="selectedProvince"
                    />
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

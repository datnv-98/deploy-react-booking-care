import React, {useEffect, useRef, useState} from 'react';
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
import {saveBulkScheduleDoctor} from "../../../services/userService";

const ManageSchedule = ({fetchAllDoctors, allDoctors, lang, allScheduleTime, fetchAllScheduleTime, userInfo}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentDate, setCurrentDate] = useState();
    let [rangeTime, setRangeTime] = useState([]);
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const selectInputRef = useRef()
    const optionDoctorId = [];
    console.log('userInfo', userInfo)
    useEffect(() => {
        fetchAllDoctors();
        fetchAllScheduleTime()
    },[])
    useEffect(() => {
        let data = allScheduleTime.map(item => ({
            ...item,
            // them truong isSelected
            isSelected: false
        }))
        setRangeTime(data)
    },[allScheduleTime])
    const optionDoctorIds = CommonUtils.buildDataInputSelect(allDoctors, lang, 'USERS');
    console.log('optionDoctorIds', optionDoctorIds)


    const handleChange =(seletedOption) => {
        setSelectedOption(seletedOption)
    }
    const handleOnchangeDatepk = (date) => {
        setCurrentDate(date[0])
    }
    if(userInfo.roleId === 'R2' && optionDoctorIds.length > 0) {

        const obj = optionDoctorIds.find((item) => item.value === userInfo.id)
        optionDoctorId.push(obj)
        // console.log('selectedOption', selectedOption)
    }

    const handleActiveBtn = (it) => {
        if(rangeTime && rangeTime.length > 0) {
             rangeTime = rangeTime.map((item, index) => {
                if(item.id === it.id) {
                    // add thêm phần tử vào object
                    item.isSelected = !item.isSelected
                }
                return item
            })
            console.log('rangetime', rangeTime)
        }
       setRangeTime(rangeTime)
    }
    const handleSubmit = async () => {
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        //  let formatDate = moment(currentDate).unix();
         let formatDate = new Date(currentDate).getTime();
        // check validate
        if(!selectedOption) {
             toast.error('Invalid doctor')
            return;
        }
        if(!currentDate) {
             toast.error('Invalid date')
            return;
        }

        if(rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime.length === 0) {
                toast.error('Invalid Time')
            }
            else {
            const responseList = selectedTime.map(item => {
                const obj = {
                    doctorId: selectedOption.value,
                    date: formatDate,
                    timeType: item.keyMap
                }
                return obj
            })
                console.log('responseList', responseList)
                let response = await saveBulkScheduleDoctor({
                    arrSchedule: responseList,
                    doctorId: selectedOption.value,
                    date: formatDate,
                })
                if(response) {
                    toast.success('Create schedule doctor success');

                    // reset value
                    const resetRangeTime = rangeTime.map(it => {
                        it.isSelected = false
                        return it
                    })
                    setRangeTime(resetRangeTime)
                    setCurrentDate('');
                    selectInputRef.current.select.clearValue();
                }

                console.log('response', response)
            }

        }

    }

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-header">
                <h2>Tạo lịch khám bệnh</h2>
            </div>
            <div className="more-info d-flex justify-content-between">
                <div className="content-left form-group">
                    <label>{ userInfo.roleId === 'R2' ?'Bác sĩ:':'Chọn bác sĩ:'}</label>
                    <Select
                        // isDisabled={userInfo.roleId === 'R2'}
                        ref={selectInputRef}
                        required
                        defaultValue={selectedOption || ''}
                        onChange={handleChange}
                        options={userInfo.roleId === 'R2' ? optionDoctorId : optionDoctorIds}
                    />
                </div>
                <div className="content-right w-50">
                    <label>Chọn ngày: </label>
                    <DatePicker
                        className="form-control"
                        onChange={date => { handleOnchangeDatepk(date) }}
                        value={currentDate}
                        minDate={yesterday}
                        required
                    />
                </div>

            </div>
            <div className="d-flex justify-content-around schedule-doctor">
                {rangeTime && rangeTime.map((item, index) => {
                    return (
                        <button
                            onClick={() =>handleActiveBtn(item)}
                            className={item.isSelected ? 'btn btn-time active':'btn btn-time '} key={index}>{lang === languages.VI ? item.valueVi : item.valueEn}</button>
                    )
                })}
            </div>
            <button onClick={handleSubmit} className="mt-3 btn btn-primary float-right">Tạo thông tin</button>

        </div>
    )
}
ManageSchedule.propTypes = {

}
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        allScheduleTime: state.admin.allScheduleTime,
        allDoctors: state.admin.allDoctors,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
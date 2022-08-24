import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import './AdminCommon.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import {getDetailDoctorIDService} from "../../../services/userService";
import {CommonUtils, languages, manageActions} from "../../../utils";
import {getRequiredDoctorInfo} from "../../../store/actions";

const ManageDoctor = (
    {fetchAllDoctors, allDoctors, saveDetailDoctors, lang, getRequiredDoctorInfo,
        allRequiredDoctorInfo,fetchAllSpecialty, allSpecialty
    }) => {

    const [formData, setFormData] = useState({
        doctorId: '',
        contentMarkdown:'',
        contentHTML: '',
        description:'',
        action: '',
        nameClinic: '',
        addressClinic: '',
        note: '',
        selectedPrice: null,
        selectedProvince: null,
        selectedPayment: null,
        selectedSpecialty: null,
        selectedClinic: null
    })
    const [hasMarkdown,setHasMarkdown ] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([]);
    const [listClinic, setListClinic] = useState([]);


    useEffect(() => {
        fetchAllDoctors()
        getRequiredDoctorInfo()
        fetchAllSpecialty()
    },[])
    useEffect(() => {
        setListPrice(allRequiredDoctorInfo.resPrice)
        setListPayment(allRequiredDoctorInfo.resPayment)
        setListProvince(allRequiredDoctorInfo.resProvince)
        setListClinic(allRequiredDoctorInfo.resClinic)
        setListSpecialty(allSpecialty)
    },[allRequiredDoctorInfo])

    const {description, contentMarkdown, contentHTML,selectedSpecialty, nameClinic,
        addressClinic, note, selectedPrice, selectedProvince, selectedPayment, selectedClinic} = formData

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    function handleEditorChange({ html, text }) {
        // console.log('handleEditorChange', html, text);
        setFormData({
            ...formData,
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    console.log('listClinic', listClinic)
    console.log('allRequiredDoctorInfo', allRequiredDoctorInfo)
    const options = CommonUtils.buildDataInputSelect(allDoctors, lang, 'USERS');
    const optionsPrice = CommonUtils.buildDataInputSelect(listPrice, lang,'PRICE');
    const optionsPayment = CommonUtils.buildDataInputSelect(listPayment, lang,'PAYMENT');
    const optionsProvince = CommonUtils.buildDataInputSelect(listProvince, lang,'PROVINCE');
    const optionsSpecialty = CommonUtils.buildDataInputSelect(listSpecialty, lang,'SPECIALTY');
    const optionsClinic = CommonUtils.buildDataInputSelect(listClinic, lang,'CLINIC');
    console.log('optionsClinic', optionsClinic)
    async function handleChange(seletedOption) {
        setSelectedDoctor(seletedOption)
        let response = await getDetailDoctorIDService(seletedOption.value)
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            setHasMarkdown(true)
            let markdown = response.data.Markdown;
            let paymentId = '', priceId = '', provinceId = '', selectedClinic = '', specialtyId = '', selectedPayment = '',
                selectedPrice= '', selectedProvince = '', clinicId ='', selectedSpecialty = '', nameClinic = '', addressClinic = '', note = ''
            if (response.data.Doctor_Infor) {
                let doctorInfo = response.data.Doctor_Infor
                console.log('doctorInfo', doctorInfo)
                paymentId = doctorInfo.paymentId;
                priceId = doctorInfo.priceId;
                provinceId = doctorInfo.provinceId;
                specialtyId = doctorInfo.specialtyId;
                clinicId = doctorInfo.clinicId
                nameClinic = doctorInfo.nameClinic;
                addressClinic = doctorInfo.addressClinic;
                note = doctorInfo.note;

                 selectedPayment = optionsPayment.find(item => {
                    return item && item.value === paymentId
                })
                 selectedPrice = optionsPrice.find(item => {
                    return item && item.value === priceId
                })
                 selectedProvince = optionsProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = optionsSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = optionsClinic.find(item => {
                    return item && item.value === clinicId
                })

            }


            setFormData({
                ...formData,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                description: markdown.description,
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty : selectedSpecialty,
                selectedClinic: selectedClinic
            })

        } else {

                setHasMarkdown(false)
                setFormData({
                    ...formData,
                    description: '',
                    contentMarkdown: '',
                    contentHTML: '',
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    selectedPrice: '',
                    selectedProvince: '',
                    selectedPayment: '',
                    selectedSpecialty: '',
                    selectedClinic: ''
                })
            }

    }
    function handleOnChangeText (e) {
        setFormData({
            ...formData,
           [e.target.name]: e.target.value
        })

    }
    function handleSaveContentMarkDown() {
        const data = {
            ...formData,
            action: hasMarkdown ? manageActions.EDIT : manageActions.CREATE,
            doctorId: selectedDoctor && selectedDoctor.value,
            // selectedDoctor,
            selectedPrice: selectedPrice && selectedPrice.value,
            selectedProvince: selectedProvince && selectedProvince.value,
            selectedPayment: selectedPayment && selectedPayment.value,
            selectedSpecialty: selectedSpecialty && selectedSpecialty.value,
            selectedClinic: selectedClinic && selectedClinic.value ? selectedClinic.value : '',
        }

        saveDetailDoctors(data)
    }
    const handleChangeSelectPrice = (selectedOption) => {

        setFormData({
        ...formData,
            selectedPrice: selectedOption
        })
    }
    const handleChangeSelectSpecialty = (selectedOption) => {

        setFormData({
        ...formData,
            selectedSpecialty: selectedOption
        })
    }

    const handleChangeSelectClinic = (selectedOption) => {

        setFormData({
        ...formData,
            selectedClinic: selectedOption
        })
    }

    const handleChangeSelectPayment = (selectedOption) => {
        setFormData({
            ...formData,
            selectedPayment: selectedOption
        })
    }
    const handleChangeSelectProvince = (selectedOption) => {
        setFormData({
            ...formData,
            selectedProvince: selectedOption
        })
    }


    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-header">
                <h2>Tạo mới thông tin bác sĩ</h2>
            </div>
            <div className="more-info-top d-flex justify-content-between">
                <div className="content-left form-group">
                    <label className="validate">Chọn bác sĩ:</label>
                    <Select
                        value={selectedDoctor}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                <div className="content-right">
                    <label className="validate">Thông tin giới thiệu: </label>
                    <textarea
                        className="form-control"
                        value={description}
                        name="description"
                        onChange={handleOnChangeText}/>

                </div>

            </div>
            <div className="more-info d-flex justify-content-between">
                <div className="content-left form-group">
                    <label className="validate">Giá khám bệnh:</label>
                    <Select
                        value={selectedPrice}
                        onChange={handleChangeSelectPrice}
                        options={optionsPrice}
                        name="selectedPrice"
                    />
                </div>
                <div className="content-center form-group">
                    <label className="validate">Phương thức thanh toán:</label>
                    <Select
                        value={selectedPayment}
                        onChange={handleChangeSelectPayment}
                        options={optionsPayment}
                        name="selectedPayment"
                    />
                </div>
                <div className="content-right form-group">
                    <label className="validate">Tỉnh thành:</label>
                    <Select
                        value={selectedProvince}
                        onChange={handleChangeSelectProvince}
                        options={optionsProvince}
                        name="selectedProvince"
                    />
                </div>

            </div>
            <div className="more-info d-flex justify-content-between">
                <div className="content-left form-group">
                    <label className="validate">Tên phòng khám</label>
                    <input
                        value={nameClinic}
                        onChange={handleOnChangeText}
                        type="text"
                        name="nameClinic"
                        className="form-control"/>
                </div>
                <div className="content-center form-group">
                    <label className="validate">Địa chỉ phòng khám</label>
                    <input
                        value={addressClinic}
                        onChange={handleOnChangeText}
                        type="text"
                        name="addressClinic"
                        className="form-control"/>
                </div>
                <div className="content-right form-group">
                    <label className="validate">Note</label>
                    <input
                        onChange={handleOnChangeText}
                        value={note}
                        name="note"
                        type="text" className="form-control"/>
                </div>

            </div>
            <div className="more-info d-flex justify-content-between">
                <div className="content-left form-group">
                    <label className="validate">Chọn chuyên khoa:</label>
                    <Select
                        value={selectedSpecialty}
                        onChange={handleChangeSelectSpecialty}
                        options={optionsSpecialty}
                        name="selectedSpecialty"
                    />
                </div>
                <div className="content-center form-group">
                    <label className="validate">Chọn phòng khám:</label>
                    <Select
                        value={selectedClinic}
                        onChange={handleChangeSelectClinic}
                        options={optionsClinic}
                        name="selectedClinic"
                    />
                </div>
                <div className="content-left form-group"></div>
            </div>
            <div className="manage-doctor-editor">
                <label className="validate">Tóm tắt tiểu sử và kinh nghiệm</label>
                <MdEditor
                    style={{ height: '450px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />
            </div>
            <button onClick={handleSaveContentMarkDown} className="mt-3 btn btn-primary float-right">{hasMarkdown ? 'Lưu thông tin':'Tạo thông tin'}</button>
        </div>
    )
}
ManageDoctor.propTypes = {

}
const mapStateToProps = state => {
    return {
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
        allDoctors: state.admin.allDoctors,
        allSpecialty: state.admin.allSpecialty,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
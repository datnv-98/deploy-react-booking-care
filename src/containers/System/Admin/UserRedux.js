import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import LoadingScreen from "react-loading-screen";
import {CommonUtils, languages} from "../../../utils";
import * as actions from "../../../store/actions";
import spinner from "../../../assets/images/loading.gif";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import '../UserManage.scss'
import TableManageUser from "./TableManageUser";

const UserRedux = ({
                       isLoading,
                       fetchGenderStart,
                       lang,
                       genderRedux,
                       fetchPositionStart,
                       fetchRoleIDStart,
                       roleIDRedux,
                       positionRedux,
                       saveCreateNewUser,
                       saveEditUser,
                       dataAllUsers
                   }) => {
    const [preview, setPreview] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        roleId: roleIDRedux && roleIDRedux.length > 0 ? roleIDRedux[0].keyMap : '',
        positionId: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : '',
        gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : '',
        avatar: ''
    });
    const {email, password, firstName, lastName, address, phoneNumber, avatar, roleId,positionId, gender } = formData
    const [showEdit, setShowEdit] = useState(false)
    useEffect(()=> {
        // reset form
        setPreview(null)
        setFormData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            roleId: roleIDRedux && roleIDRedux.length > 0 ? roleIDRedux[0].keyMap : '',
            positionId: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : '',
            gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : '',
            avatar: ''
        })
    },[dataAllUsers])
    useEffect(() => {
        fetchGenderStart();
        fetchPositionStart();
        fetchRoleIDStart();

    },[])

    const onSelectFile = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            setFormData({
                ...formData,
                avatar: base64
            })
        }


    }
    const openPreviewImg = () => {
        if (!preview) return;
        setIsOpen(true)
    }
    const onchangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData', formData)
        setPreview(null)
        saveCreateNewUser(formData);

    }
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setShowEdit(false)
        saveEditUser(formData);

    }
    const getEditUserInfo = (info) => {
        let imageBase64 = ''
        if (info.image) {
            imageBase64 = new Buffer(info.image, 'base64').toString('binary')
        }
        setShowEdit(true)
        setPreview(imageBase64)
        setFormData({
            id: info.id,
            email: info.email,
            password: '123456',
            firstName: info.firstName,
            lastName: info.lastName,
            address: info.address,
            phoneNumber: info.phoneNumber,
            roleId: info.roleId,
            positionId: info.positionId,
            gender: info.gender
        })
        console.log('form', formData)
    }
    return (
        <div className="user-redux-container">
            {isLoading ? (<LoadingScreen bgColor="rgba(255,255,255,0.5)" children='' loading={true} logoSrc={spinner}/>) : (
                <div>
                    <h4 className="text-center mt-3">
                        Manage user redux
                    </h4>
                    <div className="user-redux-body">
                        <div className="container mb-4">
                            <Form onSubmit={(event) => showEdit ? handleEditSubmit(event) : handleSubmit(event)}>
                                <div className="d-flex justify-content-between">
                                    <div className="col-5">
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input
                                                onChange={(e) => onchangeForm(e)}
                                                autoComplete="off"
                                                value={email}
                                                disabled ={showEdit ? 'disabled':''}
                                                type="email" name="email" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>First Name</Label>
                                            <Input
                                                onChange={(e) => onchangeForm(e)}
                                                type="text" value={firstName} name="firstName" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Last Name</Label>
                                            <Input
                                                onChange={(e) => onchangeForm(e)}
                                                type="text"
                                                value={lastName} name="lastName" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Address</Label>
                                            <Input
                                                onChange={(e) => onchangeForm(e)}
                                                type="text"
                                                value={address} name="address" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Phone number</Label>
                                            <Input
                                                onChange={(e) => onchangeForm(e)}
                                                type="text" value={phoneNumber} name="phoneNumber" required/>
                                        </FormGroup>
                                    </div>
                                    <div className="col-5">
                                        <FormGroup>
                                            <Label>Gender</Label>
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
                                        <FormGroup>
                                            <Label>Position</Label>
                                            <select
                                                className="form-control"
                                                name="positionId"
                                                value={positionId}
                                                onChange={(e) => onchangeForm(e)} required>
                                                
                                                {positionRedux && positionRedux.map((item, index) => (
                                                    <option
                                                        key={index} value={item.keyMap}>{lang === languages.VI ? item.valueVi : item.valueEn}</option>
                                                ))}

                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>RoleID</Label>
                                            <select
                                                className="form-control"
                                                value={roleId}
                                                onChange={(e) => onchangeForm(e)}
                                                name="roleId" required>
                                                
                                                {roleIDRedux && roleIDRedux.map((item, index) => (
                                                    <option
                                                        key={index} value={item.keyMap}>{lang === languages.VI ? item.valueVi : item.valueEn}</option>
                                                ))}

                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input
                                                disabled ={showEdit ? 'disabled':''}
                                                onChange={(e) => onchangeForm(e)}
                                                type="password" value={password} name="password" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleFile">Image</Label>
                                            <div>
                                                <Input onChange={onSelectFile} type="file" name="avatar" id="previewImg"
                                                       hidden/>
                                                <label className="custom-upload-img" htmlFor="previewImg">Tải ảnh <i
                                                    className="fas fa-upload"/></label>
                                                <div onClick={openPreviewImg} className="preview-image">
                                                    <img src={preview} alt=''/>
                                                </div>
                                                {isOpen && (
                                                    <Lightbox
                                                        mainSrc={preview}
                                                        onCloseRequest={() => setIsOpen(false)}
                                                    />
                                                )}
                                            </div>

                                        </FormGroup>

                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button type="submit" className="btn-add-new ">{showEdit ? 'Lưu thay đổi':'Thêm mới'}</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <TableManageUser getEditUserInfo={getEditUserInfo}/>
                </div>
            )}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        roleIDRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoading: state.admin.isLoading,
        dataAllUsers: state.admin.dataAllUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleIDStart: () => dispatch(actions.fetchRoleIDStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        saveCreateNewUser: (data) => dispatch(actions.saveCreateNewUser(data)),
        getAllUsersStart: (data) => dispatch(actions.getAllUsersStart(data)),
        saveEditUser: (data) => dispatch(actions.saveEditUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

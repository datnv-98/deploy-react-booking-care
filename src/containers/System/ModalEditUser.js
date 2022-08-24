import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {ModalBody, ModalHeader, Button, Modal, FormGroup, Input, Label, Form, FormText} from "reactstrap";
import * as PropTypes from "prop-types";
import './UserManage.scss';

const ModalEditUser = (props) => {
    const {isOpen,isClose,editUserInfo,tableDataEdit} = props;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
    });

    useEffect(() => {
        setFormData(tableDataEdit)
    },[isOpen])


    const {email,firstName,lastName,address} = formData


    const toggle = () => {
        isClose()
    }
    const onchangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        editUserInfo(formData);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                style={{maxWidth: '70vw', width: '100%'}}
            >
                <ModalHeader
                    toggle={toggle}>Edit user</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <div className="d-flex justify-content-between">
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleSelect">First Name</Label>
                                    <Input type="text" name="firstName" value={firstName} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Last Name</Label>
                                    <Input type="text" name="lastName" value={lastName} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>
                            </div>
                            <div className="col-5">
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" value={email} onChange={(e) => onchangeForm(e)} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Address</Label>
                                    <Input type="text" name="address" value={address} onChange={(e) => onchangeForm(e)} required/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button type="submit" className="btn-add-new ">Save Change</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
ModalEditUser.propTypes = {
    isOpen: PropTypes.bool,
    isClose: PropTypes.func,
    editUserInfo: PropTypes.func,
    tableDataEdit: PropTypes.object,
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
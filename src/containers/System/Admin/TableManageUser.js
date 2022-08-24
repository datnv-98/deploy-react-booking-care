import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import * as PropTypes from "prop-types";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const TableManageUser = ({getAllUsersStart, dataAllUsers, deleteUserStart, getEditUserInfo}) => {

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }
    useEffect(()=> {
        getAllUsersStart()
    },[])
    const deleteInfoUser = (id) => {
        console.log('id', id)
        deleteUserStart(id)
    }

    const editInfoUser = (userInfo) => {
        console.log('editInfoUser', userInfo)
        getEditUserInfo(userInfo)
    }

    return (
        <div className="container">
            <table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    dataAllUsers && dataAllUsers.map((data, index)=>{
                        return(
                            <tr key={index}>
                                <td>{data.email}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.address}</td>
                                <td>
                                    <button onClick={() => editInfoUser(data)} className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                    <button onClick={() => deleteInfoUser(data.id)} className="btn-delete"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </div>
    )
}
TableManageUser.propTypes = {
    getEditUserInfo: PropTypes.func,

}
const mapStateToProps = state => {
    return {
        dataAllUsers: state.admin.dataAllUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersStart: (data) => dispatch(actions.getAllUsersStart(data)),
        deleteUserStart:(id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
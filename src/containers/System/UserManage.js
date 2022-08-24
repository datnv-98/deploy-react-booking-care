import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {createNewUser, deleteUser, editUserInfo, getAllUsers} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter} from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

const UserManage = () => {
    const [tableData, setTableData] = useState([])
    const [tableDataEdit, setTableDataEdit] = useState({})
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
    useEffect(async () => {
        await getAllDataUsers()
    }, [])

    const getAllDataUsers = async () => {
        let data = await getAllUsers('ALL');
        if(data && data.errCode === 0) {
            setTableData(data.users)
        }
    }

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    const toggleModalEdit = () => {
        setIsOpenModalEdit(!isOpenModalEdit)
    }
    const formSubmitNewUser = async (data) => {
        console.log('data', data)
        try{
            let response = await createNewUser(data);

            if(response && response.errCode !==0) {
                alert(response.errMessage)
            }
            if(response && response.errCode === 0) {
                await getAllDataUsers()
                toggleModal()
                emitter.emit('EVENT_CLEAR_MODAL')
            }
        }
        catch (e) {
            console.log('e', e.response)
        }
    }
    const formSubmitEditUser = async (data) => {
        console.log('data', data)
        try{
            let response = await editUserInfo(data);

            if(response && response.errCode !==0) {
                alert(response.errMessage)
            }
            if(response && response.errCode === 0) {
                await getAllDataUsers()
                toggleModalEdit()
            }
        }
        catch (e) {
            console.log('e', e.response)
        }
    }
    function editInfoUser(info) {
        setTableDataEdit(info)
        toggleModalEdit()
    }
    async function deleteInfoUser(id) {
        try{
            let response = await deleteUser(id);

            if(response && response.errCode !==0) {
                alert(response.errMessage)
            }
            if(response && response.errCode === 0) {
                await getAllDataUsers()
            }
        }
        catch (e) {
            console.log('e', e.response)
        }
    }
        return (
            <div>
                <div className="text-center"><h2>Manage users</h2></div>
                <div className="m-4">
                    <button
                        onClick={toggleModal}
                        className="btn btn-primary px-3 btn-add-new"><i className="fas fa-plus"></i>Add new users</button>
                </div>
                <ModalUser
                    isOpen = {isOpenModal}
                    isClose = {toggleModal}
                    createNewUser={formSubmitNewUser}
                />
                <ModalEditUser
                    isOpen = {isOpenModalEdit}
                    isClose = {toggleModalEdit}
                    tableDataEdit={tableDataEdit}
                    editUserInfo={formSubmitEditUser}
                />

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
                        tableData && tableData.map((data, index)=>{
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
        );
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

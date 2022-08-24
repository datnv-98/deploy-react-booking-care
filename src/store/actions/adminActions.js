import actionTypes from './actionTypes';
import {
    createNewUser,
    deleteUser,
    editUserInfo, getAllClinic,
    getAllCodeService, getAllDoctors, getAllSpecialty,
    getAllTopDoctorHome,
    getAllUsers, getDetailDoctorIDService, saveDetailDoctorService
} from "../../services/userService";
import {toast} from "react-toastify";
import CustomToast from "../../components/CustomToast";
import React from "react";
import {useParams} from "react-router";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch để thêm loading khi api chưa load xong, sau chỗ nào cần loading thì ms thêm vào
            dispatch({type: actionTypes.FETCH_GENDER_START})


            let response = await getAllCodeService('gender');
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(fetchGenderSuccess(response.data))
            }
            else {
                dispatch(fetchGenderFail())
            }
        }
        catch (e) {
            dispatch(fetchGenderFail())
            console.log('err', e)
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('position');
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(fetchPositionSuccess(response.data))
            }
            else {
                dispatch(fetchPositionFail())
            }
        }
        catch (e) {
            dispatch(fetchPositionFail())
            console.log('err', e)
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleIDStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('role');
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(fetchRoleIDSuccess(response.data))
            }
            else {
                dispatch(fetchRoleIDFail())
            }
        }
        catch (e) {
            dispatch(fetchRoleIDFail())
            console.log('err', e)
        }
    }

}
export const fetchRoleIDSuccess = (positionData) => ({
    type: actionTypes.FETCH_ROLEID_SUCCESS,
    data: positionData
})
export const fetchRoleIDFail = () => ({
    type: actionTypes.FETCH_ROLEID_FAIL
})

export const saveCreateNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUser(data);
            if(response && response.errCode === 0){
                toast.success('Create new user success')
                //phai co dispatch
                dispatch(createNewUserSuccess())
                dispatch(getAllUsersStart())
            }
            else {
                dispatch(createNewUserFail())
            }
        }
        catch (e) {
            dispatch(createNewUserFail())
            console.log('err', e)
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const getAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsers('ALL');
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(getAllUsersSuccess(response.users.reverse()))
            }
            else {
                dispatch(getAllUsersFail())
            }
        }
        catch (e) {
            dispatch(getAllUsersFail())
            console.log('err', e)
        }
    }
}
export const getAllUsersSuccess = (dataUser) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: dataUser
})
export const getAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const saveEditUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await editUserInfo(data);
            if(response && response.errCode === 0){
                toast.success('Edit user success')
                //phai co dispatch
                dispatch(editUserSuccess())
                dispatch(getAllUsersStart())
            }
            else {
                dispatch(editUserFail())
            }
        }
        catch (e) {
            dispatch(editUserFail())
            console.log('err', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUser(id);
            if(response && response.errCode === 0){
                toast.success('Delete user success')
                //phai co dispatch
                dispatch(deleteUsersSuccess(response))
                dispatch(getAllUsersStart(response))
            }
            else {
                dispatch(deleteUsersFail())
            }
        }
        catch (e) {
            dispatch(deleteUsersFail())
            console.log('err', e)
        }
    }
}
export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUsersFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const fetchTopdoctor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let response = await getAllTopDoctorHome('10');
            if(response && response.errCode === 0){


                //phai co dispatch
                dispatch(getAllTopDoctorSuccess(response))
            }
            else {
                dispatch(getAllTopDoctorFail())
            }
        }
        catch (e) {
            dispatch(getAllTopDoctorFail())
            console.log('err', e)
        }
    }
}
export const getAllTopDoctorSuccess = (dataDoctors) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: dataDoctors
})
export const getAllTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
})


export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let response = await getAllDoctors();
            if(response && response.errCode === 0){

                //phai co dispatch
                dispatch(fetchAllDoctorsSuccess(response))
            }
            else {
                dispatch(fetchAllDoctorsFail())
            }
        }
        catch (e) {
            dispatch(fetchAllDoctorsFail())
            console.log('err', e)
        }
    }
}
export const fetchAllDoctorsSuccess = (dataDoctors) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: dataDoctors
})
export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
})

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDetailDoctorService(data);
            if(response && response.errCode === 0){
                toast.success('Save Info Detail Doctor succeed')
                //phai co dispatch
                dispatch(saveDetailDoctorsSuccess(response))
            }
            else {
                toast.error('Save Info Detail Doctor errol!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAIL
                })
            }
        }
        catch (e) {
            toast.error('Save Info Detail Doctor errol!')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAIL
            })
            console.log('err', e)
        }
    }
}
export const saveDetailDoctorsSuccess = (infoDoctor) => ({
    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
    data: infoDoctor
})

export const getDetailDoctorsId = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await getDetailDoctorIDService(id);
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(getDetailDoctorsIdSuccess(response))
            }
            else {
                dispatch(getDetailDoctorsIdFail())
            }
        }
        catch (e) {
            dispatch(getDetailDoctorsIdFail())
            console.log('err', e)
        }
    }
}
export const getDetailDoctorsIdSuccess = (detailDoctor) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_ID_SUCCESS,
    data: detailDoctor
})
export const getDetailDoctorsIdFail = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_ID_FAIL
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('TIME');
            if(response && response.errCode === 0){

                //phai co dispatch
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    data: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
                })
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
            })
        }
    }
}

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resClinic = await getAllClinic()

            if(resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resClinic && resClinic.errCode === 0
            ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resClinic: resClinic.data
                }

                //phai co dispatch
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
                    data: data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL
                })
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL
            })
        }
    }
}


export const fetchAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllSpecialty();
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(getAllSpecialtySuccess(response))
            }
            else {
                dispatch(getAllSpecialtyFail())
            }
        }
        catch (e) {
            dispatch(getAllSpecialtyFail())
            console.log('err', e)
        }
    }
}
export const getAllSpecialtySuccess = (dataSpecialty) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: dataSpecialty
})
export const getAllSpecialtyFail = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAIL
})
export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllClinic();
            if(response && response.errCode === 0){
                //phai co dispatch
                dispatch(getAllClinicSuccess(response))
            }
            else {
                dispatch(getAllClinicFail())
            }
        }
        catch (e) {
            dispatch(getAllClinicFail())
            console.log('err', e)
        }
    }
}
export const getAllClinicSuccess = (dataSpecialty) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: dataSpecialty
})
export const getAllClinicFail = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAIL
})
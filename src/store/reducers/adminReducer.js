import actionTypes from '../actions/actionTypes';
import {toast} from "react-toastify";
import CustomToast from "../../components/CustomToast";
import React from "react";

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions:[],
    dataAllUsers:[],
    dataDoctors: [],
    allDoctors: [],
    infoDoctor: {},
    allScheduleTime: [],
    allRequiredDoctorInfo: [],
    allSpecialty: [],
    allClinic: []
}

const adminReducer = (state = initialState, action) => {
    // redux thi khong can {...state} để clone lại state như react
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoading = false;
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoading = false;
            state.genders = []
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isLoading = false;
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.isLoading = false;
            state.positions=[]
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLEID_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLEID_FAIL:
            state.isLoading = false;
            state.roles = []
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.dataAllUsers = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAIL:
            return {
                ...state,
            }
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.EDIT_USER_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.isLoading = false;
            state.dataDoctors = action.data.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.isLoading = false;
            state.allDoctors = action.data.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_DOCTOR_ID_SUCCESS:
            state.infoDoctor = action.data.data
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_ID_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            state.allScheduleTime = []
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:
            state.allRequiredDoctorInfo = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.data.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAIL:
            state.allSpecialty = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.allClinic = action.data.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CLINIC_FAIL:
            state.allClinic = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
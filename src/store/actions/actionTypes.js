const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL:'FETCH_GENDER_FAIL',
    FETCH_ROLEID_SUCCESS: 'FETCH_ROLEID_SUCCESS',
    FETCH_ROLEID_FAIL: 'FETCH_ROLEID_FAIL',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',
    
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',

    FETCH_ALL_USERS_SUCCESS:'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAIL:'FETCH_ALL_USERS_FAIL',

    EDIT_USER_SUCCESS:'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL:'EDIT_USER_FAIL',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',

    FETCH_TOP_DOCTORS_SUCCESS:'FETCH_TOP_DOCTORS_SUCCESS',
    FETCH_TOP_DOCTORS_FAIL:'FETCH_TOP_DOCTORS_FAIL',

    FETCH_ALL_DOCTORS_SUCCESS:'FETCH_ALL_DOCTORS_SUCCESS',
    FETCH_ALL_DOCTORS_FAIL:'FETCH_ALL_DOCTORS_FAIL',

    SAVE_DETAIL_DOCTORS_SUCCESS:'SAVE_DETAIL_DOCTORS_SUCCESS',
    SAVE_DETAIL_DOCTORS_FAIL:'SAVE_DETAIL_DOCTORS_FAIL',

    GET_DETAIL_DOCTOR_ID_SUCCESS: 'GET_DETAIL_DOCTOR_ID_SUCCESS',
    GET_DETAIL_DOCTOR_ID_FAIL: 'GET_DETAIL_DOCTOR_ID_FAIL',


    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAIL:'FETCH_ALLCODE_SCHEDULE_TIME_FAIL',

    FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:'FETCH_REQUIRED_DOCTOR_INFO_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFO_FAIL: 'FETCH_REQUIRED_DOCTOR_INFO_FAIL',

    FETCH_ALL_SPECIALTY_SUCCESS:'FETCH_ALL_SPECIALTY_SUCCESS',
    FETCH_ALL_SPECIALTY_FAIL:'FETCH_ALL_SPECIALTY_FAIL',

    FETCH_ALL_CLINIC_SUCCESS:'FETCH_ALL_CLINIC_SUCCESS',
    FETCH_ALL_CLINIC_FAIL:'FETCH_ALL_CLINIC_FAIL',



})

export default actionTypes;
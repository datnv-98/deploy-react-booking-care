import axios from "../axios";
const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login',{email: userEmail, password: userPassword})
}
const getAllUsers = (inputId) => {
    return axios.get('/api/get-all-users',{ params: {id: inputId} })
}
const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: {id: userId} })
}
const editUserInfo = (data) => {
    return axios.put('/api/edit-user', data)
}
const getAllCodeService = (inputType) => {
    return axios.get('/api/allcode', {params: {type: inputType}})
}

const getAllTopDoctorHome = (limit) => {
    return axios.get('/api/top-doctor-home', {params: {limit: limit}})
}
const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}

const getDetailDoctorIDService = (id) => {
    return axios.get('/api/get-detail-doctor-by-id', {params: {id: id}})
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get('/api/get-schedule-doctor-by-date', {params: {doctorId:doctorId, date: date }})
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get('/api/get-extra-info-doctor-by-id', {params: {doctorId:doctorId }})
}

const getProfileDoctorById = (doctorId) => {
    return axios.get('/api/get-profile-doctor-by-id', {params: {doctorId:doctorId }})
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (token, doctorId) => {
    return axios.post('/api/verify-book-appointment', {token: token, doctorId: doctorId})
}

const createSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailSpecialtyById = (id, location) => {
    return axios.get('/api/get-detail-specialty-by-id', {params: {id:id,location: location }})
}

const createClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
    return axios.get('/api/get-all-clinic')
}

const getDetailClinicById = (id) => {
    return axios.get('/api/get-detail-clinic-by-id', {params: {id:id}})
}

const getAllPatientByDoctor = (id, date) => {
    return axios.get('/api/get-list-patient-for-doctor', {params: {doctorId:id, date: date}})
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}


export {
    handleLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUserInfo,
    getAllCodeService,
    getAllTopDoctorHome,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailDoctorIDService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createClinic,
    getAllClinic,
    getDetailClinicById,
    getAllPatientByDoctor,
    postSendRemedy
}
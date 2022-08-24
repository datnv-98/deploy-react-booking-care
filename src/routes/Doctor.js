import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import Header from "../containers/Header/Header";
import { path } from '../utils'
import ManagePatient from "../containers/System/Doctor/ManagePatient";


const Doctor = ({isLoggedIn}) => {
    console.log('isLoggedIn', isLoggedIn)
    return (
        <div className="doctor-container">
            <div className="doctor-list" style={{overflow: 'auto', height:'100vh'}}>
                {isLoggedIn && <Header />}
                <Switch>
                    <Route path={path.MANAGE_SCHEDULE} component={ManageSchedule} />
                    <Route path={path.MANAGE_PATIENT} component={ManagePatient} />
                </Switch>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

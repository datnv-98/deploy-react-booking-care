import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";

const System = ({systemMenuPath, isLoggedIn}) => {
    console.log('isLoggedIn', isLoggedIn)
    return (
        <div className="system-container">
            <div className="system-list" style={{overflow: 'auto', height:'100vh'}}>
                {isLoggedIn && <Header />}
                <Switch>
                    <Route path="/system/user-manage" component={UserManage} />
                    <Route path="/system/user-redux" component={UserRedux} />
                    <Route path="/system/user-admin" component={UserRedux} />
                    <Route path="/system/user-doctor" component={UserRedux} />
                    <Route path="/system/manage-doctor" component={ManageDoctor} />
                    <Route path="/system/manage-clinic" component={ManageClinic} />
                    <Route path="/system/manage-specialty" component={ManageSpecialty} />
                    <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);

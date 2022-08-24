import React, {Component, useEffect, useState} from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import {languages, USER_ROLE} from "../../utils";
import {changeLanguageApp} from "../../store/actions";
import {FormattedMessage} from "react-intl";
import _ from 'lodash'

const Header = ({changeLanguageApp, processLogout, languageRedux, userInfo}) => {
    const [menuApp, setMenuApp] = useState([])
    useEffect(() => {
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            console.log('role', role)
            if(role === USER_ROLE.admin) {
                menu = adminMenu
            }
             if (role === USER_ROLE.doctor) {
                menu = doctorMenu
            }
             setMenuApp(menu)
        }
    },[])
    function changeLanguage(language) {
        // fire redux event: actions
        changeLanguageApp(language)
    }
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>
                <div className="d-flex align-items-center">
                    <div className="language mr-3">
                        <span className="mr-3"><FormattedMessage id="home-header.welcome"/>, {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                        <span className={languageRedux === languages.VI ? 'vi active' : 'vi'}><span onClick={() => changeLanguage(languages.VI)}>VI</span></span>
                        <span className={languageRedux === languages.EN ? 'en active' : 'en'}><span onClick={() => changeLanguage(languages.EN)}>EN</span></span>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"/>
                    </div>
                </div>
            </div>
        );


}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languageRedux: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

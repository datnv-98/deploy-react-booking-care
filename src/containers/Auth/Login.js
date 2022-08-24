import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { useState } from 'react';
import {handleLogin} from "../../services/userService";
import {userLoginSuccess} from "../../store/actions";

const Login = ({userLoginSuccess}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [errMessage, setErrMessage] = useState('')
    const [showPassWord, setShowPassWord] = useState(false)
    const { username, password } = formData;
    const onchangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleShowHidePass = () => {
        setShowPassWord(!showPassWord)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMessage('')
        try{
            let data = await handleLogin(formData.username, formData.password);
            console.log('err', data)
            if(data && data.errCode !==0) {
                setErrMessage(data.message)
            }
            if(data && data.errCode === 0) {
                userLoginSuccess(data.user)
                console.log('success')
            }
            console.log('dat', data)
        }
        catch (e) {
            console.log('e', e.response)
            if(e.response) {
                if(e.response.data) {
                    setErrMessage(e.response.data.message)
                }
            }

        }
    }

    return (
        <div className="loginform">
            <form onSubmit={(event) => handleSubmit(event)}>
                <h2 className="headerTitle">Login</h2>
                <div className="row">
                    <label>Username</label>
                    <input
                        placeholder="username"
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => onchangeForm(e)}
                    />
                </div>

                <div className="row position-relative" >
                    <label>Password</label>
                    <input
                        placeholder="password"
                        id="password"
                        name="password"
                        type={showPassWord ? 'text' : 'password'}
                        className="form-control"
                        value={password}
                        onChange={(e) => onchangeForm(e)}
                    />
                    <span onClick={handleShowHidePass} className="show-pass">
                        <i className={showPassWord ? 'far fa-eye-slash' : 'far fa-eye'}/>
                    </span>
                </div>
                <div className="row">
                    <label style={{color: 'red',paddingLeft: '3.5rem'}}>
                        {errMessage}
                    </label>
                </div>
                <div className="form-group login row">
                    <button
                        id="btnLogin"
                        type="submit"
                        className="btn"
                    >Login</button>
                </div>
                <div id="alternativeLogin">
                    <label>Or sign in with:</label>
                    <div id="iconGroup">
                        <a href="#" className="facebookIcon">
                            <img className='w-100 h-100' src='https://cdn.cdnlogo.com/logos/f/84/facebook.svg' alt=''/>
                        </a>
                        <a href="#" className="facebookIcon">
                            <img className='w-100 h-100' src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt=''/>
                        </a>
                    </div>
                </div>
            </form>
        </div>

    )

}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

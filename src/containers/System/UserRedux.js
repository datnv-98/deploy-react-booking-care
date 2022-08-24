import React, { Component } from 'react';
import { connect } from 'react-redux';
const UserRedux = () => {
    return (
        <div className="user-redux-container">
            <div className="text-center">
                Manage user redux
            </div>
            <div className="user"></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

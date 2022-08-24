import React, {useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/images/co-xuong-khop.png'
import * as PropTypes from "prop-types";
import HandBook from "./HandBook";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import {history} from "../../../redux";
import {languages} from "../../../utils";

const Specialty = ({ settings, fetchAllSpecialty, allSpecialty}) => {
    
    useEffect(() => {
        fetchAllSpecialty()
    },[])
    return (
        <div className="section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <h4>Chuyên khoa phổ biển</h4>
                    <button className="btn btn-default">Xem thêm</button>
                </div>
                <div className="specialty-body">
                    <Slider {...settings}>
                        { allSpecialty && allSpecialty.map((data, index) => {
                            let imageBase64 = '';
                            if(data.image) {
                                imageBase64 = new Buffer(data.image, 'base64'). toString('binary')
                            }
                            return(
                                <div onClick={() => history.push(`/details-specialty/${data.id}`)} key={index} className="item-carousel">
                                    <div className="background-img-doctor">
                                        <img src={imageBase64} alt=""/>
                                    </div>
                                    <div className="text-center pt-3 name-main">
                                        {data.name}
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
};
Specialty.propTypes = {
    settings: PropTypes.object,
}
const mapStateToProps = state => {
    return {
        allSpecialty: state.admin.allSpecialty,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

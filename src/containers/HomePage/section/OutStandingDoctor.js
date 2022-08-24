import React, {useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import {languages} from "../../../utils";
import './Section.scss'
import { history } from '../../../redux'
import * as PropTypes from "prop-types";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../assets/images/loading.gif";

function OutStandingDoctor (props){
    const {loadTopDoctor, dataDoctors, lang, settings, isLoading} = props
    useEffect( ()=> {
        loadTopDoctor()
    },[])

    // khi thieu data thi gop lai de k vo layout
    // dataDoctors = dataDoctors.concat(dataDoctors).concat(dataDoctors)
    return (
        <div className="section-specialty">
            {isLoading ? (<LoadingScreen bgColor="rgba(255,255,255,0.5)" children='' loading={true} logoSrc={spinner}/>) : (
            <div className="section-container">
                <div className="section-header">
                    <h4>Bác sĩ nổi bật</h4>
                    <button className="btn btn-default">Xem thêm</button>
                </div>
                <div className="specialty-body">
                    <Slider {...settings}>
                        { dataDoctors && dataDoctors.map((data, index) => {
                            let imageBase64 = '';
                            if(data.image) {
                                imageBase64 = new Buffer(data.image, 'base64'). toString('binary')
                            }
                            return(
                                <div onClick={() => history.push(`/details-doctor/${data.id}`)} key={index} className="item-carousel">
                                    <div className="background-img-doctor">
                                        <img src={imageBase64} alt=""/>
                                    </div>
                                    <div className="text-center pt-3 name-main">
                                        {lang === languages.VI ? data.positionData.valueVi : data.positionData.valueEn },
                                        {data.firstName} {data.lastName}
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>)}
        </div>
    )
};

OutStandingDoctor.propTypes = {
    settings: PropTypes.object,
}


const mapStateToProps = state => {
    return {
        dataDoctors: state.admin.dataDoctors,
        lang: state.app.language,
        isLoading: state.admin.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       loadTopDoctor: () => dispatch(actions.fetchTopdoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

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

const MedicalFacillity = ({settings, allClinic, fetchAllClinic }) => {
    useEffect(() => {
        fetchAllClinic()
    },[])
    return (
        <div className="section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <h4>Phòng khám nổi bật</h4>
                    <button className="btn btn-default">Xem thêm</button>
                </div>
                <div className="specialty-body">
                    <Slider {...settings}>
                        { allClinic && allClinic.map((data, index) => {
                            let imageBase64 = '';
                            if(data.image) {
                                imageBase64 = new Buffer(data.image, 'base64'). toString('binary')
                            }
                            return(
                                <div onClick={() => history.push(`/details-clinic/${data.id}`)} key={index} className="item-carousel">
                                    <div className="">
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
MedicalFacillity.propTypes = {
    settings: PropTypes.object,
}
const mapStateToProps = state => {
    return {
        allClinic: state.admin.allClinic,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinic())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacillity);

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/images/co-xuong-khop.png'
import * as PropTypes from "prop-types";

const HandBook = ({settings}) => {
    return (
        <div className="section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <h4>Cẩm nang</h4>
                    <button className="btn btn-default">Xem thêm</button>
                </div>
                <div className="specialty-body">
                    <Slider {...settings}>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt='' />
                            <div>Cơ xương khớp 1</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt='' />
                            <div>Cơ xương khớp 2</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt='' />
                            <div>Cơ xương khớp 3</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt=''/>
                            <div>Cơ xương khớp 4</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt=''/>
                            <div>Cơ xương khớp 5</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt=''/>
                            <div>Cơ xương khớp 6</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt=''/>
                            <div>Cơ xương khớp 7</div>
                        </div>
                        <div className="item-carousel">
                            <img src={specialtyImg} alt='' />
                            <div>Cơ xương khớp 8</div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
};
HandBook.propTypes = {
    settings: PropTypes.object,
}

export default HandBook;

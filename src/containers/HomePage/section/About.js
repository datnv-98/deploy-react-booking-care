import React from "react";

const About = ({ }) => {
    return (
        <div className="section-specialty" style={{height: '400px'}}>
            <div className="section-container">
                <h4 className="pb-3">Truyền thông nói về BookingCare</h4>
                <div className='d-flex'>
                    <iframe width="50%" height="320" src="https://www.youtube.com/watch?v=7tiR7SI4CkI">
                    </iframe>
                    <i style={{width: '50%', paddingLeft: '30px'}}>Giải pháp của BookingCare là xây dựng nền tảng công nghệ kết nối mạng lưới bác sĩ giỏi và các cơ sở y tế uy tín với thông tin được xác thực rõ ràng, cập nhật. Ứng dụng công nghệ giúp người bệnh dễ dàng lựa chọn đúng bác sĩ chuyên khoa phù hợp với vấn đề của mình và Đặt lịch khám.</i>
                </div>
            </div>
        </div>
    )
};

export default About;

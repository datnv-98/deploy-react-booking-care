import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import '../Admin/AdminCommon.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {CommonUtils} from "../../../utils";
import {Input} from "reactstrap";
import Lightbox from "react-image-lightbox";
import {createSpecialty} from "../../../services/userService";
import {toast} from "react-toastify";

const ManageSpecialty = ({lang}) => {
    const [preview, setPreview] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        descriptionMarkdown:'',
        descriptionHTML: '',
        imageBase64: '',
        name: ''
    })
    const [hasMarkdown,setHasMarkdown ] = useState(false)
    const {descriptionMarkdown, descriptionHTML, name} = formData

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    function handleEditorChange({ html, text }) {
        setFormData({
            ...formData,
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    function handleOnChangeText (e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    async function handleSaveDescriptionMarkdown() {
        console.log('data', formData)
        let response = await createSpecialty(formData)
        console.log('response', response)
        if (response && response.errCode === 0) {
            toast.success('Create new specialty success')
        }
        setFormData({
            descriptionMarkdown:'',
            descriptionHTML: '',
            imageBase64: '',
            name: ''
        })
        setPreview('')
    }
    const onSelectFile = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            setFormData({
                ...formData,
                imageBase64: base64
            })
        }
    }
    const openPreviewImg = () => {
        if (!preview) return;
        setIsOpen(true)
    }

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-header">
                <h2>Tạo mới chuyên khoa</h2>
            </div>
            <div className="more-info-top d-flex justify-content-between">
                <div className="content-left form-group">
                    <label className="validate">Tên chuyên khoa:</label>
                    <Input
                        autoComplete="off"
                        value={name}
                        name="name"
                        type="text"
                        onChange={handleOnChangeText}
                    />
                </div>
                <div className="col-5 p-0">
                    <Input onChange={onSelectFile} type="file" name="imageBase64" id="previewImg"
                           hidden/>
                    <label className="custom-upload-img" htmlFor="previewImg">Ảnh chuyên khoa <i
                        className="fas fa-upload"/></label>
                    <div onClick={openPreviewImg} className="preview-image">
                        <img src={preview} alt=''/>
                    </div>
                    {isOpen && (
                        <Lightbox
                            mainSrc={preview}
                            onCloseRequest={() => setIsOpen(false)}
                        />
                    )}
                </div>

            </div>
            <div className="manage-doctor-editor">
                <label className="validate">Giới thiệu chuyên khoa</label>
                <MdEditor
                    style={{ height: '450px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={descriptionMarkdown}
                />
            </div>
            <button onClick={handleSaveDescriptionMarkdown} className="mt-3 btn btn-primary float-right">{hasMarkdown ? 'Lưu thông tin':'Tạo thông tin'}</button>
        </div>
    )
}
ManageSpecialty.propTypes = {

}
const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
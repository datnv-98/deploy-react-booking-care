import {languages} from "./constant";

class CommonUtils {
    static isNumber1 (number) {
        return number === 1;

    }
    static getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error)
        });
    }
    static buildDataInputSelect = (inputData, lang, type) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            if(type === 'USERS') {
                inputData.map((item,index) => {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = lang === languages.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            // tachs tiền ra để format VND/ Dollar
            if(type === 'PRICE' ) {
                inputData.map((item,index) => {
                    let object = {};
                    const formatVND = parseInt(item.valueVi).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
                    const formatDollar = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(item.valueEn)
                    object.label = lang === languages.VI ? formatVND: formatDollar
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if(type === 'PAYMENT' || type === 'PROVINCE' ) {
                inputData.map((item,index) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn
                    object.label = lang === languages.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if(type === 'SPECIALTY' || type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }


        }
        return result
    }
    static formatVND = (item) => {
        return parseInt(item).toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
    }

    static formatDollar = (item) => {
        return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(item)

    }
}

export default CommonUtils;
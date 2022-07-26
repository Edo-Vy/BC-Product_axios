/**
 * Hàm kiểm tra rỗng dựa vào giá trị người dùng nhập
 * @param {*} value value là giá trị người dùng nhập
 * @param {*} selectorError selector hiển thị lỗi cho giá trị đó
 * @param {*} name tên thuộc tính bị lỗi khi hiển thị
 * @returns trả về giá trị hợp lệ (true) hoặc không hợp lệ (false);
 */
 function kiemTraRong(value, selectorError, name) {
    if (value === '') {
        document.querySelector(selectorError).innerHTML = name + 'không được bỏ trống!';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true
}

                //  'nguyen van teo 123'
function kiemTraTatCaKyTu (value,selectorError,name) {
    var regexLetter = /^[A-Z a-z]+$/; //Nhập các kí tự a->z A->Z hoặc khoảng trống không bao gồm unicode
    if(regexLetter.test(value)){ //test nếu ok false
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' phải là chữ cái !';
    return false;
}

function kiemTraEmail (value,selectorError,name) {
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regexEmail.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng !';
    return false;

}

function kiemTraSo(value,selectorError,name) {
    var regexNumber =  /^[0-9]+$/; 
    if(regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    
    document.querySelector(selectorError).innerHTML = name + ' tất cả là số';
    return false;
}

//            'nguyen van a'   '#errorId''hoTen'  6        32
function kiemTraDoDai (value,selectorError,name,minLength,maxLength){
    if(value.length < minLength || value.length > maxLength) {
        document.querySelector(selectorError).innerHTML = name +' từ ' + minLength + ' đến ' + maxLength + ' ký tự!';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}
//'51'
function kiemTraGiaTri (value,selectorError,name,minValue,maxValue) {
    if(Number(value) < minValue || Number(value) > maxValue ) {
        document.querySelector(selectorError).innerHTML = name + ' giá trị từ ' + minValue + ' đến ' +maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}
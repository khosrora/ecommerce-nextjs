const valid = (name, email, phoneNumber, password, confirmPassword) => {

    if (!name || !email || !password || !phoneNumber)
        return "لطفا تمام مقادیر را وارد کنید";

    if (!validateEmail(email))
        return "پست الکترونیک اشتباه وارد شده است"

    if (!validatePhoneNumber(phoneNumber))
        return " شماره همراه اشتباه وارد شده است"

    if (password.length < 6)
        return "کلمه عبور خود را بیشتر از 6 کاراکتر وارد کنید"

    if (password !== confirmPassword)
        return "تایید کلمه عبور اشتباه است"

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const re = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
    return re.test(phoneNumber);
}



export default valid
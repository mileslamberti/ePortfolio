const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}
const isEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regex)) return true;
    else return false;
}

const isUrl = (url) => {
    regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    
    if(url.match(regexp)) return true
    else return false;
}

exports.validateSignUp = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = 'Email must not be empty'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be Valid email address'
    }

    if (isEmpty(data.password)) errors.password = 'Must not be empty'
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match'
    if (isEmpty(data.handle)) errors.handle = 'Must not be empty'
    if (Object.keys(errors).length > 0) return res.status(400).json(errors)


    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}


exports.validateLogin = (data) => {
    let errors = {}
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors)

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.reduceUserDetails = (data)=> {
    let userDetails = {};

    //check if exist first if required
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio
    if(!isEmpty(data.website.trim())){
        if(data.website.trim().substring(0,4) !== 'http'){
            userDetails.website = `http://${data.website.trim()}`;
        }else{
         userDetails.website = data.website;   
        }
    }
    if(!isEmpty(data.location.trim())) userDetails.location = data.location;
    return userDetails;
}
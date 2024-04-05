import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// generate token for  jwt authentication
export const tokenGenrate = (_id, expiresIn) => {
    const token = jwt.sign({ _id }, process.env.TOKENKEY, { expiresIn: expiresIn });
    return token;
};
// verify token for jwt authentication
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKENKEY);
}
// bcrypt password
export const hashPassword = async (password) => {
    const bcryptpassword = await bcrypt.hash(password, 10);
    return bcryptpassword;
};
// compare password
export const comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};
// email address validation
export const emailValidation = (email) => {
    const emailValidation = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]+.[a-z0-9]{2,}$/;
    const emailValcheck = emailValidation.test(email);
    return emailValcheck;
}
// mobile number validation
export const mobileValidation = (mobile) => {
    const mobileValidation = /^[0-9]{10,12}$/;
    const mobilevalcheck = mobileValidation.test(mobile)
    return mobilevalcheck;
}
// password validation
export const passwordValidate = (password) => {
    const passwordValidate = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$\/\!#%*^?&])[a-zA-Z0-9\d@$\/\!#^%*?&]{8,}/;
    const passwordvalcheck = passwordValidate.test(password);
    return passwordvalcheck;
}

//otp generation
export const generateOTP = (n) => {
    n |= 5;
    return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

// add minutes
export const addMinutes = (date, minutes) => {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};

// add days
export const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
};

//create hash password
function create_hash(data, accesskey, secretkey) {
    data = ksort(data);
    let hash_string = accesskey;
    Object.keys(data).forEach(function (key) {
        hash_string += "|" + data[key];
    });
    var cryp = crypto.createHash("sha256", secretkey);
    cryp.update(hash_string);
    return cryp.digest("hex");
}

//verify hashed
function verify_hash(data, rec_hash, accesskey, secretkey) {
    var gen_hash = create_hash(data, accesskey, secretkey);
    if (gen_hash === rec_hash) {
        return true;
    }
    return false;
}

//ksort
function ksort(obj) {
    var keys = Object.keys(obj).sort(),
        sortedObj = {};

    for (var i in keys) {
        sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
}





import expressValidator from 'express-validator';

const objectId = require('mongodb').ObjectID;

module.exports = () => expressValidator({
    customValidators: {
        isObjectId: (value) => {
            return objectId.isValid(value);
        },
        isArrayObjectId: (value) => {
            return value.reduce((result, iteam) => {
                return result && objectId.isValid(iteam)
            }, true);
        }
    }
});
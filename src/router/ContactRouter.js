import {Router} from "express";
import ValidationError from '../error/ValidationError';

export default ({contactController}) =>
    Router()
        .post('/', validatePost, contactController.post)
        .put('/', contactController.update)
        .delete('/:id', validateDelete, contactController.delete)
        .get('/', contactController.getAll)
        .get('/:id', validateGet, contactController.get);


function validatePost(req, res, next) {
    req.checkBody({
        email: {
            isEmail: {
                errorMessage: 'Invalid email.'
            }
        },
    });
    return req
        .getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                return next();
            }
            throw new ValidationError({result});
        })
        .catch((err) => {
            return next(err)
        });
}


function validateUpdate(req, res, next) {
    req.checkBody({
        name: {
            notEmpty: {
                errorMessage: 'Name is required.'
            }
        },
        email: {
            isEmail: {
                errorMessage: 'Invalid email.'
            }
        },
    });
    return req
        .getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                return next();
            }
            throw new ValidationError({result});
        })
        .catch((err) => {
            return next(err)
        });
}

function validateGet(req, res, next) {
    req.checkParams({
        id: {
            isObjectId: {
                errorMessage: "Invalid Id"
            }
        }
    });
    return req
        .getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                return next();
            }
            throw new ValidationError({result});
        })
        .catch((err) => {
            return next(err)
        });
}

function validateDelete(req, res, next) {
    req.checkParams({
        id: {
            isObjectId: {
                errorMessage: "Invalid Id"
            }
        }
    });
    return req
        .getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                return next();
            }
            throw new ValidationError({result});
        })
        .catch((err) => {
            return next(err)
        });
}


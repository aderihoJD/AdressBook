import {Router} from "express";
export default ({contactController}) =>
    Router()
        .post('/', contactController.post)
        .put('/', contactController.update)
        .delete('/:id', validateDelete, contactController.delete)
        .get('/', contactController.getAll)
        .get('/:id', validateGet, contactController.get);

function validateGet(req,res,next){
    req.checkParams({
        'id': {
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
            throw new ValidationError(result);
        })
        .catch((err) => {
            return next(err)
        });
}

function validateDelete(req,res,next){
    req.checkParams({
        'id': {
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
            throw new ValidationError(result);
        })
        .catch((err) => {
            return next(err)
        });
}



import Promise from 'bluebird';

import ValidationError from '../error/ValidationError';
import UserNotExistErro from '../error/UserNotExistError';

import logger from '../lib/logger';
import UserNotExistError from "../error/UserNotExistError";

module.exports = () => (err, req, res, next) => {
    return Promise
        .reject(err)
        .catch(ValidationError, (err) => {
            return res.status(400).json({validationResult: err.result.mapped(), name: err.name, message: err.message, stack: err.stack});
        })
        .catch(UserNotExistError, (err) => {
            logger.warn(err);
            return res.status(422).json({name: err.name, message: err.message, stack: err.stack});
        })
        .catch((err) => {

            logger.error(err);
            return res.status(500).json(err);
        })
};
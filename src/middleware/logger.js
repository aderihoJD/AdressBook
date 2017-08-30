import expressWinston from 'express-winston';
import logger from '../lib/logger'

export default () => expressWinston.logger({
    winstonInstance: logger,
});
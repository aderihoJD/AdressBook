import util from 'util';

function ValidationError({result, message="Server error!!!"}) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.result = result;
}

util.inherits(ValidationError, Error);
export default ValidationError;
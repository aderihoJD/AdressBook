import util from 'util';

function ValidationError({message="Server error!!!"}) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
}

util.inherits(ValidationError, Error);
export default ValidationError;
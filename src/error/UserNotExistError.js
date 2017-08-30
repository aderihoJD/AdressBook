import util from 'util';

function UserNotExistError({message="User does't exist"}) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
}

util.inherits(UserNotExistError, Error);
export default UserNotExistError;
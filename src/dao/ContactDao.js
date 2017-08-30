import UserNotExistError from "../error/UserNotExistError";

function ContactDao ({Contact}){
    this.get = ({id}) => {
        return Contact.findById(id).lean().exec()
            .then((mUser) => {
            if (!mUser) {
                throw new UserNotExistError();
            }
                return mUser;
            });
    };

    this.save = ({contact}) => {

        return new Contact(contact).save()
            .then((mContact)=>{
                return mContact.toObject();
            })
    };

    this.getAll = () => {
        return Contact.find().lean().exec();
    };

    this.update = ({contact}) => {
        return Contact.findByIdAndUpdate(contact._id, {$set:contact}, {new:true}).lean().exec()
            .then((mUser)=>{
            if (!mUser) {
                throw new UserNotExistError();
            }
            return mUser;
            });
    };

    this.delete = ({id}) => {
        return Contact.findByIdAndRemove(id).lean().exec()
            .then((mUser)=>{
                if (!mUser) {
                    throw new UserNotExistError();
                }
                return mUser;
            });
    };
}

export default ContactDao;
function ContactService({contactDao}){

    this.get = ({id}) => {
        return contactDao.get({id});
    }

    this.post = ({contact}) => {
        return contactDao.save({contact});
    }

    this.getAll = () => {
        return contactDao.getAll();
    }

    this.update = ({contact}) => {
        return contactDao.update({contact});
    }

    this.delete = ({id}) => {
        return contactDao.delete({id});
    }

}

export default ContactService;
function ContactController({contactService}) {

    this.get = (req, res, next) => {
        return contactService
            .get({id: req.params.id})
            .then((contact) => {
                return res.status(200)
                    .json(contact);
            })
            .catch(next);
    };

    this.post = (req, res, next) => {
        return contactService
            .save({contact: req.body})
            .then((contact) => {
                return res.status(200)
                    .json(contact);
            })
            .catch(next);
    };

    this.getAll = (req, res, next) => {
        return contactService
            .getAll()
            .then((contacts) => {
                return res.status(200)
                    .json(contacts);
            })
            .catch(next);
    };

    this.update = (req, res, next) => {
        return contactService
            .update({contact: req.body})
            .then((contact) => {
                return res.status(200)
                    .json(contact);
            })
            .catch(next);
    };

    this.delete = (req, res, next) => {
        return contactService
            .delete({id: req.params.id})
            .then((contact) => {
                return res.status(200)
                    .json(contact);
            })
            .catch(next);
    };
}

export default ContactController;
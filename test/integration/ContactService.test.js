import chai from 'chai';
import shortid from 'shortid';

import '../../src/lib/mongoose';
import Contact from '../../src/model/Contact';
import ContactDao from '../../src/dao/ContactDao';
import ControlDao from '../../src/dao/ControlDao';
import ContactService from '../../src/service/ContactService';

const expect = chai.expect;

describe('Test ContactService', () => {

    const contactDao = new ContactDao({Contact});
    const controlDao = new ControlDao({Contact});
    const contactService = new ContactService({contactDao});

    beforeEach((done) => {
        controlDao
            .clearDb()
            .then(() => (done()))
            .catch(done);
    });

    describe('#post', () => {

        it('should save and return contact', (done) => {
            const name = shortid.generate();
            const email = "ilya@mail.ru";
            const phone_number = "+375-25-793-76-17";
            contactService
                .save({contact: {name, email, phone_number}})
                .then((contact) => {
                    expect(contact).to.have.property("_id");
                    expect(contact).to.have.property("name", name);
                    expect(contact).to.have.property("email", email);
                    expect(contact).to.have.property("phone_number", phone_number);
                    done();
                })
                .catch(done)
        });

    });

});
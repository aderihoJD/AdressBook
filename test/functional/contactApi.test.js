import chai from "chai";
import chaiHttp from "chai-http";
import config from "config";
import shortid from "shortid";
import Promise from 'bluebird';

import "../../src/main";


chai.use(chaiHttp);
const expect = chai.expect;

const port = config.get("server.port");

describe("Contact API test", () => {

    beforeEach((done)=>{
        chai
            .request(`http://localhost:${port}`)
            .delete('/api/control/mongoDb')
            .then(()=>(done()))
            .catch(done);
    });

    describe("#POST /api/contact", () => {
        it("should create a new contact", (done) => {
            const name = shortid.generate();
            const email = "ilya@mail.ru";
            const phone_number = "+375-25-793-76-17";
            chai
                .request(`http://localhost:${port}`)
                .post('/api/contact')
                .send({name, email, phone_number})
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("_id");
                    expect(res.body).to.have.property("name", name);
                    expect(res.body).to.have.property("email", email);
                    expect(res.body).to.have.property("phone_number", phone_number);
                    done();
                })
                .catch(done);
        });

        it("should return 400 code error when send contact without name", (done) => {
            const email = "ilya@mail.ru";
            const phone_number = "+375-25-793-76-17";
            chai
                .request(`http://localhost:${port}`)
                .post('/api/contact')
                .send({email, phone_number})
                .catch((err) => {
                    expect(err).to.have.status(400);
                    expect(err.response.body).to.have.property('name', 'ValidationError');
                    expect(err.response.body).to.have.property('validationResult');
                    expect(err.response.body.validationResult).to.have.property('name');
                    done();
                })
                .catch(done);
        });

    });

    describe("#GET /api/contact/:id", () => {
        it("should find contact by id", (done) => {
            const name = shortid.generate();
            const email = "ilya@mail.ru";
            const phone_number = "+375-25-793-76-17";
            chai
                .request(`http://localhost:${port}`)
                .post('/api/contact')
                .send({name, email, phone_number})
                .then((res) => {
                    return chai
                        .request(`http://localhost:${port}`)
                        .get(`/api/contact/${res.body._id}`)
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("_id");
                    expect(res.body).to.have.property("name", name);
                    expect(res.body).to.have.property("email", email);
                    expect(res.body).to.have.property("phone_number", phone_number);
                    done();
                })
                .catch(done);
        })
    });

    describe("#PUT /api/contact", () => {

        it("should find contact and replace it", (done) => {
            const name = shortid.generate();
            const email = "ilya@mail.ru";
            const phone_number = "+375-25-793-76-17";
            const newName = shortid.generate();
            const newEmail = "igar@mail.ru";
            const newPhone_number = "+375-25-793-76-10";

            chai
                .request(`http://localhost:${port}`)
                .post('/api/contact')
                .send({name, email, phone_number})
                .then((res) => {
                    return chai
                        .request(`http://localhost:${port}`)
                        .put(`/api/contact`)
                        .send({_id: res.body._id, name: newName, email: newEmail, phone_number: newPhone_number})
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("_id");
                    expect(res.body).to.have.property("name", newName);
                    expect(res.body).to.have.property("email", newEmail);
                    expect(res.body).to.have.property("phone_number", newPhone_number);
                    done();
                })
                .catch(done);

        });

        describe("#DELETE /api/contact/:id", () => {
            it("should find contact and remove it", (done) => {
                const name = shortid.generate();
                const email = "ilya@mail.ru";
                const phone_number = "+375-25-793-76-17";

                chai
                    .request(`http://localhost:${port}`)
                    .post('/api/contact')
                    .send({name, email, phone_number})
                    .then((res) => {
                        return chai
                            .request(`http://localhost:${port}`)
                            .delete(`/api/contact/${res.body._id}`)
                    })
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property("_id");
                        expect(res.body).to.have.property("name", name);
                        expect(res.body).to.have.property("email", email);
                        expect(res.body).to.have.property("phone_number", phone_number);
                        return chai
                            .request(`http://localhost:${port}`)
                            .get(`/api/contact/${res.body._id}`)
                    })
                    .catch((err) => {
                        expect(err).to.have.status(422);
                        done();
                    })
                    .catch(done);
            })
        });

        describe('"#GET /api/contact"', () => {

            it('should return all saved contacts', (done) => {
                const firstName = shortid.generate();
                const secondName = shortid.generate();
                const thirdName = shortid.generate();
                const firstEmail = 'sasha@gmail.com';
                const secondEmail = 'vania@mail.ru';
                const thirdEmail = 'katia@gbox.com';
                const firstPhoneNumber = '+375291534564';
                const secondPhoneNumber = '+375449376784';
                const thirdPhoneNumber = '+375331556564';
                Promise
                    .all([
                        chai
                            .request(`http://localhost:${port}`)
                            .post('/api/contact')
                            .send({name: firstName, email: firstEmail, phone_number: firstPhoneNumber}),
                        chai
                            .request(`http://localhost:${port}`)
                            .post('/api/contact')
                            .send({name: secondName, email: secondEmail, phone_number: secondPhoneNumber}),
                        chai
                            .request(`http://localhost:${port}`)
                            .post('/api/contact')
                            .send({name: thirdName, email: thirdEmail, phone_number: thirdPhoneNumber}),
                    ])
                    .then(() => {
                        return chai
                            .request(`http://localhost:${port}`)
                            .get('/api/contact')
                    })
                    .then((res)=>{
                        expect(res.body).to.have.lengthOf(3);
                        done();
                    })
                    .catch(done);

            });

        });
    })

});
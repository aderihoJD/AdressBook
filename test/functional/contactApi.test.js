import chai from "chai";
import chaiHttp from "chai-http";
import config from "config";
import shortid from "shortid";

import "../../src/main";


chai.use(chaiHttp);
const expect = chai.expect;

const port = config.get("server.port");

describe("Contact API test",()=>{

    describe("#POST /api/contact", ()=>{

        it("shoud create a new contact", (done)=>{
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

        describe("#GET /api/contact/:id", ()=> {

            it("shoud find contact by id", (done) => {
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
        })

    })
    describe("#PUT /api/contact", ()=> {

        it("shoud find contact and replace it", (done) => {
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
                        .send({_id:res.body._id,name:newName, email:newEmail, phone_number:newPhone_number})
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

        })


})


});
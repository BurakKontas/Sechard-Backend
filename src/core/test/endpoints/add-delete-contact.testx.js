import { agent } from "supertest";
import Contact from '../../entities/contact';

var server = agent("http://localhost:3570");
describe("/contact/addContact unit test", () => {
  var contact = new Contact({
    user: "6392150338d1d848819fc5e8",
    phones:"+905326278076",
    name:"Hello worldd",
    addresses:"Edirne",
});

  beforeAll(() => {
    server
    .post("/contact/addContact")
    .set('Content-type', 'application/json')
  //.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
    .send(contact)
    .expect(201)
    .end(function (err, res) {
      if(res.status != 201) throw JSON.parse(res.text)
   });
  },10000)

  it("should add contact and delete afterwards", (done) => {
    setTimeout(() => {
      //wait
      done()
    },3000)
  },10000);

  afterAll(() => {
    server
    .post("/contact/deleteContact")
    .set('Content-type', 'application/json')
  //.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
    .send({
      name:"Hello worldd",
      userid:"6392150338d1d848819fc5e8"
    })
    .expect(201)
    .end(function (err, res) {
      if(res.status != 200) throw JSON.parse(res.text)
    });
  },10000)
});

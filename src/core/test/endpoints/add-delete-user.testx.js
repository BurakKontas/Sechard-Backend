import { agent } from "supertest";

var server = agent("http://localhost:3570");
describe("/user/addUser unit test", () => {
  var user;

  beforeAll(() => {
    server
    .get("/user/addUser")
  //.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
    .expect(201)
    .end(function (err, res) {
       if(res.status != 201) throw JSON.parse(res.text)
       user = JSON.parse(res.text).user;
   });
  })

  it("should add user and delete afterwards", (done) => {
    setTimeout(() => {
      //wait
      done();
    })
  });

  afterAll(() => {
    server
    .post("/user/deleteUser")
    .set('Content-type', 'application/json')
  //.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
    .send({
      id:user._id,
    })
    .expect(201)
    .end(function (err, res) {
      if(res.status != 200) throw JSON.parse(res.text)
    });
  })
},10000);

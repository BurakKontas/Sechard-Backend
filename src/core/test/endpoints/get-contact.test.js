import { agent } from "supertest";

var server = agent("http://localhost:3570");
describe("/contact/getcontact", () => {
  it("get one contact of 6392150338d1d848819fc5e8", (done) => {
    server
    .post("/contact/getContact")
    .send({
     userid:"6392150338d1d848819fc5e8",
     name:"Arda Burak"
    })
    .expect(200)
    .end(function (err, res) {
     done();
     if(res.status != 200) throw JSON.parse(res.text)
   });
  });
});


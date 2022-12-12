import { agent } from "supertest";

var server = agent("http://localhost:3570");
describe("/contact/searchcontact", () => {
  it("get every contact of 6392150338d1d848819fc5e8 starts with M", (done) => {
    server
    .post("/contact/searchContacts")
    .send({
     userid:"6392150338d1d848819fc5e8",
     text:"m"
    })
    .end(function (err, res) {
      done();
      if(res.status != 200) throw JSON.parse(res.text)
   });
  });
});


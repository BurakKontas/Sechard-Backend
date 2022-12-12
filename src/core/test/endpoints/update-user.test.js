import { agent } from "supertest";

var server = agent("https://sechard-contacts.herokuapp.com/");
describe("/user/updateuser test", () => {

  it("should update contact", (done) => {
      server
      .put("/user/updateuser")
      .send({
       userid:"2f4085d37d3acd33847dad98c34408c4",
       dictionary:["123","456",789]
      })
      .end(function (err, res) {
        done();
        if(res.status != 200) throw JSON.parse(res.text)
     });
  });
});


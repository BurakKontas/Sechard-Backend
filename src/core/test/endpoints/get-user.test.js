import { agent } from "supertest";

var server = agent("https://sechard-contacts.herokuapp.com/");
describe("/user/getuser/:userid test", () => {
  it("should return user 6392150338d1d848819fc5e8", (done) => {
     server
       .get("/user/getuser/6392150338d1d848819fc5e8")
       .expect(200)
       .end(function (err, res) {
        done();
        if(res.status != 200) throw JSON.parse(res.text)
      });
    });
  });
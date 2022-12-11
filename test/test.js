import { agent } from "supertest";

var server = agent("http://localhost:5000");
describe("SAMPLE unit test", () => {
  it("should return home page", (done) => {
     server
       .get("/")
       .expect("Content-type", /text/)
       .expect(200)
       .end(function (err, res) {
        done();
      });
  });
});

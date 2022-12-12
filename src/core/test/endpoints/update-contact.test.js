import { agent } from "supertest";
import Contact from './../../entities/contact';

var server = agent("http://localhost:3570");
describe("/contact/updatecontact test", () => {
    var contact = new Contact({
        user: "6392150338d1d848819fc5e8",
        phones:"+905326278076",
        name:"BurakKontas",
        addresses:"Edirne",
    });
    
  it("should update contact", (done) => {
      server
      .put("/contact/updatecontact")
      .send({
       newContact:contact,
       oldName:"BurakKontas"
      })
      .end(function (err, res) {
        done();
        if(res.status != 200) throw JSON.parse(res.text)
     });
  });
},15000);


import ValidateModel from "../../helpers/validateModels";

import User from "../../entities/user";
import Contact from "../../entities/contact";

describe('mongoose models validation helper test', () => {

    test('empty user model should throw error', async () => {
        var user = new User({});
    
        expect(await ValidateModel(user)).not.toBe({error:false});
    })
    
    test('empty contact model should throw error', async () => {
        var contact = new Contact({});
    
        expect(await ValidateModel(contact)).not.toBe({error:false});
    })
})


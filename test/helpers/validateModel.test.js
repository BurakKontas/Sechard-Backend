import ValidateModel from "../../src/core/helpers/validateModels";

import User from "../../src/core/entities/user";
import Contact from "../../src/core/entities/contact";

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


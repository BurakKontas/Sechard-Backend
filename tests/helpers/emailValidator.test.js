import ValidateEmail from "../../helpers/emailValidator.js";

test('aburakkontas@trakya.edu.tr should be valid email', () => {
    expect(ValidateEmail("aburakkontas@trakya.edu.tr")).toBe(true);
})


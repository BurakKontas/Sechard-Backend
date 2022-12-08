import ValidateEmail from "../../helpers/emailValidator.js";

test('test@test.com should be valid email', () => {
    expect(ValidateEmail("test@test.com")).toBe(true);
})


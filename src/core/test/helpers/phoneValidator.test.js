import ValidatePhone from "../../helpers/phoneValidator.js";

test('+905551234567 should be valid phone', () => {
    expect(ValidatePhone("+905551234567")).toBe(true);
})


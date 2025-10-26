const { validatePassword } = require('../utils/authUtils');

describe("Validate Password", () => {

    it("should fail password validation when the password has less than 8 characters", async () => {
        const password = "abCd123"
        const res = validatePassword(password);

        expect(res).toHaveLength(1);
        expect(res).toContain("must be at least 8 characters long");
    });

    it("should fail password validation when the password does not contain a lowercase letter", async () => {
        const password = "ABCD1234"
        const res = validatePassword(password);

        expect(res).toHaveLength(1);
        expect(res).toContain("must include a lowercase letter");

    });

    it("should fail password validation when the password does not contain an uppercase letter", async () => {
        const password = "abcd1234"
        const res = validatePassword(password);

        expect(res).toHaveLength(1);
        expect(res).toContain("must include an uppercase letter");
    });

    it("should fail password validation when the password does not contain a number", async () => {
        const password = "abcdEFGH"
        const res = validatePassword(password);

        expect(res).toHaveLength(1);
        expect(res).toContain("must include a number");
    });

    it("should pass password validation when the password meets all criteria", async () => {
        const password = "abCD1234"
        const res = validatePassword(password);
        expect(res).toHaveLength(0);
    });


    //100% statement coverage = แต่ละ if ถูก “execute” อย่างน้อยหนึ่งครั้ง — ไม่จำเป็นต้องทดสอบทุก combination
});

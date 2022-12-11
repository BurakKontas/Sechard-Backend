import { randomBytes } from 'crypto';

const randomId = () => {
    //random 8 byte 16'lık tabanda bir string oluşturuyor
    const id = randomBytes(8).toString("hex");
    return id;
}

export default randomId;
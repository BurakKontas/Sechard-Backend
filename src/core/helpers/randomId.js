import { randomBytes } from 'crypto';

const randomId = () => {
    //random 16 byte 16'lık tabanda bir string oluşturuyor
    const id = randomBytes(16).toString("hex");
    return id;
}

export default randomId;
import { randomBytes } from 'crypto';

const randomId = () => {
    const id = randomBytes(16).toString("hex");
    return id;
}

export default randomId;
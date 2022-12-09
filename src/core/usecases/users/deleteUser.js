import UsersRepository from "../../contracts/UsersRepository.js"

//expected {id:"123456789"}
const deleteUser = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await UsersRepository.delete(body.id)
}

export default deleteUser;
import UsersRepository from "../../contracts/UsersRepository.js"

const addUser = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await UsersRepository.create(body)
}

export default addUser;
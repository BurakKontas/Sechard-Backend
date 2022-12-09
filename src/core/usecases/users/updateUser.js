import UsersRepository from "../../contracts/UsersRepository.js"

//expected {userid:"123456789",dictionary:[array]}
const updateUser = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await UsersRepository.update(body.dictionary,body.userid)
}

export default updateUser;
import UsersRepository from "../../contracts/UsersRepository.js"

const getUserIds = async () => {
    var ids = await UsersRepository.get({},{dictionary:0,_id:1})
    return ids.map((value) => value._id);
}

export default getUserIds;
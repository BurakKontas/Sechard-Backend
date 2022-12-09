import UsersRepository from "../../contracts/UsersRepository.js"

//http://localhost:3570/user/getUser/6392150338d1d848819fc5e8
const getUser = async (request) => {
    if(request == null) return null;
    var userid = request.params.userid;
    return await UsersRepository.get({_id:userid})
}

export default getUser;
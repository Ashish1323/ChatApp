const Users = require("../schemas/users")
let loginUser = async (request) => {
  const userinfo = await Users.find({email: request.email, password: request.password });
  console.log(userinfo)
  return userinfo
}

let userRegistration = async (params) => {
    let query = {
    	name: params.name,
      displayname: params.displayname,
    	email: params.email,
    	password: params.password
    }   
    let add = new Users(query)
    let result = await add.save()
    return result
}

let userList = async () => {
	const userinfo = await Users.find()
    //console.log(userinfo)
	return userinfo
}


module.exports = {
    loginUser,
    userRegistration, 
    userList
};

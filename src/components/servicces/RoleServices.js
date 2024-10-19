class RoleServices{
    static isAdmin(){
        const role = localStorage.getItem("AldaleelaRole")
        console.log("Role Role Service:", role)
        return role === "admin";
    }

    static isUser(){
        const role = localStorage.getItem("AldaleelaRole")
        return role === "user";
    }
}

export default RoleServices;
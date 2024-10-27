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

    static isAuth(){
        const role = localStorage.getItem("AldaleelaRole")
        return role === "admin" || role === "user";
    }
}

export default RoleServices;
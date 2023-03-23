

export class UserService{
    login = async (reqData:any) => {
        if (reqData.username === "admin" && reqData.password === "Admin@123") {
            return {
                username: "admin",
                name: "Admin",
                role: "admin",
                permissions: []
            }
        } else if (reqData.username === "user" && reqData.password === "User@123") {
            return {
                username: "user",
                name: "Regular User",
                role: "regular-user",
                permissions: ["view-users"]
            }
        } else if (reqData.username === "supervisor" && reqData.password === "Supervisor@123") {
            return {
                username: "supervisor",
                name: "Supervisor",
                role: "supervisor",
                permissions: ["view-users","add-users","edit-users","view-aboutus"]
            }
        } else {
            throw "Invalid username/password";
        }
    }
}
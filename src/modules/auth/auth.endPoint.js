import { roles } from "../../middlewear/auth.js";

export const endPoint = {
    logout : [roles.User, roles.Admin, roles.HR]
}
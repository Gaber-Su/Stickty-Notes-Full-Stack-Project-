import { roles } from "../../middlewear/auth.js";

export const endPoint = {
    profile: [roles.HR, roles.Admin, roles.User]
}
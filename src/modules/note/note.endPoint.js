import { roles } from "../../middlewear/auth.js";

export const endPoint = {
    addNote :[roles.Admin, roles.User],
    deleteNote :[roles.Admin, roles.User]
}
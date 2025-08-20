import { User } from "./user.model"

export type LoginResult = LoginSuccess | LoginError | LoginNotInit;

export type LoginSuccess = {
    type: 'success', 
    user: User, 
}

export type LoginError = {
    type: 'error', 
    reason: 'User Id Not Found' | 'Incorrect Password'
}

export type LoginNotInit = {
    type: 'not-init'
}

import { PartialStateUpdater } from "@ngrx/signals";
import { AuthSlice } from "./auth.slice";
import { User } from "../../models/user.model";

export function login(user: User): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: user, 
        selectedCompanyId: user.companies[0].id
    })
}
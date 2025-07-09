import { PartialStateUpdater } from "@ngrx/signals";
import { AuthSlice } from "./auth.slice";
import { LoginResult, User } from "@contract";

export function loginSuccess(user: User): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: {
            status: 'resolved',
            value: user, 
            error: null
        }, 
        selectedCompanyId: user.companies.length > 0 
            ? user.companies[0].id
            : null
    })
}

export function loginFailed(reason: string): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: {
            status: 'error', 
            value: null, 
            error: reason
        }, 
        selectedCompanyId: null
    })
}

export function loginStarted(): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: {
            status: 'busy', 
            value: null, 
            error: null
        }, 
        selectedCompanyId: null
    })
}

export function loginResult(result: LoginResult): PartialStateUpdater<AuthSlice> {
    if (result.type === 'success') {
        return loginSuccess(result.user);
    } else {
        return loginFailed(result.reason);
    }
}

export function logoutSuccess(): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: {
            status: 'idle',
            value: null,
            error: null
        },
        selectedCompanyId: null
    })
}


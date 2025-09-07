import { PartialStateUpdater } from "@ngrx/signals";
import { AuthSlice } from "./auth.slice";
import { LoginResult, User } from "@contract";
import { busyResourceModel, errorResourceModel, initialResourceModel, resolvedResourceModel } from "../../utils/resource-model";

export function loginSuccess(user: User): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: resolvedResourceModel(user), 
        selectedCompanyId: user.companies.length > 0 
            ? user.companies[0].id
            : null
    })
}

export function loginFailed(reason: string): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: errorResourceModel(reason),
        selectedCompanyId: null
    })
}

export function loginNotInit(): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: initialResourceModel(), 
        selectedCompanyId: null
    })
}

export function loginStarted(): PartialStateUpdater<AuthSlice> {
    return _ => ({
        user: busyResourceModel(), 
        selectedCompanyId: null
    })
}

export function loginResult(result: LoginResult): PartialStateUpdater<AuthSlice> {
    if (result.type === 'success') {
        return loginSuccess(result.user);
    } else if (result.type === 'error') {
        return loginFailed(result.reason);
    } else {
        return loginNotInit();
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

export function selectCompany(id: string): PartialStateUpdater<AuthSlice> {
    return state => {
        if (!state.user.value) return state;

        const company = state.user.value.companies.find(c => c.id === id);
        if (!company) return state;

        return {
            selectedCompanyId: id
        };
    }
}


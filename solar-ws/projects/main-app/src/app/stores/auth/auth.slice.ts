import { User } from "../../models/user.model";

export interface AuthSlice {
    readonly user: User | null;
    readonly selectedCompanyId: string | null;
}

export const initialAuthSlice: AuthSlice = {
    user: null,
    selectedCompanyId: null
};
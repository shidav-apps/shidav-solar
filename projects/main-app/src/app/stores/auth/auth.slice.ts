import { User } from "@contract";
import { ResourceModel } from "../../utils/resource-model";

export interface AuthSlice {
    readonly user: ResourceModel<User>;
    readonly selectedCompanyId: string | null;
}

export const initialAuthSlice: AuthSlice = {
    user: {
        status: 'idle', 
        value: null, 
        error: null
    },
    selectedCompanyId: null
};
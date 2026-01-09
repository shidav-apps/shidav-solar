import { DbModel } from "@db-model";
import { ResourceModel } from "../../../../../tools/resource-model";

export interface AuthSlice {
    readonly user: ResourceModel<DbModel.User>;
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
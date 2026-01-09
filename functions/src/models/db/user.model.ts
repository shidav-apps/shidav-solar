import { Company } from "./company.model";

export interface User {
    readonly id: string;
    readonly email: string;
    readonly displayName: string;
    readonly companies: Company[];

}
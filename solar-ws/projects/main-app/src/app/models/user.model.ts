import { Company } from "./company.model";

export interface User {
    readonly id: string;
    readonly email: string;
    readonly dispalyName: string;
    readonly imageUrl: string;
    readonly companies: Company[];

}
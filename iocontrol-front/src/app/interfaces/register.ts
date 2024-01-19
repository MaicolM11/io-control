import { IPerson } from "./person";

export interface IRegister {
    startDateTime: string;
    finalDateTime: string;
    cardNumber: string;
    person: IPerson;
}
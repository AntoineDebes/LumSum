import { ValidationError } from "class-validator";

interface INewError {
    [key: string]: string;
}

export const errorConfigure = (errors: ValidationError[]): INewError => {
    const newErrors: INewError = {} as INewError;
    errors.map(({ property, constraints }: ValidationError) => {
        newErrors[property] = Object.values(constraints!)[0];
    })
    return newErrors;
}
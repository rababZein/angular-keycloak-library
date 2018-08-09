export class User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified : boolean;
    enabled: boolean;
    requiredActions : string [] ;
    credentials : [{type: string , temporary: boolean , value: string}];
}

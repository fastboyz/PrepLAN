export class Account {
    username: string;
    password: string;
    email: string;
}

export class User {
    account: Account;
    firstName: string;
    lastName: string;
    pronoun: string;
    birthday: Date;
    phoneNumber: string;
    discord: string;
}

export class Profile {
    user: User;
    tshirtSize: string;
    allergy: string;
    certification: string;
    emergencyContact: EmergencyContact;
}

export class EmergencyContact {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
}

export class Account {
    id?: string;
    username: string;
    password?: string;
    email: string;
    token?: string;
}

export class User {
    account: Account;
    firstName: string;
    lastName: string;
    pronoun: string;
    birthday: Date;
    phoneNumber: string;
    discord?: string;
}

export class Profile {
    user: User;
    tshirtSize?: string;
    allergy?: string;
    certification?: string;
    emergencyContact: EmergencyContact;
}

export class EmergencyContact {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
}

export class CombinedUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    pronoun: string;
    birthday: string;
    phoneNumber: string;
    discord: string;
    tshirtSize: string;
    allergy: string;
    certification: string;
    firstNameEmergency: string;
    lastNameEmergency: string;
    emergencyNumber: string;
    relationshipEmergency: string;
}

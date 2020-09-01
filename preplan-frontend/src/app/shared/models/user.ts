export class Account {
  id?: string;
  username: string;
  password?: string;
  email: string;
  token?: string;
  role: string;
}

export class User {
  id?: string;
  account: Account;
  firstName: string;
  lastName: string;
  pronoun: string;
  birthday: Date;
  phoneNumber: string;
  discord?: string;
}

export class Profile {
  id?: string;
  user: User;
  tshirtSize?: string;
  allergy?: string;
  certification?: string;
  emergencyContact: EmergencyContact;
}

export class EmergencyContact {
  id?: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phoneNumber: string;
}

export class CombinedUser {
  idAccount: string;
  username: string;
  password: string;
  email: string;
  role?: string;

  idUser: string;
  firstName: string;
  lastName: string;
  pronoun: string;
  birthday: string;
  phoneNumber: string;
  discord: string;

  idProfile: string;
  tshirtSize: string;
  allergy: string;
  certification: string;

  idEmergencyContact: string;
  firstNameEmergency: string;
  lastNameEmergency: string;
  emergencyNumber: string;
  relationshipEmergency: string;
}

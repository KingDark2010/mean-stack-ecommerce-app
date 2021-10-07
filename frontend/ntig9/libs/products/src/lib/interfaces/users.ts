export interface User {
  _id: string;
  firstName: string;
  email: string;
  password: string;
  isSeller: boolean;
}

export interface UserObject {
  data: User;
}

export interface UsersObject {
  data: User[];
}

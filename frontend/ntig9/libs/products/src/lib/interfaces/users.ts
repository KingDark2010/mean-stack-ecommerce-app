export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  token: string;
  isAdmin: boolean;
  isSeller: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserObject {
  data: User;
}

export interface UsersObject {
  data: User[];
}

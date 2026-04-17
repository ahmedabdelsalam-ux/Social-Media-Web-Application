export interface RegisterRespons {
  success: boolean;
  message: string;
  data: Register;
}

export interface Register {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}

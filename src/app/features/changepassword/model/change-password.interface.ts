export interface ChangePasswordRespons {
  success: boolean;
  message: string;
  data: ChangePassword;
}

export interface ChangePassword {
  token: string;
  tokenType: string;
  expiresIn: string;
}

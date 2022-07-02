export interface User {
  _id: string,
  email: string,
  token: string,
  avatar: File | null;
  displayName: string
  role: string
}

export interface RegisterUserData {
  email: string;
  password: string;
  avatar: File | null;
  displayName: string
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    email: FieldError,
    password: FieldError
  }
}

export interface LoginUserData {
  email: string,
  password: string
}

export interface LoginError {
  error: string
}

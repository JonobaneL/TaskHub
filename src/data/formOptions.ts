export type SingUpFormParams = {
  avatar: File | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LogInFormParams = {
  email: string;
  password: string;
};
export const passwordValidation = {
  required: "This field is required",
  minLength: { value: 6, message: "Password must be at least 6 character" },
  maxLength: { value: 20, message: "Password must be less than 20 characters" },
};

export const fieldValidation = {
  required: "This field is required",
};

export const emailValidation = {
  required: "This field is required",
  minLength: 3,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    message: "Enter valid email address",
  },
};

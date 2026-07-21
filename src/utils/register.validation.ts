export interface RegisterFormValues {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterFormValues, string>
>;

const USERNAME_PATTERN = /^[\w.@+-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10,15}$/;

export function validateRegisterForm(
  values: RegisterFormValues,
  isPasswordValid: (password: string) => boolean,
): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};

  const username = values.username.trim();

  if (!username) {
    errors.username = "Username is required.";
  } else if (username.length > 150) {
    errors.username = "Username must be 150 characters or fewer.";
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username =
      "Username may only contain letters, digits, and @/./+/-/_ characters.";
  }

  const email = values.email.trim();

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.first_name.trim()) {
    errors.first_name = "First name is required.";
  }

  if (!values.last_name.trim()) {
    errors.last_name = "Last name is required.";
  }

  const phone = values.phone_number.trim();

  if (!phone) {
    errors.phone_number = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone_number =
      "Enter a valid phone number (10–15 digits).";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (!isPasswordValid(values.password)) {
    errors.password =
      "Password must meet all requirements below.";
  }

  if (!values.confirm_password.trim()) {
    errors.confirm_password = "Please confirm your password.";
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = "Passwords do not match.";
  }

  return errors;
}

export const EMPTY_REGISTER_FORM: RegisterFormValues = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
  confirm_password: "",
};

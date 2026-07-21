export type PasswordRule = {
  key: string;
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    key: "minLength",
    label: "At least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    key: "uppercase",
    label: "At least one uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "At least one lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: "special",
    label: "At least one special character",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function getPasswordRuleStatuses(password: string) {
  return PASSWORD_RULES.map((rule) => ({
    ...rule,
    met: rule.test(password),
  }));
}

export function isPasswordValid(password: string): boolean {
  return getPasswordRuleStatuses(password).every((rule) => rule.met);
}

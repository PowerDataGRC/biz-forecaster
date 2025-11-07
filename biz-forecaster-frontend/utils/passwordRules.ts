export interface PasswordValidationRule {
  id: string;
  message: string;
  validator: (password: string) => boolean;
}

export const passwordRules: PasswordValidationRule[] = [
  {
    id: 'length',
    message: 'Password must be at least 8 characters long',
    validator: (password: string) => password.length >= 8
  }
];

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  rules: {
    [key: string]: boolean;
  };
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const results = passwordRules.map(rule => ({
    id: rule.id,
    valid: rule.validator(password),
    message: rule.message
  }));

  return {
    isValid: results.every(r => r.valid),
    errors: results.filter(r => !r.valid).map(r => r.message),
    rules: Object.fromEntries(results.map(r => [r.id, r.valid]))
  };
};
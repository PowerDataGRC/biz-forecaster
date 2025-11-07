import { useState, useEffect } from 'react';
import { validatePassword, PasswordValidationResult } from '../utils/passwordRules';

export const usePasswordValidation = (password: string): PasswordValidationResult & {
  strength: 'weak' | 'medium' | 'strong';
} => {
  const [validation, setValidation] = useState<PasswordValidationResult>({
    isValid: false,
    errors: [],
    rules: {}
  });

  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  useEffect(() => {
    const result = validatePassword(password);
    setValidation(result);

    // Calculate password strength
    const passedRules = Object.values(result.rules).filter(Boolean).length;
    if (passedRules <= 2) {
      setStrength('weak');
    } else if (passedRules <= 4) {
      setStrength('medium');
    } else {
      setStrength('strong');
    }
  }, [password]);

  return {
    ...validation,
    strength
  };
};
import React from 'react';
import { PasswordValidationRule, passwordRules } from '../utils/passwordRules';

interface PasswordStrengthIndicatorProps {
  password: string;
  rules: {
    [key: string]: boolean;
  };
  strength: 'weak' | 'medium' | 'strong';
}

const strengthColors = {
  weak: 'bg-red-500',
  medium: 'bg-yellow-500',
  strong: 'bg-green-500'
};

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  rules,
  strength
}) => {
  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="h-2 flex-grow rounded-full bg-gray-700">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strengthColors[strength]}`}
            style={{
              width: `${(Object.values(rules).filter(Boolean).length / passwordRules.length) * 100}%`
            }}
          />
        </div>
        <span className="text-sm capitalize text-gray-400">{strength}</span>
      </div>
      
      <ul className="space-y-1">
        {passwordRules.map((rule: PasswordValidationRule) => (
          <li
            key={rule.id}
            className={`text-sm flex items-center space-x-2 ${
              rules[rule.id] ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            <svg
              className={`h-4 w-4 ${rules[rule.id] ? 'text-green-400' : 'text-gray-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {rules[rule.id] ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            <span>{rule.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// A type guard to check if the error is a Firebase error with a code property
interface FirebaseError extends Error {
  code: string;
}

function isFirebaseError(error: unknown): error is FirebaseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as any).code === 'string'
  );
}

export function getFirebaseErrorMessage(error: unknown): string {
  if (!isFirebaseError(error)) {
    // If it's a regular Error object, return its message
    if (error instanceof Error) {
      return error.message;
    }
    // Otherwise, return a generic fallback message
    return 'An unexpected error occurred. Please try again.';
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email address is already in use by another account.';
    case 'auth/invalid-email':
      return 'The email address is not valid. Please check and try again.';
    case 'auth/weak-password':
      return 'The password is too weak. It must be at least 6 characters long.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials and try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}
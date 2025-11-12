import { FirebaseError } from 'firebase/app';

export function getFirebaseErrorMessage(error: unknown): string {
  // First, check if it's a FirebaseError
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is not valid. Please check and try again.';
      case 'auth/weak-password':
        return 'The password is too weak. It must be at least 6 characters long.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/too-many-requests':
        return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
      // For other Firebase errors, return the default message
      default:
        return error.message;
    }
  }
  // If it's a standard JavaScript Error, return its message
  if (error instanceof Error) {
    return error.message;
  }
  // Fallback for unknown error types
  return 'An unexpected error occurred. Please try again.';
}
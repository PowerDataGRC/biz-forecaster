import dynamic from 'next/dynamic';

// Dynamically import the Registration component with SSR turned off.
// This ensures it only renders on the client, preventing hydration errors.
const Registration = dynamic(() => import('../../components/Registration').then(mod => mod.Registration), {
  ssr: false,
  loading: () => <p className="text-center">Loading form...</p>, // Optional loading state
});

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12">
      <Registration />
    </div>
  );
}
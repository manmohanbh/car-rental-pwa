// src/pages/Unauthorized.tsx
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please sign in with the correct account type.
        </p>
        <div className="space-y-4">
          <Link
            to="/driver-login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Driver Login
          </Link>
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
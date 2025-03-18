'use client';

import { ApiCredentials } from '@/lib/diet/models';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const Auth = ({ onCredentialsSet }: { onCredentialsSet: () => void }) => {
  const [credentials, setCredentials] = useState<ApiCredentials>({
    appId: '',
    appKey: '',
  });
  
  const handleSubmit = () => {
    if (credentials.appId && credentials.appKey) {
      localStorage.setItem('nutritionix_credentials', JSON.stringify(credentials));
      onCredentialsSet();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Welcome to Simple Diet Planner</h2>
        <p className="mb-4 text-gray-600 font-bold">
          To continue, please enter your Nutritionix API credentials.
        </p>
        <p className="mb-4 text-gray-600">
          You can get one for free at the <a href="https://developer.nutritionix.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-500">Nutritionix</a> website.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              App ID
              <input
                type="text"
                value={credentials.appId}
                onChange={(e) => setCredentials(prev => ({ ...prev, appId: e.target.value }))}
                className="mt-1 p-2 block w-full rounded-md border border-black focus:ring focus:ring-black"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              API Key
              <input
                type="password"
                value={credentials.appKey}
                onChange={(e) => setCredentials(prev => ({ ...prev, appKey: e.target.value }))}
                className="mt-1 p-2 block w-full rounded-md border border-black focus:ring focus:ring-black"
                required
              />
            </label>
          </div>
          <div className="flex justify-center">
            <PrimaryButton onClick={handleSubmit} faIcon={faSave}>
              Save Credentials
            </PrimaryButton>
          </div>
          <small className="text-gray-500 mt-2 block text-center">
            <span className="font-bold mt-2">Note:</span> Your API credentials will be stored in your browser&apos;s local storage
          </small>
        </form>
      </div>
    </div>
  );
};

export default Auth;
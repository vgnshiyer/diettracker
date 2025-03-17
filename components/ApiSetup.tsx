'use client';

import React, { useState } from 'react';
import { ApiCredentials } from '@/lib/diet/models';

const ApiSetup = ({ onCredentialsSet }: { onCredentialsSet: () => void }) => {
  const [credentials, setCredentials] = useState<ApiCredentials>({
    appId: '',
    appKey: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.appId && credentials.appKey) {
      localStorage.setItem('nutritionix_credentials', JSON.stringify(credentials));
      onCredentialsSet();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Nutritionix API Setup</h2>
        <p className="mb-4 text-gray-600">
          Please enter your Nutritionix API credentials. You can get these from your Nutritionix developer dashboard.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              App ID
              <input
                type="text"
                value={credentials.appId}
                onChange={(e) => setCredentials(prev => ({ ...prev, appId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              API Key
              <input
                type="password"
                value={credentials.appKey}
                onChange={(e) => setCredentials(prev => ({ ...prev, appKey: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save Credentials
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiSetup;
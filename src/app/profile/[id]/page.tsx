import React from 'react';
import Link from 'next/link';


function userProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-center text-blue-400 mb-8">Profile Page</h1>
      <hr className="w-1/2" />
      <p className="text-center text-gray-500">User ID: {params.id}</p>
    </div>
  );
}

export default userProfile;
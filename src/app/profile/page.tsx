"use client";

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import axios from "axios";

function getProfiles() {
  let profile = axios.get('/api/users/signup')
  .then(function (response) {
    console.log(response);
    return response;
  }
  )
  .catch(function (error) {
    console.log(error);
    return error;
  }
  );
}

function ProfilePage(props:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-center text-blue-400 mb-8">Profile Page</h1>
      <hr className="w-1/2" />
      <div>
        <h2 className="text-4xl font-bold text-center text-blue-400 mb-8">Profiles</h2>
        <p>
          {getProfiles()}
        </p>
      </div>

    </div>
  );
}

export default ProfilePage;
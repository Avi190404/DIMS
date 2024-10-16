import React, { useEffect, useState } from 'react';
import { getContract } from '../../connection/contract';

const Profile = () => {
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    const fetchPrivateKey = async () => {
      try {
        const contract = await getContract();
        const privateKey = await contract.getPrivateKey();
        setPrivateKey(privateKey);
      } catch (error) {
        console.error('Error fetching private key:', error);
      }
    };

    fetchPrivateKey();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className='flex items-center justify-center bg-black text-white h-[89.4vh] flex-col gap-8'>
        <div>Private Key: {privateKey ? privateKey : 'Loading...'}</div>
        <button className='bg-[#eb5d3a] border border-1 border-[rgba(119,119,125,0.2)] px-4 py-2 rounded-md' onClick={handleLogout}>
          Logout
        </button>
    </div>
  );
};

export default Profile;

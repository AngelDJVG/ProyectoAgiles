import React from 'react';
import LogoutButton from '../LogoutButton';
import Profile from '../Profile';
import HeaderAdmin from './HeaderAdmin';

function CuerpoAdmin() {
  return (
    <>
    <HeaderAdmin/>
    <Profile/>
    <LogoutButton/>
    </>
  );
}

export default CuerpoAdmin;
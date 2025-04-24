import React from 'react';
import { useUser, SignIn, SignUp } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { isSignedIn } = useUser();

  // If the user is signed in, redirect to home to avoid looping.
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <SignIn path="/auth/signin" routing="path" signUpUrl="/auth/signup" />
      <SignUp path="/auth/signup" routing="path" signInUrl="/auth/signin" />      
    </div>
  );
};

export default Auth;

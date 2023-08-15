/* eslint-disable @next/next/no-html-link-for-pages */
// pages/index.js
'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Index() {
  const { user, error, isLoading } = useUser();

  async function sendData(){
    await fetch('api', {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user)
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <div>
        Welcome {user.nickname}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
   
  }

  return <a href="/api/auth/login">Login</a>;
}
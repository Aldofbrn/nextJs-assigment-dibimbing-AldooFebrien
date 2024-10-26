import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from 'cookies-next';
import { redirect } from 'next/dist/server/api-utils';

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });
  if (!token) return { redirect: { destination: '/auth/login' } };
  return { props: {} };
}

const Navbar = () => {
  const router = useRouter();
  const logOut = () => {
    deleteCookie('token');
    router.push('/auth/login');
  };
  return (
    <div className="font-[Poppins] bg-green-900 shadow-lg">
      <ul className="flex gap-2 items-center justify-center py-4 text-xl font-bold">
        <li className="hover:text-black transition-all duration-300">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-black transition-all duration-300">
          <Link href="/">Menu List</Link>
        </li>
        <li>
          <button
            onClick={logOut}
            className="bg-green-500 text-black px-2 py-1 rounded-lg hover:text-white hover:bg-green-950 transition-all duration-300
          "
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

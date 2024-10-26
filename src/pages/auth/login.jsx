import React from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.email.value);

    const payLoad = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    //kasih config karena ada beberapa API di protect, jadi harus kita config terlebih dahulu
    axios
      .post('https://api-bootcamp.do.dibimbing.id/api/v1/login', payLoad, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        },
      })
      .then((res) => {
        setCookie('token', res.data.token);
        router.push('/');
      })
      .catch((err) => {
        alert('Login Failed 😢Please enter your email and your password');
      });
  };
  return (
    <div className="flex flex-col w-screen text-black  h-screen font-[Poppins] items-center justify-center gap-4 bg-green-700">
      <form
        onSubmit={handleLogin}
        className="w-80 h-80 md:w-96 md:h-96 flex flex-col items-center justify-center gap-2 border border-2 rounded-lg border-green-400"
      >
        <h1 className="text-4xl font-extrabold mb-6">Login</h1>
        <label
          htmlFor="email"
          className="flex flex-col gap-2 items-center w-3/4 relative"
        >
          <p className="font-medium">Email</p>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            className=" border border-2 text-black rounded-md w-full px-2"
          />
          <i class="bx bxs-user absolute text-gray-600 right-4 top-[64%]"></i>
        </label>
        <label
          htmlFor="password"
          className="flex flex-col gap-2 items-center w-3/4 relative"
        >
          <p className="font-medium">Password</p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="border border-2 text-black rounded-md w-full px-2"
          />
          <i class="bx bxs-lock-alt absolute right-4 text-gray-600 top-[64%]"></i>
        </label>
        <button
          type="submit"
          className="bg-green-500 px-2 py-1 rounded-lg hover:bg-green-900 mt-4 w-1/3"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

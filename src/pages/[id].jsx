import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });
  if (!token) return { redirect: { destination: '/auth/login' } };
  return { props: {} };
}

const ProductDetails = () => {
  const [menu, setMenu] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${router.query.id}`,
        {
          headers: {
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJmZGQwYWQ0Ny02M2I0LTQ0YjYtODY1Yi1mODk0YTliZWExMTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk5NDMxNzB9.IAZ5b5j_QSDALBK8KiMyoNAbpRgXi7Uol5i-ra67Xoc',
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          setMenu(json.data);
        });
    }
  }, [router.query.id]);
  return (
    <div className="font-[Poppins]">
      <Navbar />
      <div className="text-center my-2 px-2">
        <h1 className="text-4xl mb-2">Product detail 😋</h1>
        <p>
          Discover the rich flavors of our featured dish, carefully crafted to
          delight your taste buds. Each ingredient is selected for its freshness
          and quality, ensuring a memorable dining experience. From the zesty
          sambel that adds a spicy kick to the hearty tempe that provides a
          satisfying texture, every bite tells a story. Experience the vibrant
          combination of traditional ingredients, each contributing to the
          dish's unique character. Join us on this culinary journey and indulge
          in a taste of authenticity that brings comfort and satisfaction.
        </p>
      </div>

      <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="flex max-w-[500px] items-center gap-2 justify-center border border-2 border-green-700 bg-green-700 py-4 rounded-lg text-black">
          <div className="flex flex-col items-cente justify-center border-green-700">
            <div className="overflow-hidden rounded-md">
              <img
                src={menu.imageUrl}
                className="hover:scale-105 transition-all w-full duration-300"
              />
            </div>

            <h2 className="text-2xl py-2">{menu.name}</h2>
            <Link href="/">
              <button className="bg-green-500 rounded-xl hover:bg-green-950 transition-all duration-300 w-full hover:text-white">
                To Homepage ?
              </button>
            </Link>
          </div>
          <div className="w-1/2 py-2">
            <h2 className="text-3xl">Ingredients:</h2>
            <p>
              <span>
                {menu.ingredients && menu.ingredients.length > 0
                  ? menu.ingredients.join(', ')
                  : 'No ingredients available.'}
              </span>
            </p>
            <h2 className="text-3xl">Description:</h2>
            <p>{menu.description}</p>
            <p className="text-[12px] text-green-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa qui
              et nisi ex consectetur ea numquam distinctio beatae fuga vel quae
              porro sint velit voluptatem, natus ducimus, totam, nobis iste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

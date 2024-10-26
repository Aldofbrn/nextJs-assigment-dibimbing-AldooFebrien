import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Link from 'next/link';

// export async function getServerSideProps() {
//   try {
//     const res = await fetch(
//       'https://api-bootcamp.do.dibimbing.id/api/v1/foods',
//       {
//         headers: {
//           apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
//           Authorization:
//             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJmZGQwYWQ0Ny02M2I0LTQ0YjYtODY1Yi1mODk0YTliZWExMTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk5NDMxNzB9.IAZ5b5j_QSDALBK8KiMyoNAbpRgXi7Uol5i-ra67Xoc',
//         },
//       }
//     );

//     // Check if the response status is OK
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const data = await res.json();

//     // Log the entire API response for inspection
//     console.log('API Response:', JSON.stringify(data, null, 2));

//     // Validate data existence and structure
//     if (!data || !data.data) {
//       console.error('No data found in response.');
//       return { props: { products: [] } }; // Return an empty array if no data
//     }

//     return { props: { products: data.data } }; // Return valid products data
//   } catch (error) {
//     console.error('Fetch error:', error);
//     return { props: { products: [] } }; // Handle fetch error
//   }
// }

const ProductList = () => {
  // const { products } = props;
  // console.log(products);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
      headers: {
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJmZGQwYWQ0Ny02M2I0LTQ0YjYtODY1Yi1mODk0YTliZWExMTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk5NDMxNzB9.IAZ5b5j_QSDALBK8KiMyoNAbpRgXi7Uol5i-ra67Xoc',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(JSON.stringify(json.data, null, 2)); // Log the foods array
        setFoods(json.data); // Update state with foods
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="bg-green-700">
      <Navbar />
      <div className="container font-[Poppins] mx-auto flex flex-col items-center">
        <div className="mb-3 text-center">
          <h1 className="text-2xl my-3 ">👨‍🍳Welcome to Menu List👨‍🍳</h1>
          <p>
            Welcome to our menu, where each dish is crafted with care and
            passion. Discover a delightful array of flavors, from savory
            appetizers to indulgent desserts. Our selection features fresh,
            high-quality ingredients that are sure to satisfy every palate. Join
            us on this culinary journey and find your new favorite meal!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-1 ">
          {foods.map((food) => (
            <div
              key={food.id}
              className="flex flex-col gap-1  border border-green-400 rounded-lg overflow-hidden"
            >
              <img
                src={food.imageUrl}
                className=" w-full aspect-video object-cover hover:scale-105 transition-all duration-300"
              />

              <div className="flex justify-center items-center gap-2 px-4">
                <div className="w-1/2">
                  <p className="font-semibold text-medium">{food.name}</p>
                  <span className="text-sm">rating: {food.rating}</span>
                </div>
                <div className="w-1/2">
                  <Link href={`/${food.id}`}>
                    <button
                      className="bg-green-500 transition-all
                    duration-300 hover:bg-green-900 hover:text-white
                  
                  text-sm px-2 font-medium rounded-xl text-black"
                    >
                      Explore This Dish!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

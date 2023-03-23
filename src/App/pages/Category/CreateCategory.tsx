import React, { MouseEvent, useState } from "react";


export default function CreateCategory() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-96 p-5 rounded">
        <h1 className="font-bold text-2xl text-blue-500">
          Subscribe for our newsletter
        </h1>
        <p className="py-1 text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos quasi
          quibusdam pariatur? Repellendus laudantium dignissimos.
        </p>
        <input
          placeholder="example@email.com"
          type="email"
          className="w-full border border-gray-500 p-1 mt-2 rounded "
        />
        <button className="mt-2 py-2 px-5 bg-blue-500 text-white">
          Subscribe
        </button>
      </div>
      </div>
      
  </div>
  )
}

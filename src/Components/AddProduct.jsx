import { useMutation } from "@tanstack/react-query";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addProduct } from '../Utils/Api';
import { queryClient } from '../main';

const AddProductForm = () => {
  const navigate = useNavigate();
  
  const [allData, setAllData] = useState({
    productName: "",
    productPrice: "",
    imageFile: null
  });

  const mutation = useMutation({
    mutationKey: ['createProduct'],
    mutationFn: addProduct,
    onSuccess: () => {
      navigate("/list");
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      toast.success("Product Added Successfully");
    }
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAllData((prevData) => ({
        ...prevData,
        imageFile: e.target.files[0]
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', allData.productName);
    formData.append('productPrice', allData.productPrice);
    formData.append('image', allData.imageFile); 

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
  }
  
    mutation.mutate(formData);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-blue-200 to-indigo-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="mt-4 mb-6 text-center text-3xl font-bold text-gray-900">Add a Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-700">
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              value={allData.productName}
              onChange={handleInputChange}
              type="text"
              required
              className="block w-full rounded-md border border-blue-300 shadow-sm mt-4 mb-4 h-10 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium leading-6 text-gray-700">
              Product Price
            </label>
            <input
              id="productPrice"
              name="productPrice"
              value={allData.productPrice}
              onChange={handleInputChange}
              type="number"
              required
              className="block w-full rounded-md border border-blue-300 shadow-sm mt-4 mb-4 h-10 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium leading-6 text-gray-700">
              Product Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              required
              className="block w-full rounded-md border border-blue-300 shadow-sm focus:border-indigo-500 mt-4 mb-4 h-10 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 mb-4"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

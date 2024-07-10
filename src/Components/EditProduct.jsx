import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { editProduct, updateProduct } from '../Utils/Api';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: '',
    productPrice: '',
    imageFile: null,
    imageUrl: '',
  });


  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => editProduct(id),
    onSuccess: (data) => {
      setProductData({
        productName: data.productName,
        productPrice: data.productPrice,
        imageFile: null,
        imageUrl: data.image,
      });
    },
    onError: () => {
      toast.error('Failed to fetch product details');
    },
  });

  useEffect(() => {
    if (data) {
      setProductData({
        productName: data.productName,
        productPrice: data.productPrice,
        imageFile: null,
        imageUrl: data.image,
      });
    }
  }, [data]);

  
  const mutation = useMutation({
    mutationKey: ['updateProduct', id],
    mutationFn: (formData) => updateProduct(id, formData),
    onSuccess: () => {
      toast.success('Product updated successfully');
      navigate('/list'); 
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProductData((prevData) => ({
        ...prevData,
        imageFile: e.target.files[0],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('productPrice', productData.productPrice);
    if (productData.imageFile) {
      formData.append('productImage', productData.imageFile);
    }
    mutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product details.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Price
          </label>
          <input
            type="number"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          {productData.imageUrl && (
            <img
              src={`http://localhost:3030/uploads/${productData.imageUrl}`}
              alt="Current Product"
              className="w-full h-auto mb-4"
            />
          )}
          <input
            type="file"
            name="productImage"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mutation.isLoading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;



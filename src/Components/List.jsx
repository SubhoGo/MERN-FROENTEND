import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deletData, listOfData, productImage } from "../Utils/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { queryClient } from "../main";

const List = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: listOfData,
    staleTime: 1000 * 60,
    enabled: !!localStorage.getItem("login-token"),
    onError: (error) => {
      toast.error("Error fetching data");
      console.error(error);
    },
  });

  const mutation = useMutation({
    mutationKey: ["deletProduct"],
    mutationFn: deletData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      toast.success("Product Deleted Successfully");
    },
    onError: (error) => {
      toast.error("Error deleting product");
      console.error(error);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate({ id });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Product List
        </h1>
        <Link to={"/addProduct"}>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg mb-6 inline-block focus:outline-none transform transition-transform duration-300 hover:scale-105">
            Create Product
          </button>
        </Link>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-4 text-left text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-4 text-left text-gray-600 uppercase">
                Price
              </th>
              <th className="px-6 py-4 text-left text-gray-600 uppercase">
                Image
              </th>
              <th className="px-6 py-4 text-left text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.productPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`${productImage(product.image)}`} alt="" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/edit/${product._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 focus:outline-none">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;

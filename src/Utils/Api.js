import axios from "axios";

const BASE_URL = "https://mern-curd-0vcf.onrender.com"

export const register = async (userInfo) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/register`,
      userInfo
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userInfo) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userInfo);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

export const listOfData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/show`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("login-token")),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);
    throw error;
  }
};

export const deletData = async ({id}) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/delete/${id}`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("login-token")),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error.response?.data || error.message);
    throw error;
  }
};

export const addProduct = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/products/create`, formData, {
            headers: {
              'x-access-token': JSON.parse(localStorage.getItem('login-token')),
              'Content-Type': 'multipart/form-data',
            },
          });
        
          return response.data;
    } catch (error) {
       throw error 
    }
  };

  export const editProduct = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/edit/${id}`, {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('login-token')),
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product for edit:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const updateProduct = async (id, formData) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/update/${id}`, formData, {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('login-token')),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      throw error;
    }
  };

  export const productImage=(image) =>{
  return (
    `${BASE_URL}/images/`+`${image}`
  )
  }
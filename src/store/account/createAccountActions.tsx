import axiosInstance from "lib/axios";

export const updateNameApi = async (userId: string, username: string) => {
  try {
    const res = await axiosInstance.post("/account/update-username", { userId, username });
    return res.data;
  } catch (err) {
    throw new Error("Error updating username");
  }
};


export const updateEmailApi = async (userId: string, newEmail: string) => { 
  try {
    const res = await axiosInstance.post("/account/update-email", { userId, newEmail });
    console.log("[API] updateEmailApi success:", res.data);
    return res.data; // success message
  } catch (err: any) {
    console.error("[API] updateEmailApi failed:", err.response?.data || err.message);
    // Throw the original Axios error so the frontend can read response.data
    throw err;
  }
};




export const updatePhoneApi = async (userId: string, phone: string) => {
  try {
    const res = await axiosInstance.post("/account/update-phone", {userId, phone });
    console.log('response from update  phone api', res)
    return res.data;
  } catch (err) {
    throw new Error("Error updating phone");
  }
};

export const updateAddressApi = async (data: {
  userId: string;
  fullName: string;
  email: string;
  state: string;
  city: string;
  address: string;
  landmark?: string;
  postalCode?: string;
}) => {
  try {
    const res = await axiosInstance.post("/account/update-address", data);
    console.log("[API] updateAddressApi success:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("[API] updateAddressApi failed:", err.response?.data || err.message);
    throw err;
  }
};




export const updatePasswordApi = async (currentPassword: string, newPassword: string) => {
  try {
    const res = await axiosInstance.post("/account/update-password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  } catch (err) {
    throw new Error("Error updating password");
  }
};

export const fetchAddressApi = async () => {
  try {
    const res = await axiosInstance.get("/account/address"); // your GET endpoint
    console.log("[API] fetchAddressApi success:", res.data);
    return res.data; // { address: {...} }
  } catch (err: any) {
    console.error("[API] fetchAddressApi failed:", err.response?.data || err.message);
    throw err;
  }
};




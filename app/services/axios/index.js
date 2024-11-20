import axios from "axios";
const baseURL = "https://api.fastrest.com.tr";

export const accountCategoriesAndProducts = async (accountId) => {
  try {
    const url = `${baseURL}/api/qr-menu/get-groups-and-products`;
    const data = {
      accountId: accountId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    return { success: false, message: error.message };
  }
};

export const accountCategories = async (accountId) => {
  try {
    const url = `${baseURL}/api/qr-menu/get-categories`;
    const data = {
      accountId: accountId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData.data };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};
export const categoryProducts = async (accountId, catId) => {
  try {
    const url = `${baseURL}/api/qr-menu/get-category-products`;
    const data = {
      accountId: accountId,
      catId: catId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData.data };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};

export const categoryProductss = async (accountId, catId) => {
  try {
    const url = `${baseURL}/api/qr-menu/get-category-products`;
    const data = {
      accountId: accountId,
      catId: catId,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        return { success: true, message: data.data };
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    return { success: false, message: error };
  }
};
export const productDetail = async (accountId, catId, pId) => {
  try {
    const url = `${baseURL}/api/qr-menu/get-product-by-id`;
    const data = {
      accountId: accountId,
      catId: catId,
      pId: pId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData.data };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};

export const getInputProducts = async (accountId, searchInput) => {
  try {
    const url = `${baseURL}/api/qr-menu/search`;
    const data = {
      accountId: accountId,
      searchInput: searchInput,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData.data };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};
export const getAccount = async (accountId) => {
  try {
    const url = `${baseURL}/api/qr-menu/get-account-information`;
    const data = {
      accountId: accountId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData.data };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};
export const insertAccountToDB = async (accountId) => {
  try {
    const url = `${baseURL}/api/qr-menu/insert-to-welcome-db`;
    const data = {
      accountId: accountId,
      user_id: 178,
      product_id: 28,
      product_version: "1.0.0",
      name: "",
      last_user_name: "",
      ip: "",
      port: "",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return { success: true, message: responseData.data };
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};

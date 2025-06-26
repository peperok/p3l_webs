import useAxios from ".";

//index (showAll)
export const GetAllRequestDonasis = async () => {
  try {
    const response = await useAxios.get("/reqDonasi", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

//search
export const GetRequestDonasis = async () => {
  const id = JSON.parse(sessionStorage.getItem("reqDonasi")).id;
  try {
    const response = await useAxios.get(`/reqDonasi/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateRequestDonasis = async (data) => {
  try {
    const id_organisasi = sessionStorage.getItem("id_organisasi"); // ambil ID organisasi

    const response = await useAxios.post(
      "/reqDonasi",
      {
        ...data,
        id_organisasi: id_organisasi,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//update
export const UpdateRequestDonasi = async (values) => {
  try {
    const response = await useAxios.put(
      `/reqDonasi/${values.id_reqDonasi}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//delete
export const DeleteRequestDonasis = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.delete(`/reqDonasi/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

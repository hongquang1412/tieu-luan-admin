import * as request from "./request";

export const get = async (id = "") => {
  try {
    const res = await request.get(`orders?kh_id=${id}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const getDetails = async (id = "", limit="") => {
  try {
    const res = await request.get(`orders?dh_id=${id}&&limit=${limit}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const getOrderDetailsByDay = async (d="") => {
  try {
    const res = await request.get(`orders/details?day=${d}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const getOrderDetailsByMonth = async (m="") => {
  try {
    const res = await request.get(`orders/details?month=${m}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const getOrderDetailsByYear = async (y="") => {
  try {
    const res = await request.get(`orders/details?year=${y}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    const res = await request.post("orders", data, headers);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const patch = async (id, data, headers) => {
  try {
    await request.patch(`orders/${id}`, data, headers);
  } catch (error) {
    //todo write log
  }
};

export const _delete = async (id) => {
  try {
    await request._delete(`orders/${id}`);
  } catch (error) {
    //todo write log
  }
};

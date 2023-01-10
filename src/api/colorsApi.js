import * as request from "./request";

export const get = async (id = "", start = "", limit = "") => {
  try {
    const res = await request.get(`colors?start=${start}&limit=${limit}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    await request.post("colors", data, headers);
  } catch (error) {
    //todo write log
  }
};

export const patch = async (id, data, headers) => {
  try {
    await request.patch(`colors/${id}`, data, headers);
  } catch (error) {
    //todo write log
  }
};

export const _delete = async (id) => {
  try {
    await request._delete(`colors/${id}`);
  } catch (error) {
    //todo write log
  }
};

import * as request from "./request";

export const get = async (id="") => {
  try {
    const res = await request.get(`discounts?sp_id=${id}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    await request.post("discounts", data, headers);
  } catch (error) {
    //todo write log
  }
};

export const patch = async (id, data, headers) => {
  try {
    await request.patch(`discounts/${id}`, data, headers);
  } catch (error) {
    //todo write log
  }
};

export const _delete = async (id) => {
  try {
    await request._delete( `discounts/${id}`);
  } catch (error) {
    //todo write log
  }
};

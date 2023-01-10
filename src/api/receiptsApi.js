import * as request from "./request";

export const get = async (id="") => {
  try {
    const res = await request.get(`receipts?pn_id=${id}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    await request.post("receipts", data, headers);
  } catch (error) {
    //todo write log
  }
};


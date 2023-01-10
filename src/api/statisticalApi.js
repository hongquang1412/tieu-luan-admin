import * as request from "./request";

export const get = async (id="") => {
  try {
    const res = await request.get("statistical");
    return res;
  } catch (error) {
    //todo write log
  }
};


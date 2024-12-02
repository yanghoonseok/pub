import { getBaseUrl } from "./util";
import axios from "axios";
import { ErrorCode, AppError } from "@/common/models/error";
import { interceptors } from "./interceptor";
// const localforage = require("localforage");

const onionService = axios.create({
  baseURL: getBaseUrl(process.env.NODE_ENV),
  //timeout: 5000,
});


console.log(interceptors);


const requestInterceptors: Record<string, any> = interceptors["request"];
const responseInterceptors: Record<string, any> = interceptors["response"];

onionService.interceptors.request.use(
  async (config) => {
    await Promise.all(
      Object.keys(requestInterceptors).map((intercept) =>
        requestInterceptors[intercept](config)
      )
    );
    // await sessionInterceptor(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
onionService.interceptors.response.use(
  async (config) => {
    await Promise.all(
      Object.keys(responseInterceptors).map((intercept) =>
        responseInterceptors[intercept](config)
      )
    );
    console.log(config);
    // console.log(responseInterCeptors);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const onionAxios = {
  setBaseUrl(urlStr: string) {
    onionService.defaults.baseURL = urlStr;
  },
  async get(api: string, params: any = {}) {
    return await onionService
      .get(api, { params: params })
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          throw new AppError(ErrorCode.SERVER_FALSE_ERROR);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "AppError") {
          throw new AppError(err.code, err.message);
        } else if (err.message === "Network Error") {
          throw new AppError(ErrorCode.NETWORK_ERROR);
        } else {
          throw new Error(err.message);
        }
      });
  },
  async post(api: string, params: any = {}) {
    const formData = Object.keys(params).reduce((form, key) => {
      //console.log(key, " ", params[key]);
      form.append(key, params[key]);
      return form;
    }, new FormData());

    return await onionService
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          throw new AppError(ErrorCode.SERVER_FALSE_ERROR);
        }
      })
      .catch((err) => {
        console.log(err.name);
        console.error(err);
        if (err.name === "AppError") {
          throw new AppError(err.code, err.message);
        } else if (err.message === "Network Error") {
          throw new AppError(ErrorCode.NETWORK_ERROR);
        } else {
          throw new Error(err.message);
        }
      });
  },
};
export { onionService, onionAxios };

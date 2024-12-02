import { onionAxios } from "@/common/utils/api";
import { AppError } from "@/common/models/error";
import { AppRequest } from "@/common/models/api";

const getDataList = async ({
  app,
  params,
}: AppRequest): Promise<Record<string, any>[]> => {
  if (!app) {
    return null;
  }

  if (!params) {
    params = {};
  }
  params.app = app;

  let result = await onionAxios.get("/usr/wap/jsonList.do", params);

  if (!result || !result.success) {
    throw new AppError(result.message);
  }
  return result.data;
};

const getData = async ({
  app,
  seq,
}: AppRequest): Promise<Record<string, any>> => {
  if (!app || !seq) {
    return null;
  }

  let result = await onionAxios.get("/usr/wap/jsonDetail.do", {
    app: app,
    seq: seq,
  });

  if (!result || !result.success) {
    throw new AppError(result.message);
  }
  return result.data;
};

const addData = async ({
  app,
  params,
}: AppRequest): Promise<Record<string, any>> => {
  if (!app) {
    return null;
  }

  if (!params) {
    params = {};
  }
  params.app = app;

  let result = await onionAxios.post("/usr/wap/jsonAdd.do", params);

  if (!result || !result.success) {
    throw new AppError(result.message);
  }
  return result.data;
};

const removeData = async ({
  app,
  seq,
}: AppRequest): Promise<Record<string, any>> => {
  if (!app || !seq) {
    return null;
  }

  let result = await onionAxios.get("/usr/wap/jsonRemove.do", {
    app: app,
    seq: seq,
  });

  if (!result || !result.success) {
    throw new AppError(result.message);
  }
  return result.data;
};

const modifyData = async ({
  app,
  params,
}: AppRequest): Promise<Record<string, any>> => {
  console.log(app, params);
  if (!app) {
    return null;
  }

  if (!params) {
    params = {};
  }
  params.app = app;
  let result = await onionAxios.post("/usr/wap/jsonModify.do", params);
  if (!result || !result.success) {
    throw new AppError(result.message);
  }
  return result.data;
};

export { getDataList, getData, addData, removeData, modifyData };

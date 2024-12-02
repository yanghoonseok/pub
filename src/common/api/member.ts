import { StringOrNumber } from "@/common/models/common";
import * as app from "@/common/api/aplctn";
import { onionAxios } from "@/common/utils/api";
import { Aplctn } from "@/common/const/aplctn";

import * as localforage from "localforage";
import { User } from "../models/user";

const getMber = async (seq: StringOrNumber): Promise<any> => {
  return await app.getData({ app: Aplctn.gnrlMber, seq });
};

const getMberById = async (id: StringOrNumber): Promise<any> => {
  const data = await app.getDataList({
    app: Aplctn.gnrlMber,
    params: { mberIdSearch: id },
  });
  console.log(data);
  return data[0] ?? null;
};

const getMberByEmail = async (email: StringOrNumber): Promise<any> => {
  const data = await app.getDataList({
    app: Aplctn.gnrlMber,
    params: {
      mberEmailAdresSearch: email,
    },
  });
  return data[0] ?? null;
};

const getMberByPhone = async (phone: string) => {
  const data = await app.getDataList({
    app: Aplctn.gnrlMber,
    params: { mbtlnumSearch: phone },
  });
  return data[0] ?? null;
};

const getMberSttus = async ({ id, email }: User) => {
  const data = await app.getDataList({
    app: Aplctn.mberSttus,
    params: {
      mberId: id,
      mberEmailAdres: email,
    },
  });
  return data[0] ?? null;
};

const getTestMber = async ({ deviceId }: User) => {
  const data = await app.getDataList({
    app: Aplctn.appServer,
    params: {
      deviceNoSearch: deviceId,
    },
  });
  return data[0] ?? null;
};

const addMber = async (mber: User) => {
  return await app.addData({ app: Aplctn.gnrlMber, params: mber });
};

const removeMber = async (seq: StringOrNumber) => {
  return await app.removeData({ app: Aplctn.gnrlMber, params: seq });
};

const modifyMber = async (mber: User) => {
  const res = await app.modifyData({ app: Aplctn.gnrlMber, params: mber });
  return res;
};

const loginExt = async ({ id, email, password }: User) => {
  let user = await onionAxios.post("/uat/uia/jsonLogin.do", {
    id,
    email,
    password,
    userSe: "GNR",
  });
  if (user && user.success) {
    localforage.setItem("sessionId", user.sessionId);
  }
  return user;
};

const login = async ({ id, password }: User) => {
  return loginExt({ id, email: "", password });
};

const logout = async () => {
  let sessionId = await localforage.getItem("sessionId");
  onionAxios.post("/uat/uia/jsonLogout.do", { sessionId }).then(() => {
    localforage.removeItem("sessionId");
  });
};

const loginSns = async ({ token, type }: User, url: string) => {
  let user = {
    success: false,
    sessionId: "",
    email: "",
    mberId: "",
    mberNm: "",
  };

  user = await onionAxios.post(url ? url : "/uat/uia/jsonLoginSns.do", {
    token,
    type,
  });
  if (user && user.success) {
    sessionStorage.setItem("sessionId", user.sessionId);
    sessionStorage.setItem("snsType", type as string);
  }
  return user;
};

// deprecated

/*
const snsLogin = async ({ token, type }: User) => {
  return await logoutSns({ token, type }, "/uat/uia/jsonSnsLogin.do");
};
*/

const logoutSns = async () => {
  const res = await onionAxios.get("/uat/uia/jsonLogout.do");
  console.log("로그아웃", res);
  if (res.success === true) {
    sessionStorage.removeItem("sessionId");
    return res;
  }
};

// deprecated
const snsLogout = async () => {
  return await logoutSns();
};

const searchId = async ({ name, email }: User) => {
  const res = await onionAxios.get("/uat/uia/jsonSearchId.do", {
    name: name,
    email: email,
    userSe: "GNR",
  });
  return res;
};
const searchPasswd = async ({ id, email }: User) => {
  const res = await onionAxios.get("/uat/uia/jsonSearchPassword.do", {
    id,
    email,
    userSe: "GNR",
  });
  return res;
};

const getHpAuth = async ({ phone }: User) => {
  const res = await onionAxios.post("/usr/ath/jsonHpAuth.do", {
    mbtlnum: phone,
  });
  if (res.success === true) {
    sessionStorage.setItem("requestSeq", res.responseSeq);
  }
  return res;
};
const postHpAuthCheck = async (authNum: number) => {
  const requestSeq = sessionStorage.getItem("requestSeq");
  const res = await onionAxios.post("/usr/ath/jsonHpAuthCheck.do", {
    requestSeq,
    authNum,
  });
  return res;
};
const hpChangePassword = async (password: string) => {
  const res = await onionAxios.get("/usr/ath/jsonHpChangePassword.do", {
    password,
    userSe: "GNR",
  });
  return res;
};

const hpSearchId = async () => {
  const res = await onionAxios.get("/usr/ath/jsonHpSearchId.do");
  return res; //res.data.id
};

export {
  getMber,
  getMberById,
  getMberByEmail,
  getMberSttus,
  getTestMber,
  addMber,
  removeMber,
  modifyMber,
  login,
  loginExt,
  logout,
  loginSns,
  logoutSns,
  snsLogout,
  searchId,
  searchPasswd,
  getHpAuth,
  postHpAuthCheck,
  hpChangePassword,
  getMberByPhone,
  hpSearchId,
};

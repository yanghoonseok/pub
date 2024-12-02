import { getMber } from "@/common/api/member";
import { native } from "@/common/utils/flutter_native";

let watchID;

const state = {
  myPosition: null,
  mberSeq: 0,
  mberId: "",
  mberEmailAdres: "",
  mberNm: "",
  mbtlnum: "",
  passwordHint: "",
  birthDay: "",
  genderCode: "",
};

const getters = {
  isLogin: (state) => {
    return sessionStorage.getItem("sessionId") !== null && state.mberSeq !== 0;
  },
  getMberSeq: (state) => {
    return state.mberSeq;
  },
  userArea: (state) => {
    return state.passwordHint;
  },
  snsType: (state) => {
    return sessionStorage.getItem("snsType") ?? "";
  },
};

const mutations = {
  SET_MY_POSITION(state, myPosition) {
    state.myPosition = myPosition;
  },
  SET_MBER_SEQ(state, mberSeq) {
    state.mberSeq = mberSeq;
  },
  SET_MBER_ID(state, mberId) {
    state.mberId = mberId;
  },
  SET_MBER_EMAIL_ADRES(state, mberEmailAdres) {
    state.mberEmailAdres = mberEmailAdres;
  },
  SET_MBER_NM(state, mberNm) {
    state.mberNm = mberNm;
  },
  SET_MBTLNUM(state, mbtlnum) {
    state.mbtlnum = mbtlnum;
  },
  SET_PASSWORD_HINT(state, passwordHint) {
    state.passwordHint = passwordHint;
  },
  SET_BIRTH_DAY(state, birthDay) {
    state.birthDay = birthDay;
  },
  SET_GENDER(state, gender) {
    state.genderCode = gender;
  },
  RESET_USER_INFO(state) {
    state.myPosition = null;
    state.mberSeq = 0;
    state.mberEmailAdres = "";
    state.mberNm = "";
    state.mbtlnum = "";
    state.passwordHint = "";
    state.birthDay = "";
    state.genderCode = "";
  },
};

const actions = {
  async setMyPosition({ commit }) {
    try {
      const myPosition = await native.basic.getMyPosition();
      commit("SET_MY_POSITION", myPosition);
    } catch (error) {
      throw new Error(error);
    }
  },
  async setUserCommonInfo({ commit }, mberSeq) {
    if (mberSeq) {
      const mberRes = await getMber(mberSeq);
      commit("SET_MBER_SEQ", mberRes.mberSeq);
      commit("SET_MBER_ID", mberRes.mberId);
      commit("SET_MBER_EMAIL_ADRES", mberRes.mberEmailAdres);
      commit("SET_MBER_NM", mberRes.mberNm);
      commit("SET_MBTLNUM", mberRes.mbtlnum);
      commit("SET_PASSWORD_HINT", mberRes.passwordHint);
      commit("SET_BIRTH_DAY", mberRes.passwordCnsr);
      commit("SET_GENDER", mberRes.sexdstnCode);
    } else {
      throw new Error("인자가 부족합니다만");
    }
    return true;
  },
  watchMyPosition({ commit }) {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      };
      watchID = navigator.geolocation.watchPosition(
        (position) => {
          console.log(position);
          commit("SET_MY_POSITION", [
            position.coords.longitude,
            position.coords.latitude,
          ]);
          //commit("SET_MY_POSITION", [126.7898622, 37.5004312]);
        },
        () => {
          console.error("내 위치 띄우는데 에러 발생함.");
        },
        options
      );
      return true;
    } else {
      return false;
    }
  },
  clearWatch({ commit }) {
    commit("SET_MY_POSITION", null);
    navigator.geolocation.clearWatch(watchID);
  },
  resetUserInfo({ commit }) {
    commit("RESET_USER_INFO");
    return true;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

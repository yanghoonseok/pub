import { getMber } from "@/common/api/member";
import { native } from "@/common/utils/flutter_native";
import { defineStore } from "pinia";
import { StringOrNumber } from "../models/common";
import { SnsType } from "../models/sns";

let watchID: StringOrNumber = "";

export const useUserStore = defineStore({
  id: "user",
  persist: true,
  state: () => {
    return {
      myPosition: null,
      mberSeq: 0,
      mberId: "",
      mberEmailAdres: "",
      mberNm: "",
      mbtlnum: "",
      passwordHint: "",
      birthDay: "",
      genderCode: "",
      adres: "",
      sbscrbHsptlSeq: "",
      pushAt: "",
    };
  },
  getters: {
    isLogin: (state) => {
      return (
        sessionStorage.getItem("sessionId") !== null && state.mberSeq !== 0
      );
    },
    getMberSeq: (state): StringOrNumber => state.mberSeq,
    getMberNm: (state) => state.mberNm,
    userArea: (state): string => {
      return state.passwordHint;
    },
    snsType: (state) => {
      return sessionStorage.getItem("snsType") ?? "";
    },
    userInfo: (state) => {
      return state;
    },
  },
  actions: {
    async setMyPosition() {
      try {
        const myPosition = await native.basic.getMyPosition();
        this.myPosition = myPosition;
      } catch (error) {
        throw new Error(error);
      }
    },
    async setUserCommonInfo(mberSeq: StringOrNumber) {
      if (mberSeq) {
        const mberRes = await getMber(mberSeq);
        this.mberSeq = mberRes.mberSeq;
        this.mberId = mberRes.mberId;
        this.mberEmailAdres = mberRes.mberEmailAdres;
        this.mberNm = mberRes.mberNm;
        this.mbtlnum = mberRes.mbtlnum;
        this.passwordHint = mberRes.passwordHint;
        this.birthDay = mberRes.passwordCnsr;
        this.genderCode = mberRes.sexdstnCode;
        this.adres = mberRes.adres;
        this.sbscrbHsptlSeq = mberRes.sbscrbHsptlSeq;
        this.pushAt = mberRes.pushAt;
      } else {
        throw new Error("인자가 부족합니다만?");
      }
      return true;
    },
    setUserCommonInfoToData(userData: Record<string, any>) {
      this.mberSeq = userData.mberSeq;
      this.mberId = userData.mberId;
      this.mberEmailAdres = userData.mberEmailAdres;
      this.mberNm = userData.mberNm;
      this.mbtlnum = userData.mbtlnum;
      this.passwordHint = userData.passwordHint;
      this.birthDay = userData.passwordCnsr;
      this.genderCode = userData.sexdstnCode;
      this.adres = userData.adres;
      this.sbscrbHsptlSeq = userData.sbscrbHsptlSeq;
      this.pushAt = userData.pushAt;
    },
    watchMyPosition() {
      if ("geolocation" in navigator) {
        const options = {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        };
        watchID = navigator.geolocation.watchPosition(
          (position) => {
            console.log(position);
            this.myPosition = [
              position.coords.longitude,
              position.coords.latitude,
            ];
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
    clearWatch() {
      this.myPosition = null;
      navigator.geolocation.clearWatch(Number(watchID));
    },
    setPushAt(pushAt: string) {
      this.pushAt = pushAt;
    },
    resetUserInfo() {
      this.myPosition = null;
      this.mberSeq = 0;
      this.mberEmailAdres = "";
      this.mberNm = "";
      this.mbtlnum = "";
      this.passwordHint = "";
      this.birthDay = "";
      this.genderCode = "";
      this.adres = "";
      this.sbscrbHsptlSeq = "";
      this.pushAt = "";
      return true;
    },
  },
});

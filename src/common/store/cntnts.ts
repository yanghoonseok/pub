import { defineStore } from "pinia";
import { getData, getDataList } from "@/common/api/aplctn";
import { Aplctn } from "@/common/const/aplctn";
import { StringOrNumber } from "../models/common";
import { APPCODE } from "@/main/yungjin/models/appcode";

export const useContentStore = defineStore({
  id: "contents",
  persist: true,
  state: () => {
    return {
      bannerList: [], // 배너 리스트
      contentList: [], // 콘텐츠 관리 리스트
      popupList: [], // 팝업 리스트
    };
  },
  getters: {
    getContentList: (state) => {
      return state.contentList;
    },
    getContentItem: (state) => {
      return (contentSeq: string) =>
        state.contentList.find((v: { cntntsSeq: string }) => v.cntntsSeq == contentSeq);
    },
    getPopupList: (state) => {
      return state.popupList;
    },
    getPopupItem: (state) => {
      return (popupSeq: string) =>
        state.popupList.find(
          (v: { popupSeq: string }) => v.popupSeq == popupSeq
        );
    },
    getNonPopupList: (state) => {
      return state.popupList.filter(
        (v: { isStop: boolean }) => v.isStop === false
      );
    },
    getBannerList: (state) => {
      return state.bannerList;
    },
    getBannerItem: (state) => {
      return (bannerSeq: string) =>
        state.bannerList.find((v: { seq: string }) => v.seq == bannerSeq);
    },
  },
  actions: {
    async initBannerList() {
      const bannerList = await getDataList({ app: Aplctn.banner });
      this.bannerList = bannerList;
    },
    async initContentList() {
      const contentList = await getDataList({ app: Aplctn.cntnts });
      this.contentList = contentList;
    },
    async initPopupList() {
      const popupDataList = await getDataList({ app: APPCODE.POPUP });
      const popupList = popupDataList.map((v) => {
        v.isStop = false;
        return v;
      });
      this.popupList = popupList;
    },
    setStopPopupItem(popupSeq: string) {
      const popupItem = this.popupList.find(
        (v: { popupSeq: StringOrNumber }) => v.popupSeq == popupSeq
      );
      console.log(popupSeq);
      console.table(popupItem);
      popupItem.isStop = true;
    },
    async allInitContent() {
      await Promise.all([
        this.initBannerList(),
        this.initContentList(),
        this.initPopupList(),
      ]);
    },
  },
});

import { StringOrNumber } from "../models/common";

var MapNavi = {
  openKakao: function (
    spt: string,
    slat: StringOrNumber,
    slng: StringOrNumber,
    dpt: string,
    dlat: StringOrNumber,
    dlng: StringOrNumber
  ) {
    location.href = encodeURI(
      "https://map.kakao.com/link/from/" +
        spt +
        "," +
        slat +
        "," +
        slng +
        "/to/" +
        dpt +
        "," +
        dlat +
        "," +
        dlng
    );
  },
  openNaver: function (
    spt: string,
    slat: StringOrNumber,
    slng: StringOrNumber,
    dpt: string,
    dlat: StringOrNumber,
    dlng: StringOrNumber
  ) {
    location.href = encodeURI(
      "http://map.naver.com/index.nhn?slng=" +
        slng +
        "&slat=" +
        slat +
        "&stext=" +
        spt +
        "&elng=" +
        dlng +
        "&elat=" +
        dlat +
        "&etext=" +
        dpt +
        "&menu=route&pathType=1"
    );
  },
  openGoogle: function (
    spt: string,
    slat: StringOrNumber,
    slng: StringOrNumber,
    dpt: string,
    dlat: StringOrNumber,
    dlng: StringOrNumber
  ) {
    location.href = encodeURI(
      "https://maps.google.com/?saddr=" +
        slat +
        "," +
        slng +
        "&daddr=" +
        dlat +
        "," +
        dlng
    );
  },
};

export { MapNavi };

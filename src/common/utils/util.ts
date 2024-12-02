import { Position } from "@/common/models/native";
import {
  Fn,
  NullableNumber,
  StringOrNumber,
  Os,
  cryptoInfo,
} from "@/common/models/common";
import dateFormat from "dateformat";
import { StringOrNull } from "../models/common";
import noImage from "@/common/assets/no_image.jpg";
import crypto from "crypto";

const getExportValues = (requireContextValue: any) =>
  requireContextValue.default || requireContextValue;

const getModuleName = (filePath: string) =>
  filePath
    .replace(/^\.\//, "")
    .replace(/\.(ts|js)$/, "")
    .replace(/^.*[\\\/]/, "");

const getOs = (): Os => {
  var userAgent = window.navigator.userAgent,
    os = null;

  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    os = Os.PC;
  } else if (/Win32|Win64|Windows|WinCE/.test(userAgent)) {
    os = Os.PC;
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    os = Os.iOS;
  } else if (/Android/.test(userAgent)) {
    os = Os.ANDROID;
  } else if (!os && /Linux/.test(userAgent)) {
    os = Os.PC;
  }

  return os;
};

const getDate = (format: string, value: StringOrNumber) => {
  if (typeof value === "number") {
    return dateFormat(new Date(value), format) ?? "";
  } else {
    var regex = RegExp(
      /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31) ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/g
    );
    if (regex.test(value)) {
      return dateFormat(value.replace(" ", "T"), format) ?? "";
    } else {
      return dateFormat(value, format) ?? "";
    }
  }
};

const getDateDiff = (begin: string, end: string) => {
  return Math.round(
    (Date.parse(end) - Date.parse(begin)) / (1000 * 60 * 60 * 24)
  );
};

const msToTime = (format: string, duration: number) => {
  let seconds: StringOrNumber = (duration / 1000) % 60,
    minutes: StringOrNumber = (duration / (1000 * 60)) % 60,
    hours: StringOrNumber = duration / (1000 * 60 * 60);
  hours = hours < 10 ? "0" + hours : hours + "";
  minutes = minutes < 10 ? "0" + minutes : minutes + "";
  seconds = seconds < 10 ? "0" + seconds : seconds + "";
  //HH MM SS
  return format
    .replace("HH", hours)
    .replace("H", hours.replace(/^0/, ""))
    .replace("MM", minutes)
    .replace("M", minutes.replace(/^0/, ""))
    .replace("SS", seconds)
    .replace("S", seconds.replace(/^0/, ""));
};

const getContent = (replaceArr: string[], content: any) => {
  return replaceArr.reduce(
    (result, element: any) => result.replace(element.from, element.to),
    content
  );
};

const getServerUrl = (): string => {
  return getBaseUrl(process.env.NODE_ENV);
}

const getImageUrl = (imageFileSeq: string, fileSn: StringOrNumber) => {
  return (
    `${getBaseUrl(
      process.env.NODE_ENV
    )}cmm/fms/getImage.do?atchFileSeq=${imageFileSeq}` +
    (fileSn || fileSn == "0" ? "&fileSn=" + fileSn : "")
  );
};

const getMovieUrl = (movieFileSeq: string, fileSn: StringOrNumber) => {
  return (
    `${getBaseUrl(
      process.env.NODE_ENV
    )}cmm/fms/getMovie.do?atchFileSeq=${movieFileSeq}` +
    (fileSn || fileSn == "0" ? "&fileSn=" + fileSn : "")
  );
};

const getSvgUrl = (svgFileSeq: string) => {
  return `${getBaseUrl(
    process.env.NODE_ENV
  )}cmm/fms/getSvg.do?atchFileSeq=${svgFileSeq}`;
};

const getPdfUrl = (pdfFileSeq: string) => {
  return `${getBaseUrl(
    process.env.NODE_ENV
  )}cmm/fms/getPdf.do?atchFileSeq=${pdfFileSeq}`;
};

const imgLoadError = async (e: Event) => {
  (e.target as HTMLImageElement).src = noImage;
};

const getBaseUrl = (nodeEnv: string) => {
  if (nodeEnv == "production") {
    return import.meta.env.VUE_APP_PRODUCT_URL;
  } else if (nodeEnv == "development") {
    return import.meta.env.VUE_APP_DEV_URL;
  } else {
    return import.meta.env.VUE_APP_LOCAL_URL;
  }
};

//test/page/qwdf     >> [a,b,c]
const getRouterParamFromUrl = (url: string) => {
  if (url) {
    if (url.indexOf("?") !== -1) {
      const arr = url.trim().split("?");
      const name: StringOrNull = arr[0];
      const parameters = arr[1].split("&"); //[app=1, ddd=2] > app: 1 ddd: 2
      const query = parameters.reduce((preVal: any, curVal) => {
        preVal[curVal.split("=")[0]] = curVal.split("=")[1];
        return preVal;
      }, {});

      const result = {
        name,
        query,
      };
      return result;
    } else {
      return {
        name: url,
      };
    }
  } else {
    throw new Error("url이 비어있습니다.");
  }
};

const getRouterParamArrFromUrl = (url: string) => {
  if (url) {
    return url.split("/").map((e) => getRouterParamFromUrl(e));
  } else {
    throw new Error("url이 비어있습니다.");
  }
};

const toRgba = (hex: string, opacity: number) => {
  let value = hex.replace("#", "");

  value.length === 3 &&
    (value =
      value.charAt(0) +
      value.charAt(0) +
      value.charAt(1) +
      value.charAt(1) +
      value.charAt(2) +
      value.charAt(2)),
    value.match(/[a-f\d]{2}/gi),
    (opacity === undefined || opacity > 1) && (opacity = 1);

  return `rgba(${parseInt(value[0], 16)},${parseInt(value[1], 16)},${parseInt(
    value[2],
    16
  )},${opacity})`;
};

//[lo, la], [lo, la]
const getDistance = (pos1: Position, pos2: Position) => {
  const lng1 = pos1[0];
  const lat1 = pos1[1];
  const lng2 = pos2[0];
  const lat2 = pos2[1];

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Math.floor(R * c * 1000);
  return d;
};

const getPosition = (str: string) => {
  return str
    .trim()
    .replace(/[POINT\\(\\)]/g, "")
    .split(" ");
};

const getLocaleString = (str: string) => {
  return Number(str + "").toLocaleString();
};

//암호화
const encrypt = (text: string) => {
  const iv = crypto.randomBytes(cryptoInfo.IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(cryptoInfo.ENCRYPTION_KEY),
    iv
  );
  const encrypted = cipher.update(text);

  return (
    iv.toString("hex") +
    ":" +
    Buffer.concat([encrypted, cipher.final()]).toString("hex")
  );
};
//복호화
const decrypt = (text: string) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift() as string, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(cryptoInfo.ENCRYPTION_KEY),
    iv
  );
  const decrypted = decipher.update(encryptedText);

  return Buffer.concat([decrypted, decipher.final()]).toString();
};

const checkType = (obj: any, typeObj: any) => {
  console.log("qweqwe");
  return (
    Object.keys(obj).filter((key) => {
      console.log(obj[key], typeObj[key]);
      return typeof obj[key] !== typeObj[key];
    }).length === 0
  );
};

const sleep = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

//base64 to file
const dataURLtoFile = (dataurl: string, fileName: string) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

//file to base64
const fileToDataURL = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target!.result);
    };

    reader.onerror = (e) => {
      reject(e);
    };

    reader.readAsDataURL(file);
  });
};

//http url to file
const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = { type: `image/jpg` };
  return new File([data], "image.jpg", metadata);
};

//debouce
let timer: NodeJS.Timeout | null = null;
const debounce = (callBack: Fn, ms: number) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    callBack();
    timer = null;
  }, ms || 500);
};

const replaceToXml = (str: string) => {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#46;/g, "%2E")
    .replace(/&#47;/g, "%2F");
};

const enterToBr = (str: string = "") => {
  return str.replaceAll("\n", "<br/>");
};

export {
  getExportValues,
  getModuleName,
  getOs,
  getDate,
  getDateDiff,
  msToTime,
  getContent,
  getServerUrl,
  getImageUrl,
  getMovieUrl,
  getSvgUrl,
  getPdfUrl,
  imgLoadError,
  getBaseUrl,
  getRouterParamFromUrl,
  getRouterParamArrFromUrl,
  toRgba,
  getDistance,
  getPosition,
  getLocaleString,
  //   validForm,
  encrypt,
  decrypt,
  checkType,
  sleep,
  dataURLtoFile,
  fileToDataURL,
  convertURLtoFile,
  debounce,
  replaceToXml,
  enterToBr,
};

import { AppError, ErrorCode } from "./error";
import { checkType } from "../utils/util";
enum PG {
  KCP = "kcp",
  DANAL = "DANAL",
  INICIS = "INICIS",
  UDPAY = "UDPAY",
  NICEPAY = "NICEPAY",
  LGUP = "LGUP",
  PAYAPP = "PAYAPP",
  KAKAO = "KAKAO",
  PAYCO = "PAYCO",
  KICC = "KICC",
  EASYPAY = "EASYPAY",
  JTNET = "JTNET",
  TPAY = "TPAY",
  MOBILIANS = "MOBILIANS",
  PAYLETTER = "PAYLETTER",
  ONESTORE = "ONESTORE",
  WELCOME = "WELCOME",
  BOOTPAY = "BOOTPAY",
  TOSS = "TOSS",
}

enum Method {
  CARD = "card",
  BANK = "bank",
  KAKAO = "kakao", // 카카오 직접호출
  NPAY = "npay", // 네이버페이
  CARD_REBILL = "card_rebill", // 정기 결제
}

class Order {
  constructor({
    unique,
    name,
    price,
    method,
    user,
    coupon = null,
    beginDt,
    sessionId,
  }) {
    const obj = {
      unique,
      name,
      price,
      method,
      user,
      coupon,
      beginDt,
      sessionId,
    };
    console.log("obj :: ", obj);
    const successTypeCheck = checkType(obj, {
      unique: "string",
      name: "string",
      price: "number",
      method: "string",
      user: "object",
      coupon: "object",
      beginDt: "string",
      sessionId: "string",
    });

    if (successTypeCheck === false) {
      console.error("order 만들 때 타입 에러 좀 맞춰주세요.");
      throw new AppError(ErrorCode.DEFAULT_ERROR);
    }

    this.unique = unique;
    this.name = name;
    this.price = price;
    this.method = method;
    this.user = user;
    this.coupon = coupon;
    this.beginDt = beginDt;
    this.sessionId = sessionId;
  }
}

class User {
  id: any;
  username: any;
  constructor({ id, username, email, area, phone }) {
    const obj = { id, username, email, area, phone };
    console.log("obj :: ", obj);
    const successTypeCheck = checkType(obj, {
      id: "string",
      username: "string",
      email: "string",
      area: "string",
      phone: "string",
    });

    console.log("success :: ", successTypeCheck);
    if (successTypeCheck === false) {
      console.error("user 만들 때 타입 에러 좀 맞춰주세요.");
      throw new AppError(ErrorCode.DEFAULT_ERROR);
    }

    this.id = id;
    this.username = username;
    this.email = email;
    this.area = area;
    this.phone = phone;
  }
}

class Coupon {
  constructor({ code, amount, isFree }) {
    const obj = { code, amount, isFree };
    const successTypeCheck = checkType(obj, {
      code: "string",
      amount: "number",
      isFree: "boolean",
    });

    console.log("success :: ", successTypeCheck);
    if (successTypeCheck === false) {
      console.error("coupon 만들 때 타입 에러 좀 맞춰주세요.");
      throw new AppError(ErrorCode.DEFAULT_ERROR);
    }
    this.code = code;
    this.amount = amount;
    this.isFree = isFree;
  }
}

//success, cancel, payError, validError, lessThanLimitPrice
const BootpayCode = {
  SUCCESS: "BOOTPAY_SUCCESS",
  CANCEL: "BOTPAY_CANCEL",
  PAY_ERROR: "BOOTPAY_PAY_ERROR",
  VALID_ERROR: "BOOTPAY_VALID_ERROR",
  LESS_THAN_LIMIT_PRICE: "LESS_THAN_LIMIT_PRICE",
};

export { PG, Method, Order, User, Coupon, BootpayCode };

import { User } from "@/common/models/user";

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

interface Coupon {
  code: "string";
  amount: "number";
  isFree: "boolean";
}

interface BootpayUser {
  unique?: string;
  name?: string;
  price?: number;
  method?: string;
  user?: User;
  coupon?: Coupon;
  beginDt?: string;
  sessionId?: string;
}

interface Order {
  unique?: string;
  name?: string;
  price?: number;
  method?: string;
  user?: BootpayUser;
  coupon?: Coupon;
  beginDt?: string;
  sessionId?: string;
}

enum BootpayCode {
  SUCCESS = "BOOTPAY_SUCCESS",
  CANCEL = "BOTPAY_CANCEL",
  PAY_ERROR = "BOOTPAY_PAY_ERROR",
  VALID_ERROR = "BOOTPAY_VALID_ERROR",
  LESS_THAN_LIMIT_PRICE = "LESS_THAN_LIMIT_PRICE",
}

export { PG, Method, Coupon, BootpayUser, Order, BootpayCode };

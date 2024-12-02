import { Dic, Fn } from "./common";
enum ErrorCode {
  DEFAULT_ERROR = "default-error",
  PERMISSION_ERROR = "permission-error",
  NETWORK_ERROR = "network-error",
  ALREADY_REGISTER = "already-register",
  NOT_VALID_TOKEN = "not-valid-token",
  NO_ROUTE_NAME = "no-route-name",
  WITHDRAWAL_USER_ERROR = "withdrawal-user-error",
  THIS_TOKEN_IS_FALSIFIED = "this-token-is-falsified",
  SERVER_FALSE_ERROR = "server-false-error",
  NOT_ENOUGH_PARAMETER = "not-enough-parameter",
  NOT_ABLE_TO_MY_POSITION = "not-able-to-my-position",
  NOT_UNIQUE_NICKNAME = "not-unique-nickname",
  NOT_FOUND = "not-found",
}

const ErrorMessage = {
  "default-error": "정보 처리중 에러가 발생했습니다.",
  "permission-error": "권한을 모두 허용해주세요.",
  "network-error": "네트워크 연결을 확인해주세요.",
  "already-register": "이미 다른 SNS로 가입되어 있습니다.",
  "not-valid-token": "유효하지 않은 토큰입니다.",
  "no-route-name": "",
  "withdrawal-user-error": "탈퇴한 회원입니다.",
  "this-token-is-falsified": "토큰이 위조되었습니다.",
  "server-false-error": "서버와의 통신 중 오류가 발생했습니다.",
  "not-enough-parameter": "서버 요청 정보가 부족합니다.",
  "not-able-to-my-position": "내 위치를 받아올 수 없습니다.",
  "not-unique-nickname": "중복된 닉네임입니다.",
  "not-found": "데이터를 불러올 수 없습니다.",
};

interface ErrorParam {
  error: AppError;
  callbackObj: Dic<string>;
  defaultCallback: Fn;
  basicText: string;
}

class AppError extends Error {
  code: ErrorCode;
  constructor(errorCode: ErrorCode, errorMessage = "") {
    const message = errorMessage || (ErrorMessage[errorCode] ?? "");
    super(message);
    this.name = "알림";
    this.code = errorCode;
  }
}

export { ErrorCode, ErrorMessage, AppError, ErrorParam };

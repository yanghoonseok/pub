interface InputType{
  TEXT: "text",
  CHECK_BOX: "check_box",
  RADIO: "radio",
  EMAIL: "email",
  PHONE_NUM: "phoneNum",
};

interface ValidCode{
  SUCCESS: "SUCCESS",
  NO_VALUE: "NO_VALUE",
  TOO_SHORT: "TOO_SHORT",
  TOO_LONG: "TOO_LONG",
  DUPLICATION: "DUPLICATION",
  NOT_CHECK: "NOT_CHECK",
  NOT_EMAIL_FORM: "NOT_EMAIL_FORM",
  NOT_PHONE_NUM_FORM: "NOT_PHONE_NUM_FORM",
  CUSTOM_ERROR: "CUSTOM_ERROR",
  OVER_CHOICE: "OVER_CHOICE",
  LESS_CHOICE: "LESS_CHOICE",
};

interface ValidMessage {
  SUCCESS: "",
  NO_VALUE: "값을 입력해주세요.",
  TOO_SHORT: "너무 짧다.",
  TOO_LONG: "너무 길다.",
  DUPLICATION: "중복되었다.",
  NOT_CHECK: "체크 안했다.",
  NOT_EMAIL_FORM: "정확한 이메일 주소로 입력하세요.",
  NOT_PHONE_NUM_FORM: "휴대폰 형식이 아니다.",
  CUSTOM_ERROR: "커스텀커스텀",
  OVER_CHOICE: "체크를 너무 많이 했다.",
  LESS_CHOICE: "체크를 너무 적게 했다.",
};

const RegexVal = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE_NUM: /^010\d{8}$/,
  HASHTAGS: /(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)$/,
};

export { InputType, ValidCode, ValidMessage, RegexVal };

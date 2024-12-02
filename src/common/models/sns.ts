enum SnsType {
  KAKAO = "KAKAO",
  NAVER = "NAVER",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  TEST = "TEST",
}

enum SnsCode {
  SUCCESS = "SNS_SUCCESS",
  CANCEL = "SNS_CANCEL",
  EMPTY_USER_INFO = "SNS_EMPTY_USER_INFO",
  KAKAO_INSTALLED_BUT_NOT_LOGIN = "SNS_KAKAO_INSTALLED_BUT_NOT_LOGIN",
  NOT_INSTALLED_KAKAOTALK = "NOT_INSTALLED_KAKAOTALK",
  EMPTY_TOKEN = "SNS_EMPTY_TOKEN",
  NOT_LOGIN = "SNS_NOT_LOGIN",
  NOT_SUPPORTED_LOGIN_TYPE = "SNS_NOT_SUPPORTED_LOGIN_TYPE",
  DEFAULT_ERROR = "SNS_DEFAULT_ERROR",
}

enum SnsErrorMessage {
  CANCEL = "로그인이 취소 되었습니다.",
  EMPTY_USER_INFO = "사용자 정보 제공에 모두 동의해주세요.",
  KAKAO_INSTALLED_BUT_NOT_LOGIN = "카카오톡 앱에서 로그인을 먼저 진행해주세요.",
  NOT_INSTALLED_KAKAOTALK = "카카오톡이 설치되어 있지 않습니다.",
  EMPTY_TOKEN = "SNS 토큰 값이 비어있습니다.",
  NOT_LOGIN = "로그인이 되지 않았습니다.",
  NOT_SUPPORTED_LOGIN_TYPE = "지원하지 않는 SNS 로그인입니다.",
  DEFAULT_ERROR = "SNS 로그인 처리 중 오류가 발생했습니다.",
}

enum InstagramCode {
  SUCCESS = "INSTAGRAM_SUCCESS",
  CANCEL = "INSTAGRAM_CANCEL",
  ISOUTROUTE = "INSTAGRAM_OUT_ROUTE",
}

enum InstagramMessage {
  SUCCESS = "인스타그램이 연동되었습니다.",
  CANCEL = "인스타그램 연동 실패",
  ISOUTROUTE = "외부링크가 접근되었습니다.",
}

export { InstagramCode, InstagramMessage, SnsCode, SnsType, SnsErrorMessage };

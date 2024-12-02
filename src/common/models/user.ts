enum SnsType {
  KAKAO = "kakao",
  NAVER = "naver",
  GOOGLE = "google",
  APPLE = "apple",
}
// TODO 괜찮을지 확인해보기!
interface User {
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
  // ! 위 속성은 거의 안쓰임!
  mberSeq?: number;
  mberId?: string;
  mberNm?: string;
  mberEmailAdres?: string;
  mbtlnum?: string;
  deviceId?: string;
  password?: string;
  token?: string;
  type?: SnsType;
  sessionId?: string;
}

export { SnsType, User };

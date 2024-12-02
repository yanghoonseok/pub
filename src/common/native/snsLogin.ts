import { User } from "@/common/models/user";
const getLoginInfo = ({ type }: User) => {
  return {
    code: "SNS_SUCCESS",
    token:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NDA1MmEyYjY0NDg3NDU3NjRlNzJjMzU5MDk3MWQ5MGNmYjU4NWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNjk4MTc4OTY0NzItcmZlY2k2MHQ4dnY4ODVoZW1tOGtsZmNtcDBia3JrMW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNjk4MTc4OTY0NzItcmZlY2k2MHQ4dnY4ODVoZW1tOGtsZmNtcDBia3JrMW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAzMDgzMTY5ODg0NTI3OTAyMDkiLCJlbWFpbCI6ImtpbWhqMDAwMzA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoia3pWcmVjX0Y1M0dFcGVXdzRQZWc5dyIsImlhdCI6MTY3NTMyMzg2OCwiZXhwIjoxNjc1MzI3NDY4fQ.Dz1mSd4dV5ZhwweRRk78ukStfFipnBYGC0c18r2xaibt8CDDO2JRle3ZfIiRFhFP0Xtbvw1gylljbfIdUKQXge8ZpcxHwjCkHtoZZEO474xHEUd8G1smrxC2xaiOhQf9_Oo9dxAew05-IA8BocD7Mz_lDhFe4Oo7ckS9DG0IXVdYNd7LRU5kQMzaFu8sWGHexTimPj0dlSGJ-IV29oGOC77kBmBwwMZUrlJDxN2mAMqQNx-hynH8BmldOZJJB2jBsGmAJxNoxILjw47QtQrtCKfhBHl3GbixBITtAqAbOmcbXVON4GK-jtEqWE-URpz2kBh1KyitM90veRb2GZqWIw",
    snsType: "GOOGLE",
    user: {
      email: "rlaguswls0804@naver.com",
      nickname: "gg",
      id: "ddd",
    },
  };
};

const expireLoginInfo = () => {
  return true;
};

export default { getLoginInfo, expireLoginInfo };

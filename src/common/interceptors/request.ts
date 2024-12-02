import { useNetworkStore } from './../../main/snu/store/network';
import { AxiosProxyConfig, AxiosRequestConfig } from "axios";
import localforage from "localforage";
//import basic from "@/common/native/basic";

//const { checkNetwork } = basic;

const sessionInterceptor = async (config: AxiosRequestConfig) => {
  const sessionId =
    sessionStorage.getItem("sessionId") ||
    (await localforage.getItem("sessionId"));

  console.log(config.url, sessionId);
  if (config.method === "post" && sessionId) {
    config.data.append("sessionId", sessionId);
  }
  if (config.method === "get" && sessionId) {
    config.params.sessionId = sessionId;
  }
};

// 오프라인 전환하면 다음 함수를 실행하지 않아서 제거
// const checkNetworkInterceptor = async (config: AxiosRequestConfig) => {
//   const networkStore = useNetworkStore();
//   let isNetwork: boolean = true;
//   const connection: Record<string, any> = await localforage.getItem("connect");

//   if (window.flutter_inappwebview) {
//     isNetwork = await window.flutter_inappwebview.callHandler("checkNetwork", "");
//   }
//   else {
//     isNetwork = await checkNetwork();
//   }
//   // 네트워크 상태가 바뀌었을때만 실행
//   if (connection?.isConnect != isNetwork) {
//     let connectParams: Record<string, any> = {
//       isConnect: isNetwork,
//       prevConnect: connection?.isConnect ?? true,
//     };

//     if (isNetwork == false) {
//       connectParams.offlineTime =
//         isNetwork === false && connection?.offlineTime
//           ? connection.offlineTime
//           : new Date().toISOString();
//     } else {
//       connectParams.offlineTime = connection?.offlineTime ?? "";
//     }

//     await networkStore.setConnect(connectParams);
//   }

//   if (!isNetwork) {
//     return;
//   }
// };

export { sessionInterceptor };


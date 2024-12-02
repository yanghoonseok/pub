import { AppRequest } from "@/common/models/api";
import { getData } from "@/common/api/aplctn";
import { Aplctn } from "@/common/const/aplctn";

import * as localforage from "localforage";

const getCntnts = async ({ seq, useCache }: AppRequest) => {
  if (!seq) {
    return null;
  }
  let cntnts = null;
  let cntntsKey = "cntnts-" + seq;
  if (useCache) {
    cntnts = await localforage.getItem(cntntsKey);
  }
  if (!cntnts) {
    let data = await getData({ app: Aplctn.cntnts, seq });
    if (data) {
      cntnts = data.histCntnts;
      if (useCache) {
        localforage.setItem(cntntsKey, cntnts);
      }
    }
  }
  return cntnts;
};

export { getCntnts };

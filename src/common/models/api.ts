import { StringOrNumber } from "@/common/models/common";
interface AppRequest {
  app?: number;
  seq?: StringOrNumber;
  params?: any;
  useCache?: boolean;
}

export { AppRequest };

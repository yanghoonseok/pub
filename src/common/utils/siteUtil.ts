import { native } from "./flutter_native";

const getSiteImageUrl = async (imagePath: string) => {
  const dummyUrl = new URL(`/src`, import.meta.url);
  const nativeBaseUrl = await native.basic.getLocalPath();
  console.log(nativeBaseUrl);
  return new URL(
    `${nativeBaseUrl}src/${
      import.meta.env.VUE_APP_PROJECT_NAME
    }/assets/images/${imagePath}`,
    dummyUrl.origin
  );
};

export { getSiteImageUrl };

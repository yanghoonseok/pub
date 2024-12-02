import native2 from "./native2";

const test = () => {
  console.log("test");
};

const test1 = () => {
  console.log("test1");
};

export default { test, test1, ...native2 };

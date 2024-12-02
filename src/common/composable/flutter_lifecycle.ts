enum FlutterLifeCycle {
  onInit = "onInit",
  onPaused = "onPaused",
  onResumed = "onResumed",
  onDetached = "onDetached",
  onInactive = "onInactive",
}

export const useFlutterLifeCycle = () => {
  return {
    //flutter View 생성
    onInit: (cb: Function) => {
      window.addEventListener(FlutterLifeCycle.onInit, (event: any) => {
        console.log("onInit", event);
        cb(event);
      });
    },
    //앱 비활성화
    onPaused: (cb: Function) => {
      window.addEventListener(FlutterLifeCycle.onPaused, (event: any) => {
        console.log("onPaused", event);
        cb(event);
      });
    },
    //앱 재활성화
    onResumed: (cb: Function) => {
      window.addEventListener(FlutterLifeCycle.onResumed, (event: any) => {
        console.log("onResumed", event);
        cb(event);
      });
    },
    //flutter View 파괴
    onDetached: (cb: Function) => {
      window.addEventListener(FlutterLifeCycle.onDetached, (event: any) => {
        console.log("onDetached", event);
        cb(event);
      });
    },
    //앱 비활성화 상태
    onInactive: (cb: Function) => {
      window.addEventListener(FlutterLifeCycle.onInactive, (event: any) => {
        console.log("onInactive", event);
        cb(event);
      });
    },
  };
};

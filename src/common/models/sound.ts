export interface SoundArg {
  //네이티브 파일 경로
  filePath: string;
  //서브 사운드 여부
  isSubSound?: boolean;
  //assets파일 접급이면 true, 디바이스 파일 접근이면 null OR false
  isAssets?: boolean;
}

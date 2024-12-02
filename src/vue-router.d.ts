export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    header?: Record<string,any>
    isShowBottomNavBar? : boolean
  }
}
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'prismjs' {
  import prismjs from 'prismjs'
  export default prismjs
}
declare module 'marked' {
  import marked from 'marked'
  export default marked
}
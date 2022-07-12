// 判断是否是ie浏览器，不兼容ie
export const isIE =  () => {
    const bw = window.navigator.userAgent
    const compare = (s) => bw.indexOf(s) >= 0
    const ie11 = (() => 'ActiveXObject' in window)()
    return compare('MSIE') || ie11
  }

  export default isIE;
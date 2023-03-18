import { css } from 'styled-components'

export const aspectRatioHack = (w, h) => {
  return css`
      aspect-ratio: ${w}/${h};
      padding: calc(100% / ${w} * ${h} / 2) 0;
  `;
}

export const responsive = (type, rules) => {

  if (type === "mobile") {
    return css`
        @media screen and ${p => p.theme.breakpoints.mobile} {
          ${rules}
        }      
      `;
  }
}

export const getWidth = (text:string, fontSize:any) => {
  // 创建临时元素
  const _span = document.createElement('span')
  // 放入文本
  _span.innerText = text
  // 设置文字大小
  _span.style.fontSize = fontSize;
  // span元素转块级
  _span.style.position = 'absolute'
  // span放入body中
  document.body.appendChild(_span)
  // 获取span的宽度
  let width = _span.offsetWidth
  // 从body中删除该span
  document.body.removeChild(_span)
  // 返回span宽度
  return width
}

export const mobileBreakpoint = rules => responsive("mobile", rules);
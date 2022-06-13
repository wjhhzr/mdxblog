import { css } from 'styled-components'


export const responsive = (type, rules) => {
    
    if (type === "mobile") {
        return css`
        @media screen and ${p => p.theme.breakpoints.mobile} {
          ${rules}
        }      
      `;
    }
}

export const mobileBreakpoint = rules => responsive("mobile", rules);
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
let initalMode = `!function(){const e=function(){const e=window.localStorage.getItem("color-mode");if("string"==typeof e)return e;const g=window.matchMedia("(prefers-color-scheme: dark)"),d="boolean"==typeof g.matches;return console.log(g),d&&g.matches?"dark":"light"}(),g=document.documentElement;Object.entries({light:{color:{text:"hsl(222deg, 22%, 5%)",background:"hsl(0deg, 0%, 100%)","blurred-background":"hsla(0deg, 0%, 100%, 0.85)",primary:"hsl(245deg, 100%, 60%)",secondary:"hsl(333deg, 100%, 45%)",tertiary:"hsl(255deg, 85%, 30%)",decorative:"hsl(200deg, 75%, 65%)",muted:"hsl(210deg, 55%, 92%)","muted-background":"hsla(210deg, 55%, 92%, 0.85)",info:"hsl(245deg, 100%, 60%)",success:"hsl(160deg, 100%, 40%)","success-background":"hsla(160deg, 100%, 40%, 0.1)",error:"hsl(340deg, 95%, 50%)","error-background":"hsla(340deg, 95%, 43%, 0.1)",alert:"hsl(37deg, 100%, 50%)","alert-background":"hsla(52deg, 100%, 50%, 0.25)","venn-0":"hsl(190deg, 100%, 65%)","venn-1":"hsl(340deg, 100%, 65%)","gray-100":"hsl(225deg, 25%, 95%)","gray-200":"hsl(225deg, 16%, 90%)","gray-300":"hsl(225deg, 8%, 80%)","gray-400":"hsl(225deg, 8%, 70%)","gray-500":"hsl(225deg, 7%, 60%)","gray-600":"hsl(225deg, 15%, 50%)","gray-700":"hsl(225deg, 12%, 40%)","gray-900":"hsl(225deg, 25%, 20%)","gray-1000":"hsl(225deg, 15%, 15%)","subtle-background":"hsl(225deg, 25%, 95%)","subtle-floating":"hsl(0deg, 0%, 100%)","homepage-light":"hsl(204deg, 67%, 85%)","homepage-dark":"hsl(202deg, 71%, 90%)","homepage-bg":"hsl(204deg, 67%, 85%)"},syntax:{bg:"hsl(225deg, 25%, 97%)",highlight:"hsl(225deg, 25%, 93%)",txt:"#2A2A2A",comment:"#467790",prop:"#da0079",bool:"#bf00b8",val:"#78909C",str:"#651fff",name:"#AA00FF",del:"rgb(255, 85, 85)",regex:"#3600d6",fn:"#3D5AFE"},prefers:{dark:!1}},dark:{color:{text:"hsl(0deg, 0%, 100%)",background:"hsl(210deg, 30%, 8%)","blurred-background":"hsla(210deg, 30%, 8%, 0.85)",primary:"hsl(230deg, 100%, 67%)",secondary:"hsl(333deg, 100%, 52%)",tertiary:"hsl(53deg, 100%, 50%)",decorative:"hsl(200deg, 50%, 60%)",muted:"hsl(210deg, 38%, 15%)","muted-background":"hsla(210deg, 38%, 15%, 0.85)",info:"hsl(230deg, 100%, 67%)",success:"hsl(160deg, 100%, 40%)","success-background":"hsla(160deg, 100%, 40%, 0.1)",error:"hsl(340deg, 95%, 60%)","error-background":"hsla(340deg, 95%, 43%, 0.1)",alert:"hsl(30deg, 100%, 50%)","alert-background":"hsla(38deg, 100%, 50%, 0.1)","venn-0":"hsl(250deg, 100%, 50%);","venn-1":"hsl(175deg, 100%, 50%)","gray-100":"hsl(210deg, 15%, 20%)","gray-200":"hsl(210deg, 15%, 25%)","gray-300":"hsl(210deg, 10%,40%)","gray-400":"hsl(210deg, 9%, 45%)","gray-500":"hsl(210deg, 8%, 50%)","gray-600":"hsl(210deg, 12%, 55%)","gray-700":"hsl(210deg, 14%, 66%)","gray-900":"hsl(210deg, 25%, 88%)","gray-1000":"hsl(210deg, 25%, 96%)","subtle-background":"hsl(210deg, 30%, 8%)","subtle-floating":"hsl(210deg, 22%, 15%)","homepage-light":"hsla(200deg, 100%, 85%, 0)","homepage-dark":"hsla(200deg, 100%, 85%, 0.1)","homepage-bg":"hsl(210deg, 30%, 8%)"},syntax:{bg:"hsl(210deg, 30%, 12%)",highlight:"hsl(210deg, 30%, 18%)",txt:"#FFF",comment:"#6c8998",prop:"#FF39A8",bool:"#FFD600",val:"#61747D",str:"rgb(155, 109, 255)",name:"#C653FF",del:"#FF5555",regex:"#ffd700",fn:"rgb(0, 190, 255)"},prefers:{dark:!0}}}[e]).forEach((([e,d])=>{Object.entries(d).forEach((([d,s])=>{const l="--"+e+"-"+d;g.style.setProperty(l,s)}))}))}();`;
let init =`
(()=>{
    /* 初始化主题 */
    function getInitialColorMode() {
        const persistedColorPreference = window?.localStorage.getItem("color-mode");
        const hasPersistedPreference = typeof persistedColorPreference === "string";

        if (hasPersistedPreference) {
            return persistedColorPreference;
        }

        // 如果不存在用户的偏好，查询系统设置
        const mql = window?.matchMedia("(prefers-color-scheme: dark)");
        const hasMediaQueryPreference = typeof mql.matches === "boolean";

        if (hasMediaQueryPreference) {
            return mql.matches ? "dark" : "light";
        }

        // 默认返回白天模式
        return "light";
    }
    const colorMode = getInitialColorMode();
    let bodyClass = window.document.body.classList
    colorMode === "dark" ? bodyClass.add("dark") : bodyClass.remove("dark")
})()
`
class AntDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        // 1.这里采用react里High Order Component的方式，可以重新包装APP和所有渲染的组件
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => (props) =>
                        // App挂载样式
                        sheet.collectStyles(<><App {...props} /></>)
                })
            // 因为覆盖了Document，所以要重新返回页面的props
            const props = await Document.getInitialProps(ctx)
            return {
                ...props,
                styles: <>{props.styles}{sheet.getStyleElement()}</>
            }
        } finally {
            sheet.seal()
        }
    }
    render() {
        return (
            <Html lang="zh" style={{background:"var(--color-background)"}} >
                <Head>
                </Head>
                <body >
                    <script dangerouslySetInnerHTML={{ __html: initalMode }} >
                    </script>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default AntDocument

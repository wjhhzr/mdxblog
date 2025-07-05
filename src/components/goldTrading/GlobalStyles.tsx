import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }


  /* 输入框样式 */
  input, select, textarea {
    font-family: inherit;
  }

  /* 按钮样式 */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* 链接样式 */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 选择文本样式 */
  ::selection {
    background: rgba(102, 126, 234, 0.3);
    color: #1a1a1a;
  }

  /* 焦点样式 */
  :focus {
    outline: none;
  }

  /* 动画 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 13px;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    body {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
      color: #ffffff;
    }
  }
`; 
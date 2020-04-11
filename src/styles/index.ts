import { createGlobalStyle } from 'styled-components';
import { Colors } from '../shared';
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
    margin: 0;
  }
  *,
    *::before,
    *::after {
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        margin: 0;
        padding: 0;
    }
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin: 0;
        color: ${Colors.textBlack};
    }
    body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
        color: ${Colors.textBlack};
    }
    ul,
    ol {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    a:not([class]) {
        text-decoration-skip-ink: auto;
    }
    img {
        max-width: 100%;
        display: block;
    }
    article > * + * {
        margin-top: 1em;
    }
    input,
    button,
    textarea,
    select {
        font: inherit;
    }
    p {
      line-height: 170%;
      word-break: break-all;
    }
`;
export default GlobalStyle;

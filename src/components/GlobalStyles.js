import { createGlobalStyle } from "styled-components"
import reset from "styled-reset/lib";

const GlobalStyles = createGlobalStyle
`
  ${reset};
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #f8f7fa;
    padding-top:50px;
  }
`

export default GlobalStyles
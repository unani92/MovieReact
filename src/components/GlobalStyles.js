import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle
`
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: none;
    color: #9cb5a2
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #f8f7fa;
    padding-top:50px;
  }
  .homeMovie {
    width: 300px;
    height: 400px;
  }
  .App {
    margin-top: 31px;
  }
  .selected {
    color: #9cb5a2;
  }
  .no-image {
    width: 300px;
    height: 400px;
    border: 1px solid black;
    padding: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default GlobalStyles
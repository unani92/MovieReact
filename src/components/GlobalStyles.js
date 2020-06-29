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
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #f8f7fa;
    padding-top:50px;
  }
  .movie-poster-link {
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
  .no-image-tv {
    width: 100px;
    height: 150px;
    border: 1px solid black;
    padding: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .tv-season-img {
    position: relative;
    width: 100px;
    height: auto;
    margin-right: 1rem;
    z-index: 2;
  }
  @media (max-width: 1000px) {
    .movie-poster-link {
      width: 200px;
      height: 267px;
    }
    .no-image {
      width: 200px;
      height: 267px;
    }
  }
  @media (max-width: 768px) {
    .movie-poster-link {
      width: 150px;
      height: 220px;
    }
    .no-image {
      width: 150px;
      height: 220px;
    }
  }
  @media (max-width: 480px) {
    .movie-poster-link {
      width: 100px;
      height: 150px;
    }
    .no-image {
      width: 100px;
      height: 150px;
    }
    .tv-season-img {
      width: 50px;
      height: auto;
    }
    .no-image-tv {
      width: 50px;
      height: 70px;
    }
    .no-image-tv span {
      font-weight: bold;
      font-size: 1rem;
    }
    p {
      font-weight: bold;
      font-size: small;
      text-align: center;
    }
  }
  .disabled {
    display: none;
  }
  img:hover {
    filter: brightness(0.4);
  }
`

export default GlobalStyles
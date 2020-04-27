import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body,
  div,
  span {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* GLOBAL STYLES */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01s !important;
      animation-iteration-count: 0.01s !important;
      transition-duration: 0.01s !important;
    }
  }


  a:focus {
    outline: 5px auto var(--color-primary);
  }


  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: var(--font-weight-bold);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    text-rendering: optimizeLegibility;
  }

  code {
    font-size: 0.95em;
  }



  :root {
    --color-primary: hsl(313deg, 100%, 65%);
    --color-secondary: hsl(230deg, 100%, 60%);
    --color-white: hsl(0deg, 0%, 100%);
    --color-silver: hsl(213deg, 5%, 100%);
    --color-charcoal: hsl(213deg, 30%, 6%);
    --color-gray-fade: hsla(0deg, 0%, 30%, 0.4);

    --triple-shadow:
      2px 1px 2px rgba(0, 0, 0, 0.75),
      4px 0px 4px rgba(0, 0, 0, 0.5),
      25px 4px 8px rgba(0, 0, 0, 1);
  }

body {
  height: 100vh;
  width: 100vw;
}
html {
    height: 100vh;
  width: 100vw;
}

`;

export default GlobalStyles;

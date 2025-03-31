import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};

    *{
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
        display: flex;
        justify-content: center;
    }
    body {
        font-family: 'Noto Sans KR';
        width: 44rem;
    } 
    input {
        outline: none;
        padding: 0;
    }
    button {
        cursor: pointer;
        outline: none;
        background: none;
        border: none;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    main {
        margin: 1.6rem;
        padding: 1.6rem;
    }

    @media screen and (max-width: 440px) {
        body {
            width: 100%;
        }
    }
`;

export default GlobalStyle;

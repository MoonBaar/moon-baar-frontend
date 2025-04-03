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
        background-color: #F3F4F6;
        color: #030712;
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
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 18.5rem);
        background-color: #fff;
    }

    @media screen and (max-width: 440px) {
        body {
            width: 100%;
        }
    }
`;

export default GlobalStyle;

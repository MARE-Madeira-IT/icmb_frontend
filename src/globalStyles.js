import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.background} !important;
        color: ${({ theme }) => theme.text} !important;
        padding: 0;
        margin: 0;
        transition: all 0.3s ease;
    }  
`
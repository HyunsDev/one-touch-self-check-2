import styled from "styled-components"

const HeaderDivver = styled.div`
    
`

const H1 = styled.h1`
    font-size: 16px;
    z-index: 999;
    text-align: right;
    width: fit-content;
    cursor: pointer;
    -webkit-tap-highlight-color : transparent;
    color: #5a5a5a;
    
    span {
        color: #0067F9;
    }
`

export default function Header() {
    return (
        <HeaderDivver>
            <H1><span>원터치 자가진단</span> - {process.env.REACT_APP_SCHOOL_NAME}</H1>
        </HeaderDivver>
    )
}
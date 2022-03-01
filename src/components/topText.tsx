import React from "react"
import styled from "styled-components"

const TopTextDivver = styled.div`
    padding-top: 80px;
`

const Title = styled.div`
    font-size: 32px;
    font-weight: 800;
`

const SubTitle = styled.div`
    font-size: 14px;
    color: #76797a;
    margin-top: 16px;
    

    span {
        color: #0067F9;
        
    }
`

interface TopTextIF {
    title: React.ReactElement | string;
    subtitle?: React.ReactElement | string;
}

export default function TopText(props:TopTextIF) {
    return (
        <TopTextDivver>
            <Title>{props.title}</Title>
            {props.subtitle && <SubTitle>{props.subtitle}</SubTitle>}
        </TopTextDivver>
    )
}
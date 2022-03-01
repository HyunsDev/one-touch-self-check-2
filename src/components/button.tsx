import styled from 'styled-components'
import { CaretRight } from 'phosphor-react'

const ButtonDivver = styled.div`
    position: fixed;
    left: 0;
    bottom: 22px;
    width: 100%;
    
`

const ButtonWrapper = styled.div`
    margin: 0 auto;
    max-width: 500px;
    padding: 0px 24px;
    box-sizing: border-box;
`

const ButtonDiv = styled.div`
    background-color: ${(props:{disabled:boolean}) => props.disabled ? '#CDD5E1' : '#0067F9'};
    border-radius: 8px;
    word-break: keep-all;
    cursor: ${(props:{disabled:boolean}) => props.disabled ? 'default' : 'pointer'};
    box-sizing: border-box;
    padding: 18px 8px;
    font-weight: 800;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    width: 100%;
    -webkit-tap-highlight-color : transparent;
    transition: 100ms;
    user-select: none;

    &:active {
        background-color: ${(props:{disabled:boolean}) => props.disabled ? '#CDD5E1' : '#0059d4'};
    }
`

const SubText = styled.div`
    margin-bottom: 8px;
    color: #5a5a5a;
    text-align: center;
`

const SubButton = styled.div`
    color: #5a5a5a;
    margin-top: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 14px;

    svg {
        margin-bottom: -2px;
    }
`

interface ButtonIF {
    label: string;
    disabled: boolean;
    onClick: () => any;

    subText?: React.ReactElement | string;

    subButton?: {
        label: string;
        onClick: () => any;
    }
}

export default function Button(props:ButtonIF) {
    const onClick = () => {
        if (!props.disabled) props.onClick()
    }

    return (
        <ButtonDivver>
            <ButtonWrapper>
                {props.subText && <SubText>{props.subText}</SubText>}
                <ButtonDiv disabled={props.disabled} onClick={onClick}>{props.label}</ButtonDiv>
                {props.subButton && <SubButton onClick={props.subButton.onClick}>{props.subButton.label} <CaretRight size={16} weight="bold" /></SubButton>}
            </ButtonWrapper>
        </ButtonDivver>
    )
}

Button.defaultProps = {
    disabled: false
}
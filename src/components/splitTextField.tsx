import React from "react"
import styled from "styled-components"

const Divver = styled.div`
    margin-top: 36px;
    position: relative;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FakeBoxes = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    gap: 8px;
    z-index: 1;
`

const FakeBox = styled.div`
    width: 48px;
    height: 56px;
    border-radius: 8px;
    background-color: #e5e9f0;
    z-index: 1;
`

const Input = styled.input`
    position: relative;
    font-size: 24px;
    font-weight: 800;
    border: 0;
    outline: 0;
    z-index: 9;
    width: ${(props:{maxLength: number}) => (props.maxLength) * 48 + (props.maxLength-1) * 8 + 42}px;
    
    transition: 200ms;
    padding: 8px;
    padding-left: 16px;
    margin-left: 42px;
    box-sizing: border-box;
    letter-spacing: 42px;
    background-color: transparent;

    &::placeholder {
        color: rgb(186, 194, 206);
    }
`

const Label = styled.div`
    margin-top: 8px;
    padding-left: 8px;
`

interface TopTextIF {
    value: string;
    onChange: (value:string) => void;
    onKeyPress: (e:KeyboardEvent) => void;
    label?: string;
    type: 'number' | 'text'
    maxLength: number
}

export default function SplitTextField(props:TopTextIF) {
    const fakeBoxes = []
    for (let i = 0; i < (props.maxLength || 0); i++) {
        fakeBoxes.push(<FakeBox key={i} />);
    }

    const onChange = (e:any) => {
        if (e.target.value.length >= props.maxLength) {
            ;(document.activeElement as HTMLElement).blur()
        }

        if (e.target.value.length <= props.maxLength) {
            props.onChange(e.target.value)
        }
    }

    return (
        <>
        <Divver>
            <Input
                maxLength={props.maxLength}
                type={props.type}
                autoFocus
                value={props.value}
                onChange={onChange}
                onKeyPress={(e:any) => props.onKeyPress(e)}
            />
            <FakeBoxes>
                {fakeBoxes}
            </FakeBoxes>
        </Divver>
        {props.label && <Label>{props.label}</Label>}
        </>
    )
}

SplitTextField.defaultProps = {
    onKeyPress: () => null,
    type: 'text',
    maxLength: 999
}
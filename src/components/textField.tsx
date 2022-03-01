import React from "react"
import styled from "styled-components"

const Divver = styled.div`
    margin-top: 36px;
    border-bottom: solid 2px rgb(186, 194, 206);

    &:focus-within {
        outline: none;
        border-bottom: solid 2px #0067F9;
    }
`

const Input = styled.input`
    font-size: 24px;
    font-weight: 800;
    border: 0;
    outline: 0;
    
    transition: 200ms;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;

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
    placeholder: string;
    label?: string;
    type: 'number' | 'text'
    maxLength?: number
}

export default function TextField(props:TopTextIF) {
    return (
        <>
        <Divver>
            <Input
                maxLength={props.maxLength}
                type={props.type}
                autoFocus
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onKeyPress={(e:any) => props.onKeyPress(e)}
            />
            
        </Divver>
        {props.label && <Label>{props.label}</Label>}
        </>
    )
}

TextField.defaultProps = {
    onKeyPress: () => null,
    type: 'text'
}
import TopText from "../components/topText";
import Button from "../components/button";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../components/page";
import TextField from "../components/textField";

const filter = (value:string) => {
    // 적절한 이름이 생각나지 않아서 http 응답 코드로 작성했습니다.
    // 그래도 괜찮은 선택인 것 같지 않나요?

    if (value.length < 2) {
        return '404'
    } else if (value.length > 5) {
        return '400'
    } else {
        return '200'
    }
}

export default function Name(props:any) {
    const [value, setValue] = useState(localStorage.getItem('name') || '')
    const [btnStatus, setButtonStatus] = useState({
        text: "이름을 입력하세요",
        unable: true,
    })
    const navigate = useNavigate()

    useEffect(() => {
        props.setBarStatus('hidden')
    }, [props])

    const check = (value:string) => {
        if (filter(value) === '404') {
            setButtonStatus({
                text: "이름을 입력하세요",
                unable: true,
            })
        } else if (filter(value) === '400') {
            setButtonStatus({
                text: `올바른 이름을 입력하세요`,
                unable: true,
            })
            
        } else {
            setButtonStatus({
                text: `${value}님으로 계속합니다.`,
                unable: false
            })
        }
    }

    useEffect(() => {
        check(value)
    }, [value])

    const next = () => {
        if (filter(value) === '200') {
            localStorage.setItem('name', value)
            navigate('/birth', { replace: true })
        }
    }

    const onEnter = (e: KeyboardEvent ) => {
        if (e.key === "Enter") {
            next()
        }
    }

    return (
        <Page>
            <Header />
            <TopText
                title={<>이름을 입력해주세요.</>}
            />
            <TextField maxLength={5} value={value} onChange={setValue} placeholder='이름' onKeyPress={onEnter}/>

            <Button
                label={btnStatus.text}
                onClick={next}
                disabled={btnStatus.unable}
            />
        </Page>  
    )
}
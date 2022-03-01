import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from "dayjs";

import Page from "../components/page";
import TopText from "../components/topText";
import Button from "../components/button";
import Header from "../components/header";
import SplitTextField from "../components/splitTextField";

dayjs.extend(customParseFormat)

const filter = (value:string) => {
    // 적절한 이름이 생각나지 않아서 http 응답 코드로 작성했습니다.
    // 그래도 괜찮은 선택인 것 같지 않나요?

    if (value.length < 2) {
        return {
            status: false,
            code: '404',
            message: '비밀번호를 입력하세요'
        }
    } else if (value.length < 4 || value.length > 4) {
        return {
            status: false,
            code: '400',
            message: '올바른 비밀번호를 입력하세요'
        }
    } else {
        return {
            status: true,
            code: 'student',
            message: '이 비밀번호로 계속합니다'
        }
    }
}

export default function Password(props:any) {
    const [value, setValue] = useState(localStorage.getItem('password') || '')
    const [btnStatus, setButtonStatus] = useState({
        text: "비밀번호를 입력하세요",
        unable: true,
    })
    const navigate = useNavigate()

    useEffect(() => {
        props.setBarStatus('hidden')
    }, [props])

    const check = (value:string) => {
        if (filter(value).code === '404') {
            setButtonStatus({
                text: "비밀번호를 입력하세요",
                unable: true,
            })
        } else if (filter(value).code === '400') {
            setButtonStatus({
                text: `올바른 비밀번호를 입력하세요`,
                unable: true,
            })
            
        } else {
            setButtonStatus({
                text: `이 비밀번호로 계속합니다`,
                unable: false,
            })
        }
    }

    useEffect(() => {
        check(value)
    }, [value])

    const next = () => {
        if (filter(value).status === true) {
            localStorage.setItem('password', '0307')
            navigate('/loading', { replace: true })
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
                title={<>비밀번호를 입력하세요.</>}
            />
            <SplitTextField maxLength={4} type='number' value={value} onChange={setValue} onKeyPress={onEnter}/>

            <Button
                label={filter(value).message || ''}
                onClick={next}
                disabled={btnStatus.unable}
                subButton={{
                    label: '생년월일 변경하기',
                    onClick: () => navigate('/birth', { replace: true })
                }}
            />
        </Page>  
    )
}
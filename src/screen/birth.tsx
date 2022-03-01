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
            message: '생년월일을 입력하세요'
        }
    } else if (value.length < 6 || value.length > 6) {
        return {
            status: false,
            code: '400',
            message: '올바른 생년월일을 입력하세요'
        }
    } else if (/^\d\d[01]\d[0123]\d$/.test(value)) { // 올바른 숫자 검증
        if (dayjs(value, 'YYMMDD') > dayjs().add(-15, 'y')) { // 17살 보다 어린 경우
            return {
                status: true,
                code: 'early',
                message: '와우, 조기입학생인가요?'
            }
        } else if (dayjs(value, 'YYMMDD') > dayjs()) { // 오늘 이전에 태어난 경우
            return {
                status: false,
                code: 'unborn',
                message: '태어나지 않은 사람은 자기진단을 할 수 없습니다.'
            }
        } else if (dayjs(value, 'YYMMDD') < dayjs().add(-18, 'y')) { // 20살 이상인 경우
            return {
                status: true,
                code: 'teacher',
                message: '안녕하세요. 선생님!'
            }
        } else {
            return {
                status: true,
                code: 'student',
                message: dayjs(value, 'YYMMDD').format('YYYY년 MM월 DD일')
            }
        }
    } else {
        return {
            status: false,
            code: '400',
            message: '올바른 생년월일을 입력하세요'
        }
    }
}

export default function Birth(props:any) {
    const [value, setValue] = useState(localStorage.getItem('birth') || '')
    const [btnStatus, setButtonStatus] = useState({
        text: "생년월일을 입력하세요",
        unable: true,
    })
    const navigate = useNavigate()

    useEffect(() => {
        props.setBarStatus('hidden')
    }, [props])

    const check = (value:string) => {
        if (filter(value).code === '404') {
            setButtonStatus({
                text: "생년월일을 입력하세요",
                unable: true,
            })
        } else if (filter(value).code === '400') {
            setButtonStatus({
                text: `올바른 생년월일을 입력하세요`,
                unable: true,
            })
            
        } else {
            setButtonStatus({
                text: `${value}님으로 계속합니다.`,
                unable: false,
            })
        }
    }

    useEffect(() => {
        check(value)
    }, [value])

    const next = () => {
        if (filter(value).status === true) {
            localStorage.setItem('birth', value)
            navigate('/password', { replace: true })
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
                title={<>생년월일을 입력해주세요.</>}
            />
            <SplitTextField maxLength={6} type='number' value={value} onChange={setValue} onKeyPress={onEnter}/>

            <Button
                label={filter(value).message || ''}
                onClick={next}
                disabled={btnStatus.unable}
                subButton={{
                    label: '이름 변경하기',
                    onClick: () => navigate('/name', { replace: true })
                }}
            />
        </Page>  
    )
}
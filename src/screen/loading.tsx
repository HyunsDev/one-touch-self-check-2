import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"

import Page from "../components/page";
import TopText from "../components/topText";
import Button from "../components/button";
import Header from "../components/header";
import { toast } from "react-toastify";


const Text = styled.div`
    margin-top: 200px;
    font-size: 14px;
    line-height: 1.8;

    span {
        color: #0059d4;
        font-weight: 800;
    }
`

export default function Password(props:any) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('name')) {
            navigate('/name', { replace: true })
        } else if (!localStorage.getItem('birth')) {
            navigate('/birth', { replace: true })
        } else if (!localStorage.getItem('password')) {
            navigate('/password', { replace: true })
        } else {
            ;(async () => {
                try {
                    await axios.post(`${process.env.REACT_APP_API_SERVER}/v1/check`, {
                        name: localStorage.getItem("name"),
                        birth: localStorage.getItem("birth"),
                        password: localStorage.getItem("password")
                    })
                    localStorage.setItem("isSet", 'true')
                    navigate('/done', { replace: true })
    
                } catch (err:any) {
                    localStorage.setItem("isSet", 'false')
                    console.error(err)
                    if (err.response) {
                        console.error(err.response)
                        switch (err.response.data.code) {
                            case "need_more_info":
                                toast.error("필수 정보가 누락되었어요", { theme: "colored" })
                                localStorage.clear()
                                navigate('/name', { replace: true })
                                break
    
                            case "first_login_failed":
                                toast.error("이름과 생년월일을 확인하세요", { theme: "colored" })
                                localStorage.clear()
                                navigate('/name', { replace: true })
                                break
    
                            case "second_login_failed":
                                toast.error("비밀번호를 확인하세요", { theme: "colored" })
                                localStorage.setItem("password", "")
                                navigate('/password', { replace: true })
                                break
                            
                            case "wait_please":
                                toast.error(`${err.response.data.minutes}분후에 재시도해주세요`, { theme: "colored" })
                                navigate('/password', { replace: true })
                                break
    
                            case "wrong_password":
                                toast.error("비밀번호를 확인하세요", { theme: "colored" })
                                navigate('/password', { replace: true })
                                break
    
                            default:
                                toast.error("자가진단을 하지 못했어요. 다시 시도해주세요", { theme: "colored" })
                                navigate('/password', { replace: true })
                                break
                        }
                    } else if (err.request) {
                        toast.error("서버 연결에 실패했어요. 다시 시도해주세요", { theme: "colored" })
                        navigate('/password', { replace: true })
                    } else {
                        toast.error("문제가 생겼어요. 이후에도 문제가 반복되면 박현우(3512)에게 알려주세요.", { theme: "colored" })
                        navigate('/password', { replace: true })
                    }
                }
            })()
        }
    }, [navigate])

    useEffect(() => {
        props.setBarStatus('loading')
    }, [props])

    return (
        <Page>
            <Header />
            <TopText
                title={<>자가진단 중...</>}
            />
            <Text>
                <span>원터치 자가진단 내용</span><br />
                ✅ 코로나 의심 임상 증상이 있나요?<br />
                ❎ 오늘 신속항원검사를 실시했나요?<br />
                ✅ 학생 또는 동거인이 밀접접촉자로 자가격리 중인가요?<br />
                ✅ 학생이 밀접접촉자로, 자가격리중인가요?<br />
                ✅ 학생 동거인 중 재택치료자가 있어<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공동격리인으로 지정되어 자가격리중인가요?
            </Text>

            <Button
                label={'잠시만 기다려주세요.'}
                onClick={() => null}
                disabled={true}
            />
        </Page>  
    )
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../components/page";
import TopText from "../components/topText";
import Button from "../components/button";
import Header from "../components/header";


export default function Done(props:any) {
    const navigate = useNavigate()

    useEffect(() => {
        props.setBarStatus('done')
    }, [props])

    return (
        <Page>
            <Header />
            <TopText
                title={<>자가진단을 완료했어요!</>}
            />

            <Button
                label={'이제 앱을 꺼도 좋아요.'}
                onClick={() => null}
                disabled={true}
                subButton={{
                    label: '내 정보 수정하기',
                    onClick: () => navigate('/name', { replace: true })
                }}
            />
        </Page>  
    )
}
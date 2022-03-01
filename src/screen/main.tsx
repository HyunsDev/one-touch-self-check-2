import TopText from "../components/topText";
import Button from "../components/button";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import Page from "../components/page";
import { useEffect } from "react";

export default function Main(props:any) {
    const navigate = useNavigate()

    useEffect(() => {
        props.setBarStatus('hidden')
    }, [props])

    useEffect(() => {
        if (localStorage.getItem('isSet') === 'true' && localStorage.getItem('name') && localStorage.getItem('birth') && localStorage.getItem('password')) {
            navigate('/loading')
        }
    }, [navigate])

    return (
        <Page>
            <Header />
            <TopText
                title={<>터치 한 번으로<br />자가진단 완료하기.</>}
                subtitle={<>원터치 자가진단에 등록하고,<br />매일 아침 <span>원터치</span>만으로 편하게 시작하세요.</>}
            />
            <Button
                label="30초만에 등록하기"
                onClick={() => navigate('/name')}
                subText='원터치 자가진단은 박현우(3512)가 만들었어요!'
            />
        </Page>  
    )
}
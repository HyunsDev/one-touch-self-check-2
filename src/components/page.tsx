import styled from 'styled-components'

const PageDivver = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 0px 24px;
    box-sizing: border-box;
    position: relative;
    margin-top: 32px;
`

interface PageIf {
    children: any
}

export default function Page(props: PageIf) {
    return (
        <PageDivver>
            {props.children}
        </PageDivver>
    )
}
import styled, {keyframes} from 'styled-components'

interface BarIF {
    status: 'hidden' | 'loading' | 'done' | string
}

export default function Bar(props:BarIF) {

    return (
        <div className="bar-divver">
            <div className={`Bar Bar-${props.status}`}>
                <div className={props.status !== "done" ? "loader" : "loader loader-disappear"} />
                {props.status === "done" ? <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <polyline points="172 104 113.333 160 84 132" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
                    <circle cx="128" cy="128" r="96" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                    </svg> : <></>}
            </div>
        </div>
    )
}
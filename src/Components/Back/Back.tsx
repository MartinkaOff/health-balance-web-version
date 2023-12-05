import React from "react"
import './back.scss';

export function Back({ content }: { content: string }) {

    const back = () => {
        window.history.back();
    }

    return (
        <div className='back'>
            <div>
                <div onClick={back} className="back__arrow">
                    <div></div>
                </div>
            </div>
            <div className="back__title main-title">
                {content}
            </div>
        </div>
    )
}
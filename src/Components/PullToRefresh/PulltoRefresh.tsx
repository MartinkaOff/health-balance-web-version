import React, {FC, useEffect} from "react";
import spinner from '../../assets/image/redo-solid.svg'



interface IPullToRefresh {
    onTrigger: () => void,
    top?: number
}

export const PullToRefresh: FC<IPullToRefresh> = ({onTrigger, top}) => {
    const TRIGGER_THRESHOLD = 100

    useEffect(() => {
        const pullToRefresh = document.querySelector('.pull-to-refresh') as HTMLElement;
        let touchstartY = 0;

        const touchStart = (e: TouchEvent) => touchstartY = e.touches[0].clientY;
        const touchmove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchstartY;
            if (touchDiff > TRIGGER_THRESHOLD && window.scrollY === 0) {
                pullToRefresh.classList.add('visible');
                e.preventDefault();
            }
        }
        const touchend = async (e: TouchEvent) => {
            if (pullToRefresh.classList.contains('visible')) {
                await onTrigger()
                setTimeout(()=>{
                    pullToRefresh.classList.remove('visible')
                }, 500)

            }
        }

        document.addEventListener('touchstart', touchStart,{passive: false});
        document.addEventListener('touchmove', touchmove,{passive: false});
        document.addEventListener('touchend', touchend,{passive: false});

        return () => {
            document.removeEventListener('touchstart', touchStart);
            document.removeEventListener('touchmove', touchmove);
            document.removeEventListener('touchend', touchend);
        };
    }, [])
    return (
        <div className="pull-to-refresh">
            <span><img src={spinner} alt="spinner"/></span>
        </div>
    )
}
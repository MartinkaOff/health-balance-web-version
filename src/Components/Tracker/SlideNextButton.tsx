import { FC } from 'react'
import { useCreatingTrackerMutation } from '../../services/tracker.api'
import { ICreatingTracker } from '../../models/ITracker'
import { showToast } from '../../utils/common-functions'
import { useSwiper } from 'swiper/react'

interface ISwiperNextButton {
  customClass: string
  weight: string
  fruits: string
  wake_up_time: string
}

export const SlideNextButton: FC<ISwiperNextButton> = ({
  customClass,
  fruits,
  wake_up_time,
  weight
}) => {
  const swiper = useSwiper()

  const [createTracker, { isLoading, isSuccess }] = useCreatingTrackerMutation()

  const next = async () => {
    switch (swiper.activeIndex) {
      case 3:
        const data: ICreatingTracker = {
          fruits: +fruits,
          wake_up_time,
          weight: +weight
        }
        createTracker(data)
          .unwrap()
          .catch((e) => showToast('Ошибка создания!'))

        break
      default:
        break
    }
    swiper.slideNext()
  }

  return (
    <button className={customClass} disabled={isLoading} onClick={next}>
      Дальше
    </button>
  )
}

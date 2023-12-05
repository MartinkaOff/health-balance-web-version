import 'rmc-picker/assets/index.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import './start-page.scss'


export const StartPage = () => {


  // useEffect(() => {
  //   const syncSteps = async ()=>{
  //     console.log('fdg')
  //     if (Capacitor.getPlatform() === 'android') {
  //       // Установка значения с которого будет работать шагомер
  //       const indexWeek = new Date().getDay() === 0 ? 7 : new Date().getDay()
  //       const response = await AppService.getStepsPerDay()
  //       if (response.data.data.statistic) {
  //         await Pedometer.setData({
  //           numberOfSteps: response.data.data.statistic[indexWeek].quantity,
  //           token: localStorage.getItem('token')
  //         })
  //       }
  //     }
  //   }

  //
  // }, [])


  return <div></div>
}


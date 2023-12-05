import {ChangeEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../../Components/Header/Header'
import {creatingNewsSelector, handlerNews} from '../../Redux/slice/newsSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import './rubric-page.scss'
import {CATEGORY_NEWS} from '../../utils/globalConstants'


export const RubricPage = () => {

  const navigate = useNavigate()

  const {category} = useAppSelector(creatingNewsSelector)

  const saveRubric = () => {
    if (category !== 0) navigate(-1)
  }

  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(handlerNews({name:'category', value: +e.target.value}))

  return (
    <div className={'rubric-page'}>
      <Header title={'Рубрики'} />
      <div className='custom-checkbox'>
        {CATEGORY_NEWS.slice(1).map((item) => (
          <div key={item.id}>
            <input
              value={item.id}
              type='radio'
              name={'radio'}
              defaultChecked={item.id === category}
              className={'custom-checkbox__checkbox'}
              id={item.id.toString()}
              onChange={handleChange}
            />
            <label htmlFor={item.id.toString()}>{item.title}</label>
          </div>
        ))}
      </div>
      <button
        className='rubric-page__button _button-white'
        onClick={saveRubric}
      >
        Сохранить
      </button>
    </div>
  )
}

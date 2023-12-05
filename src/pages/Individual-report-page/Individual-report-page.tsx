import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { REPORT_ROUTE } from '../../provider/constants-route'
import React from 'react'
import { useGetListReportsQuery } from '../../services/healthIndex.api'
import './individual-report-page.scss'
import { Preloader } from '../../Components/Preloader/Preloader'
import HeaderActive from '../../Components/Header-active/Header-active'
import { Back } from '../../Components/Back/Back'

export const IndividualReportPage = () => {
  const { data: reports, isLoading } = useGetListReportsQuery(null)

  return (
    <div>
      {window.innerWidth > 500 ? <HeaderActive /> : ''}
      <div className={'individual-report-page'}>
        <Back content={'Индивидуальный отчет'} />
        {!isLoading ? (
          reports &&
          reports.map((report) => (
            <div className='individual-report-page__item' key={report.id}>
              <div className='individual-report-page__title main-title'>
                Отчет за {new Date(report.date * 1000).toLocaleDateString()}
              </div>
              <Link
                state={{
                  date: new Date(report.date * 1000).toLocaleDateString()
                }}
                to={{ pathname: `${REPORT_ROUTE}/${report.id}` }}
                className='individual-report-page__link text-blue'
              >
                Открыть
              </Link>
            </div>
          ))
        ) : (
          <Preloader height={'auto'} />
        )}
      </div>
    </div>
  )
}

import React from 'react'
import './Footer.scss'
import {VERSION_NAME} from "../../utils/globalConstants";

export const Footer = () => {
	return (
		<div className='footer'>
			<div className="footer__body">
				<a className={'footer__item'} href="mailto:info@health-balance.ru"><span>Техподдержка: </span>info@health-balance.ru</a>
				<a className={'footer__item'} href="https://health-balance.ru/wiki"><span>Инструкция: </span>https://health-balance.ru/wiki</a>
				<div className={'footer__item'}><span>Версия: </span>{VERSION_NAME}</div>
			</div>
		</div>
	)
}

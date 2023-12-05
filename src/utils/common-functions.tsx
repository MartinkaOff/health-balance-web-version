import {Toast} from '@capacitor/toast'
import {ChangeEvent} from 'react'
import Picker from 'rmc-picker'
import {typesChallenge} from './enums'
import {CATEGORY_NEWS} from "./globalConstants";

export const definitionColor = (type: number, className: string) => {
    switch (type) {
        case typesChallenge.common:
            return className
        case typesChallenge.personal:
            return className + ' ' + className + '_personal'
        case typesChallenge.command:
            return className + ' ' + className + '_command'
        default:
            return className
    }
}

export function getItemsDays() {
    const items: any[] = []
    for (let i = 1; i <= 31; i++) {
        items.push(i >= 10 ? i.toString() : `0${i}`)
    }
    return items
}

export function getItemsMonth() {
    const items: any[] = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    return items.map((month) => month)
}

export function getItemsYear(start: number, end: number) {
    const items = []
    for (let i = start; i <= end; i++) {
        items.push(i >= 10 ? i.toString() : `0${i}`)
    }
    return items
}

export function getItemsStep(start: number, end: number) {
    const items: any[] = []
    if (end - start > 500) {
        for (let i = start; i < end; i += 500) {
            items.push(
                <Picker.Item value={i.toString()} key={i}>
                    {i}
                </Picker.Item>
            )
        }
        return items
    }
    return null
}

export function getItemsWeight(start: number, end: number, prefix: string) {
    const items: any[] = []

    for (let i = start; i < end; i += 1) {
        items.push(
            <Picker.Item value={i.toString()} key={i}>
                {i + ' ' + prefix}
            </Picker.Item>
        )
    }
    return items
}

export function getItemsHour() {
    const items: any[] = []

    for (let i = 0; i < 24; i += 1) {
        items.push(
            <Picker.Item value={i.toString()} key={i}>
                {i >= 10 ? i : `0${i}`}
            </Picker.Item>
        )
    }
    return items
}

export function getItemsMinutes() {
    const items: any[] = []

    for (let i = 0; i < 60; i += 1) {
        items.push(
            <Picker.Item value={i.toString()} key={i}>
                {i >= 10 ? i : `0${i}`}
            </Picker.Item>
        )
    }
    return items
}

export const typeConversion = (type: number) => {
    switch (type) {
        case 1:
            return 'Общий'
        case 2:
            return 'Командный'
        case 3:
            return 'Личный'
        default:
            return 'Общий'
    }
}
export const rubricConversion = (type: number) => {
    return CATEGORY_NEWS.find(item=>item.id === type && item.id != 0)?.title
}

export const showToast = async (text: string, duration?: 'short' | 'long') => {
    await Toast.show({
        text: text,
        position: 'center',
        duration: duration || 'short'
    })
}

export function getWeek(d: any) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
    return [d.getUTCFullYear(), weekNo]
}

export function nFormatter(num: number, digits: number) {
    const lookup = [
        {value: 1, symbol: ''},
        {value: 1e3, symbol: 'k'},
        {value: 1e6, symbol: 'M'},
        {value: 1e9, symbol: 'G'},
        {value: 1e12, symbol: 'T'},
        {value: 1e15, symbol: 'P'},
        {value: 1e18, symbol: 'E'}
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value
        })
    return item
        ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
        : '0'
}

export function sklonenie(number: number, txt: string[]) {
    var cases = [2, 0, 1, 1, 1, 2]
    return txt[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
        ]
}

export const range = function (start: number, stop: number, step: number) {
    if (stop === null) {
        stop = start || 0
        start = 0
    }
    step = step || 1

    let length = Math.max(Math.ceil((stop - start) / step), 0)
    let range = Array(length)

    for (let idx = 0; idx <= length; idx++, start += step) {
        range[idx] = start
    }
    return range
}

export function extractContent(s: string) {
    var span = document.createElement('span')
    span.innerHTML = s
    return span.textContent || span.innerText
}

export const timeConverterUnix = (date: string) => {
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/
    let dateFormatChanged: any = new Date(date.replace(pattern, '$3-$2-$1'))
    return Math.floor(Date.parse(dateFormatChanged) / 1000)
}

export const regexInput = (e: ChangeEvent<HTMLInputElement>) => {
    let [_, sign, integer, decimals]: any = e.target.value
        .replace(/[^\d\.\-]/g, '')
        .replace(/(\..*?)\./g, '$1')
        .replace(/(.+)-/g, '$1')
        .match(/^(-?)(.*?)((?:\.\d*)?)$/)

    let pos: number = Number(e.target.selectionStart) - 1
    if (!integer && decimals) pos += 2

    if (integer || decimals) {
        integer = +integer
    }

    const formatted = sign + integer + decimals

    if (formatted !== e.target.value) {
        e.target.value = formatted
        e.target.setSelectionRange(pos, pos)
    }
}
import { Week } from 'calendarize'
import dayjs from 'dayjs'
import { TextStyle, ViewStyle } from 'react-native'

import { ICalendarEventBase, Mode, WeekNum } from './interfaces'
import { Palette } from './theme/ThemeInterface'

export declare const typedMemo: <T>(c: T) => T
export declare const DAY_MINUTES = 1440
export declare function getDatesInMonth(date?: Date | dayjs.Dayjs, locale?: string): dayjs.Dayjs[]
export declare function getDatesInWeek(
  date?: Date | dayjs.Dayjs,
  weekStartsOn?: WeekNum,
  locale?: string,
): dayjs.Dayjs[]
export declare function getDatesInNextThreeDays(
  date?: Date | dayjs.Dayjs,
  locale?: string,
): dayjs.Dayjs[]
export declare function getDatesInNextOneDay(
  date?: Date | dayjs.Dayjs,
  locale?: string,
): dayjs.Dayjs[]
export declare const hours: number[]
export declare function parseStartEndHour(time: String): Date
export declare function padZeros(value: number, length: number): string
export declare function getTimeContext(minutes: number): {
  minute: number
  hour24: number
  hour12: number
  ampm: string
  hour24Label: string
  hour12Label: string
}
export declare function generateHoursArray(
  minTimeMinutes: number,
  maxTimeMinutes: number,
  stepMinutes: number,
): {
  minute: number
  hour24: number
  hour12: number
  ampm: string
  hour24Label: string
  hour12Label: string
}[]
export declare function isToday(date: dayjs.Dayjs): boolean
export declare function normalize(
  val: number,
  minVal: number,
  maxVal: number,
  newMin: number,
  newMax: number,
): number
export declare function getRelativeTopInDay(
  date: dayjs.Dayjs,
  minTimeMinutes: number,
  maxTimeMinutes: number,
): number
export declare function todayInMinutes(): number
export declare function modeToNum(mode: Mode, current?: dayjs.Dayjs | Date): number
export declare function formatStartEnd(start: Date, end: Date, format: string): string
export declare function isAllDayEvent(start: Date, end: Date): boolean
export declare function getCountOfEventsAtEvent(
  event: ICalendarEventBase,
  eventList: ICalendarEventBase[],
): number
export declare function getOrderOfEvent(
  event: ICalendarEventBase,
  eventList: ICalendarEventBase[],
): number
export declare function getStyleForOverlappingEvent(
  eventPosition: number,
  overlapOffset: number,
  palettes: Palette[],
): {}
export declare function getDatesInNextCustomDays(
  date?: Date | dayjs.Dayjs,
  weekStartsOn?: WeekNum,
  weekEndsOn?: WeekNum,
  locale?: string,
): dayjs.Dayjs[]
export declare function getEventSpanningInfo(
  event: ICalendarEventBase,
  date: dayjs.Dayjs,
  dayOfTheWeek: number,
  calendarWidth: number,
  showAdjacentMonths: boolean,
): {
  eventWidth: number
  isMultipleDays: boolean
  isMultipleDaysStart: boolean
  eventWeekDuration: number
}
export declare function objHasContent(obj: ViewStyle | TextStyle): boolean
export declare function stringHasContent(string: string): boolean
export declare function getWeeksWithAdjacentMonths(
  targetDate: dayjs.Dayjs,
  weekStartsOn: WeekNum,
): Week[]

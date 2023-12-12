import dayjs from 'dayjs'
import * as React from 'react'
import { ViewStyle } from 'react-native'

import { ICalendarEventBase } from '../interfaces'

export interface CalendarHeaderProps<T extends ICalendarEventBase> {
  dateRange: dayjs.Dayjs[]
  cellHeight: number
  style: ViewStyle
  allDayEvents: T[]
  onPressDateHeader?: (date: Date) => void
  onPressEvent?: (event: T) => void
  activeDate?: Date
  headerContentStyle?: ViewStyle
  dayHeaderStyle?: ViewStyle
  dayHeaderHighlightColor?: string
  weekDayHeaderHighlightColor?: string
  showAllDayEventCell?: boolean
  hideHours?: Boolean
}
declare function _CalendarHeader<T extends ICalendarEventBase>({
  dateRange,
  cellHeight,
  style,
  allDayEvents,
  onPressDateHeader,
  onPressEvent,
  activeDate,
  headerContentStyle,
  dayHeaderStyle,
  dayHeaderHighlightColor,
  weekDayHeaderHighlightColor,
  showAllDayEventCell,
  hideHours,
}: CalendarHeaderProps<T>): React.JSX.Element
export declare const CalendarHeader: typeof _CalendarHeader
export {}

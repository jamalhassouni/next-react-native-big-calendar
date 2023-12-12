import dayjs from 'dayjs'
import * as React from 'react'
import { TextStyle, ViewStyle } from 'react-native'

import {
  CalendarCellStyle,
  EventCellStyle,
  EventRenderer,
  HorizontalDirection,
  ICalendarEventBase,
} from '../interfaces'

interface hoursInterface {
  minute: number
  hour24: number
  hour12: number
  ampm: string
  hour24Label: string
  hour12Label: string
}
interface CalendarBodyProps<T extends ICalendarEventBase> {
  cellHeight: number
  containerHeight: number
  dateRange: dayjs.Dayjs[]
  events: T[]
  scrollOffsetMinutes: number
  ampm: boolean
  showTime: boolean
  style: ViewStyle
  eventCellStyle?: EventCellStyle<T>
  calendarCellStyle?: CalendarCellStyle
  hideNowIndicator?: boolean
  overlapOffset?: number
  onPressCell?: (date: Date) => void
  onScroll?: (event: any) => void
  onPressEvent?: (event: T) => void
  onSwipeHorizontal?: (d: HorizontalDirection) => void
  renderEvent?: EventRenderer<T>
  headerComponent?: React.ReactElement | null
  headerComponentStyle?: ViewStyle
  hourStyle?: TextStyle
  minTimeMinutes?: number
  maxTimeMinutes?: number
  stepMinutes?: number
  hours: hoursInterface[]
}
declare function _CalendarBody<T extends ICalendarEventBase>({
  containerHeight,
  cellHeight,
  dateRange,
  style,
  onPressCell,
  onScroll,
  events,
  onPressEvent,
  eventCellStyle,
  calendarCellStyle,
  ampm,
  showTime,
  scrollOffsetMinutes,
  onSwipeHorizontal,
  hideNowIndicator,
  overlapOffset,
  renderEvent,
  headerComponent,
  headerComponentStyle,
  hourStyle,
  minTimeMinutes,
  maxTimeMinutes,
  stepMinutes,
  hours,
}: CalendarBodyProps<T>): React.JSX.Element
export declare const CalendarBody: typeof _CalendarBody
export {}

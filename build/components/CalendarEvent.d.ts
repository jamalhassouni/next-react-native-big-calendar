import { EventCellStyle, EventRenderer, ICalendarEventBase } from '../interfaces'

interface CalendarEventProps<T extends ICalendarEventBase> {
  event: T
  onPressEvent?: (event: T) => void
  eventCellStyle?: EventCellStyle<T>
  showTime: boolean
  eventCount?: number
  eventOrder?: number
  overlapOffset?: number
  renderEvent?: EventRenderer<T>
  ampm: boolean
  minTimeMinutes: number
  maxTimeMinutes: number
}
declare function _CalendarEvent<T extends ICalendarEventBase>({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventCount,
  eventOrder,
  overlapOffset,
  renderEvent,
  ampm,
  minTimeMinutes,
  maxTimeMinutes,
}: CalendarEventProps<T>): JSX.Element
export declare const CalendarEvent: typeof _CalendarEvent
export {}

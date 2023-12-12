import * as React from 'react'
import { ViewStyle } from 'react-native'

import { WeekNum } from '../interfaces'

export interface CalendarHeaderForMonthViewProps {
  weekStartsOn: WeekNum
  locale: string
  style: ViewStyle
}
declare function _CalendarHeaderForMonthView({
  locale,
  weekStartsOn,
  style,
}: CalendarHeaderForMonthViewProps): React.JSX.Element
export declare const CalendarHeaderForMonthView: typeof _CalendarHeaderForMonthView
export {}

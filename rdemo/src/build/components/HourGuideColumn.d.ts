import * as React from 'react'
import { TextStyle } from 'react-native'
interface HourGuideColumnProps {
  cellHeight: number
  hour: string
  ampm: boolean
  hourStyle: TextStyle
}
export declare const HourGuideColumn: React.MemoExoticComponent<
  ({ cellHeight, hour, hourStyle }: HourGuideColumnProps) => JSX.Element
>
export {}

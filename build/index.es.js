import calendarize from 'calendarize'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import * as React from 'react'
import React__default, { createContext, useContext } from 'react'
import {
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
  var t = {}
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]]
    }
  return t
}

const defaultTheme = {
  isRTL: false,
  palette: {
    primary: {
      main: 'rgb(66, 133, 244)',
      contrastText: '#fff',
    },
    nowIndicator: 'red',
    gray: {
      // 50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      // 400: '#bdbdbd',
      500: '#9e9e9e',
      // 600: '#757575',
      // 700: '#616161',
      800: '#424242',
      // 900: '#212121',
    },
    moreLabel: '#000000',
  },
  eventCellOverlappings: [
    { main: '#E26245', contrastText: '#fff' },
    { main: '#4AC001', contrastText: '#fff' },
    { main: '#5934C7', contrastText: '#fff' }, // purple
  ],
  typography: {
    xs: {
      fontSize: 10,
    },
    sm: {
      fontSize: 12,
    },
    xl: {
      fontSize: 22,
    },
    moreLabel: {
      fontSize: 11,
      fontWeight: 'bold',
    },
  },
}

const ThemeContext = createContext(defaultTheme)
const useTheme = () => {
  const customTheme = useContext(ThemeContext)
  if (!customTheme) {
    return defaultTheme
  }
  return customTheme
}

const MIN_HEIGHT = 1200
const HOUR_GUIDE_WIDTH = 50
const OVERLAP_OFFSET = Platform.OS === 'web' ? 20 : 8
const OVERLAP_PADDING = Platform.OS === 'web' ? 3 : 0
const eventCellCss = StyleSheet.create({
  style: {
    zIndex: 100,
    borderRadius: 3,
    padding: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    minWidth: '33%',
  },
})
/*
 * Utility-first CSS.
 */
const u = StyleSheet.create({
  /*
   * Flex
   */
  flex: {
    flexDirection: 'row',
  },
  'flex-row': {
    flexDirection: 'row',
  },
  'flex-row-reverse': {
    flexDirection: 'row-reverse',
  },
  'flex-column': {
    flexDirection: 'column',
  },
  'flex-1': {
    flex: 1,
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'items-center': {
    alignItems: 'center',
  },
  'self-center': {
    alignSelf: 'center',
  },
  /*
   * Border
   */
  'border-l': {
    borderLeftWidth: 1,
  },
  'border-t': {
    borderTopWidth: 1,
  },
  'border-b': {
    borderBottomWidth: 1,
  },
  'border-b-2': {
    borderBottomWidth: 2,
  },
  'border-r': {
    borderRightWidth: 1,
  },
  /*
   * Spacing
   */
  'mt-2': {
    marginTop: 2,
  },
  'mt-4': {
    marginTop: 4,
  },
  'mt-6': {
    marginTop: 6,
  },
  'mb-6': {
    marginBottom: 6,
  },
  'mx-3': {
    marginLeft: 3,
    marginRight: 3,
  },
  'p-2': {
    padding: 2,
  },
  'p-8': {
    padding: 8,
  },
  'pt-2': {
    paddingTop: 2,
  },
  'py-2': {
    paddingVertical: 2,
  },
  'px-6': {
    paddingHorizontal: 6,
  },
  'pb-6': {
    paddingBottom: 6,
  },
  /*
   * Text
   */
  'text-center': {
    textAlign: 'center',
  },
  /*
   * Radius
   */
  rounded: {
    borderRadius: 3,
  },
  'rounded-full': {
    borderRadius: 9999,
  },
  /*
   * Z Index
   */
  'z-0': {
    zIndex: 0,
  },
  'z-10': {
    zIndex: 10,
  },
  'z-20': {
    zIndex: 20,
  },
  /*
   * Width
   */
  'w-36': {
    width: 36,
  },
  'w-50': {
    width: 50,
  },
  'h-36': {
    height: 36,
  },
  /*
   * Misc
   */
  'overflow-hidden': {
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
  },
  truncate:
    Platform.OS === 'web'
      ? {
          overflow: 'hidden',
          // textOverflow: 'ellipsis',
          // whiteSpace: 'nowrap',
        }
      : {},
})

const typedMemo = React__default.memo
const DAY_MINUTES = 1440
function getDatesInMonth(date = new Date(), locale = 'en') {
  const subject = dayjs(date)
  const days = Array(subject.daysInMonth() - 1)
    .fill(0)
    .map((_, i) => {
      return subject.date(i + 1).locale(locale)
    })
  return days
}
function getDatesInWeek(date = new Date(), weekStartsOn = 0, locale = 'en') {
  const subject = dayjs(date)
  const subjectDOW = subject.day()
  const days = Array(7)
    .fill(0)
    .map((_, i) => {
      return subject
        .add(i - (subjectDOW < weekStartsOn ? 7 + subjectDOW : subjectDOW) + weekStartsOn, 'day')
        .locale(locale)
    })
  return days
}
function getDatesInNextThreeDays(date = new Date(), locale = 'en') {
  const subject = dayjs(date).locale(locale)
  const days = Array(3)
    .fill(0)
    .map((_, i) => {
      return subject.add(i, 'day')
    })
  return days
}
function getDatesInNextOneDay(date = new Date(), locale = 'en') {
  const subject = dayjs(date).locale(locale)
  const days = Array(1)
    .fill(0)
    .map((_, i) => {
      return subject.add(i, 'day')
    })
  return days
}
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
function parseStartEndHour(time) {
  const timeArray = time.split(':').map((x) => +x)
  let now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...timeArray)
}
function padZeros(value, length) {
  return `0000${value}`.slice(-length)
}
function getTimeContext(minutes) {
  const minute = minutes % 60
  const hour24 = Math.floor(minutes / 60)
  const hour12 = hour24 % 12 || 12
  const ampm = hour24 < 12 ? 'am' : 'pm'
  return {
    minute,
    hour24,
    hour12,
    ampm,
    hour24Label: `${padZeros(hour24, 2)}:${padZeros(minute, 2)}`,
    hour12Label: `${hour12}:${padZeros(minute, 2)}${ampm}`,
  }
}
function generateHoursArray(minTimeMinutes, maxTimeMinutes, stepMinutes) {
  let res = []
  while (minTimeMinutes <= maxTimeMinutes) {
    let time = getTimeContext(minTimeMinutes)
    res.push(time)
    minTimeMinutes = minTimeMinutes + stepMinutes
  }
  return res
}
function isToday(date) {
  const today = dayjs()
  return today.isSame(date, 'day')
}
function normalize(val, minVal, maxVal, newMin, newMax) {
  return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal)
}
function getRelativeTopInDay(date, minTimeMinutes, maxTimeMinutes) {
  let res = normalize(date.hour() * 60 + date.minute(), minTimeMinutes, maxTimeMinutes, 0, 100)
  return res
}
function todayInMinutes() {
  const today = dayjs()
  return today.diff(dayjs().startOf('day'), 'minute')
}
function modeToNum(mode, current) {
  if (mode === 'month') {
    if (!current) {
      throw new Error('You must specify current date if mode is month')
    }
    if (current instanceof Date) {
      current = dayjs(current)
    }
    return current.daysInMonth() - current.date() + 1
  }
  switch (mode) {
    case 'day':
      return 1
    case '3days':
      return 3
    case 'week':
    case 'custom':
      return 7
    default:
      throw new Error('undefined mode')
  }
}
function formatStartEnd(start, end, format) {
  return `${dayjs(start).format(format)} - ${dayjs(end).format(format)}`
}
function isAllDayEvent(start, end) {
  const _start = dayjs(start)
  const _end = dayjs(end)
  return _start.hour() === 0 && _start.minute() === 0 && _end.hour() === 0 && _end.minute() === 0
}
function getCountOfEventsAtEvent(event, eventList) {
  return eventList.filter(
    (e) =>
      dayjs(event.start).isBetween(e.start, e.end, 'minute', '[)') ||
      dayjs(e.start).isBetween(event.start, event.end, 'minute', '[)'),
  ).length
}
function getOrderOfEvent(event, eventList) {
  const events = eventList
    .filter(
      (e) =>
        dayjs(event.start).isBetween(e.start, e.end, 'minute', '[)') ||
        dayjs(e.start).isBetween(event.start, event.end, 'minute', '[)'),
    )
    .sort((a, b) => {
      if (dayjs(a.start).isSame(b.start)) {
        return dayjs(a.start).diff(a.end) < dayjs(b.start).diff(b.end) ? -1 : 1
      } else {
        return dayjs(a.start).isBefore(b.start) ? -1 : 1
      }
    })
  const index = events.indexOf(event)
  return index === -1 ? 0 : index
}
function getStyleForOverlappingEvent(eventPosition, overlapOffset, palettes) {
  let overlapStyle = {}
  const offset = overlapOffset
  const start = eventPosition * offset
  const zIndex = 100 + eventPosition
  const bgColors = palettes.map((p) => p.main)
  overlapStyle = {
    start: start + OVERLAP_PADDING,
    end: OVERLAP_PADDING,
    backgroundColor: bgColors[eventPosition % bgColors.length] || bgColors[0],
    zIndex,
  }
  return overlapStyle
}
function getDatesInNextCustomDays(
  date = new Date(),
  weekStartsOn = 0,
  weekEndsOn = 6,
  locale = 'en',
) {
  const subject = dayjs(date)
  const subjectDOW = subject.day()
  const days = Array(weekDaysCount(weekStartsOn, weekEndsOn))
    .fill(0)
    .map((_, i) => {
      return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale)
    })
  return days
}
// TODO: This method should be unit-tested
function weekDaysCount(weekStartsOn, weekEndsOn) {
  // handle reverse week
  if (weekEndsOn < weekStartsOn) {
    let daysCount = 1
    let i = weekStartsOn
    while (i !== weekEndsOn) {
      ++i
      ++daysCount
      if (i > 6) {
        i = 0
      }
      // fallback for infinite
      if (daysCount > 7) {
        break
      }
    }
    return daysCount
  }
  // normal week
  if (weekEndsOn > weekStartsOn) {
    return weekEndsOn - weekStartsOn + 1
  }
  // default
  return 1
}
function getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths) {
  const dayWidth = calendarWidth / 7
  // adding + 1 because durations start at 0
  const eventDuration =
    Math.floor(dayjs.duration(dayjs(event.end).diff(dayjs(event.start))).asDays()) + 1
  const eventDaysLeft = Math.floor(dayjs.duration(dayjs(event.end).diff(date)).asDays()) + 1
  const weekDaysLeft = 7 - dayOfTheWeek
  const monthDaysLeft = date.endOf('month').date() - date.date()
  // console.log(dayOfTheWeek === 0 && !showAdjacentMonths && monthDaysLeft < 7)
  const isMultipleDays = eventDuration > 1
  // This is to determine how many days from the event to show during a week
  const eventWeekDuration =
    !showAdjacentMonths && monthDaysLeft < 7 && monthDaysLeft < eventDuration
      ? monthDaysLeft + 1
      : eventDaysLeft > weekDaysLeft
      ? weekDaysLeft
      : eventDaysLeft < eventDuration
      ? eventDaysLeft
      : eventDuration
  const isMultipleDaysStart =
    isMultipleDays &&
    (date.isSame(event.start, 'day') ||
      (dayOfTheWeek === 0 && date.isAfter(event.start)) ||
      (!showAdjacentMonths && date.get('date') === 1))
  // - 6 to take in account the padding
  const eventWidth = dayWidth * eventWeekDuration - 6
  return { eventWidth, isMultipleDays, isMultipleDaysStart, eventWeekDuration }
}
function objHasContent(obj) {
  return !!Object.keys(obj).length
}
function stringHasContent(string) {
  return !!string.length
}
function getWeeksWithAdjacentMonths(targetDate, weekStartsOn) {
  let weeks = calendarize(targetDate.toDate(), weekStartsOn)
  const firstDayIndex = weeks[0].findIndex((d) => d === 1)
  const lastDay = targetDate.endOf('month').date()
  const lastDayIndex = weeks[weeks.length - 1].findIndex((d) => d === lastDay)
  weeks = weeks.map((week, iw) => {
    return week.map((d, id) => {
      if (d !== 0) {
        return d
      } else if (iw === 0) {
        return d - (firstDayIndex - id - 1)
      } else {
        return lastDay + (id - lastDayIndex)
      }
    })
  })
  return weeks
}

function useNow(enabled) {
  const [now, setNow] = React__default.useState(dayjs())
  React__default.useEffect(() => {
    if (!enabled) {
      return () => {}
    }
    const pid = setInterval(() => setNow(dayjs()), 60 * 1000)
    return () => clearInterval(pid)
  }, [enabled])
  return {
    now,
  }
}

const SWIPE_THRESHOLD = 50
function usePanResponder({ onSwipeHorizontal }) {
  const [panHandled, setPanHandled] = React__default.useState(false)
  const panResponder = React__default.useMemo(
    () =>
      PanResponder.create({
        // see https://stackoverflow.com/questions/47568850/touchableopacity-with-parent-panresponder
        onMoveShouldSetPanResponder: (_, { dx, dy }) => {
          return dx > 2 || dx < -2 || dy > 2 || dy < -2
        },
        onPanResponderMove: (_, { dy, dx }) => {
          if (dy < -1 * SWIPE_THRESHOLD || SWIPE_THRESHOLD < dy || panHandled) {
            return
          }
          if (dx < -1 * SWIPE_THRESHOLD) {
            onSwipeHorizontal && onSwipeHorizontal('LEFT')
            setPanHandled(true)
            return
          }
          if (dx > SWIPE_THRESHOLD) {
            onSwipeHorizontal && onSwipeHorizontal('RIGHT')
            setPanHandled(true)
            return
          }
        },
        onPanResponderEnd: () => {
          setPanHandled(false)
        },
      }),
    [panHandled, onSwipeHorizontal],
  )
  return panResponder
}

function useCalendarTouchableOpacityProps({
  event,
  eventCellStyle,
  injectedStyles = [],
  onPressEvent,
}) {
  const getEventStyle = React__default.useMemo(
    () => (typeof eventCellStyle === 'function' ? eventCellStyle : () => eventCellStyle),
    [eventCellStyle],
  )
  const plainJsEvent = React__default.useMemo(
    () =>
      Object.assign(Object.assign({}, event), {
        start: dayjs(event.start).toDate(),
        end: dayjs(event.end).toDate(),
      }),
    [event],
  )
  const _onPress = React__default.useCallback(() => {
    onPressEvent && onPressEvent(plainJsEvent)
  }, [onPressEvent, plainJsEvent])
  const touchableOpacityProps = {
    delayPressIn: 20,
    key: `${event.start.toISOString()}_${event.title}`,
    style: [eventCellCss.style, ...injectedStyles, getEventStyle(plainJsEvent)],
    onPress: _onPress,
    disabled: !onPressEvent,
  }
  return touchableOpacityProps
}

function DefaultCalendarEventRenderer({
  touchableOpacityProps,
  event,
  showTime = true,
  textColor,
  ampm,
}) {
  const theme = useTheme()
  const eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: textColor }
  const eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: textColor }
  return React.createElement(
    TouchableOpacity,
    Object.assign({}, touchableOpacityProps),
    dayjs(event.end).diff(event.start, 'minute') < 32 && showTime
      ? React.createElement(
          Text,
          { style: eventTitleStyle },
          event.title,
          ',',
          React.createElement(
            Text,
            { style: eventTimeStyle },
            dayjs(event.start).format(ampm ? 'hh:mm a' : 'HH:mm'),
          ),
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(Text, { style: eventTitleStyle }, event.title),
          showTime &&
            React.createElement(
              Text,
              { style: eventTimeStyle },
              formatStartEnd(event.start, event.end, ampm ? 'h:mm a' : 'HH:mm'),
            ),
          event.children && event.children,
        ),
  )
}

function _CalendarEvent({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventCount = 1,
  eventOrder = 0,
  overlapOffset = OVERLAP_OFFSET,
  renderEvent,
  ampm,
  minTimeMinutes = 0,
  maxTimeMinutes = 1440,
}) {
  const theme = useTheme()
  const palettes = React.useMemo(
    () => [theme.palette.primary, ...theme.eventCellOverlappings],
    [theme],
  )
  const getEventCellPositionStyle = (start, end) => {
    const relativeHeight =
      100 * (1 / (maxTimeMinutes - minTimeMinutes)) * dayjs(end).diff(start, 'minute')
    const relativeTop = getRelativeTopInDay(dayjs(start), minTimeMinutes, maxTimeMinutes)
    return {
      height: `${relativeHeight}%`,
      top: `${relativeTop}%`,
    }
  }
  const touchableOpacityProps = useCalendarTouchableOpacityProps({
    event,
    eventCellStyle,
    onPressEvent,
    injectedStyles: [
      getEventCellPositionStyle(event.start, event.end),
      getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
      u['absolute'],
      u['mt-2'],
      u['mx-3'],
    ],
  })
  const textColor = React.useMemo(() => {
    const fgColors = palettes.map((p) => p.contrastText)
    return fgColors[eventCount % fgColors.length] || fgColors[0]
  }, [eventCount, palettes])
  if (renderEvent) {
    return renderEvent(event, touchableOpacityProps)
  }
  return React.createElement(DefaultCalendarEventRenderer, {
    event: event,
    showTime: showTime,
    ampm: ampm,
    touchableOpacityProps: touchableOpacityProps,
    textColor: textColor,
  })
}
const CalendarEvent = typedMemo(_CalendarEvent)

const HourGuideCell = ({ cellHeight, onPress, date, hour, index, calendarCellStyle }) => {
  const theme = useTheme()
  const getCalendarCellStyle = React.useMemo(
    () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
    [calendarCellStyle],
  )
  const numberHour = hour.split(':')[0]
  const numberMinute = hour.split(':')[1]
  return React.createElement(
    TouchableWithoutFeedback,
    { onPress: () => onPress(date.hour(Number(numberHour)).minute(Number(numberMinute))) },
    React.createElement(View, {
      style: [
        u['border-l'],
        u['border-b'],
        { borderColor: theme.palette.gray['200'] },
        { height: cellHeight },
        Object.assign({}, getCalendarCellStyle(date.toDate(), index)),
      ],
    }),
  )
}

const _HourGuideColumn = ({ cellHeight, hour, hourStyle = {} }) => {
  const theme = useTheme()
  const textStyle = React.useMemo(
    () => ({ color: theme.palette.gray[500], fontSize: theme.typography.xs.fontSize }),
    [theme],
  )
  return React.createElement(
    View,
    { style: { height: cellHeight } },
    React.createElement(
      Text,
      { style: [objHasContent(hourStyle) ? hourStyle : textStyle, u['text-center']] },
      hour,
    ),
  )
}
const HourGuideColumn = React.memo(_HourGuideColumn, () => true)

const styles = StyleSheet.create({
  nowIndicator: {
    position: 'absolute',
    zIndex: 10000,
    height: 2,
    width: '100%',
  },
})
function _CalendarBody({
  containerHeight,
  cellHeight,
  dateRange,
  style,
  onPressCell,
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
  headerComponent = null,
  headerComponentStyle = {},
  hourStyle = {},
  minTimeMinutes = 0,
  maxTimeMinutes = 1440,
  stepMinutes = 60,
}) {
  const scrollView = React.useRef(null)
  const { now } = useNow(!hideNowIndicator)
  React.useEffect(() => {
    if (scrollView.current && scrollOffsetMinutes && Platform.OS !== 'ios') {
      // We add delay here to work correct on React Native
      // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
      setTimeout(
        () => {
          if (scrollView && scrollView.current) {
            scrollView.current.scrollTo({
              y: (cellHeight * scrollOffsetMinutes) / stepMinutes,
              animated: false,
            })
          }
        },
        Platform.OS === 'web' ? 0 : 10,
      )
    }
  }, [scrollView, scrollOffsetMinutes, cellHeight, stepMinutes])
  const panResponder = usePanResponder({
    onSwipeHorizontal,
  })
  const _onPressCell = React.useCallback(
    (date) => {
      onPressCell && onPressCell(date.toDate())
    },
    [onPressCell],
  )
  const _renderMappedEvent = (event) =>
    React.createElement(CalendarEvent, {
      key: `${event.start}${event.title}${event.end}`,
      event: event,
      onPressEvent: onPressEvent,
      eventCellStyle: eventCellStyle,
      showTime: showTime,
      eventCount: getCountOfEventsAtEvent(event, events),
      eventOrder: getOrderOfEvent(event, events),
      overlapOffset: overlapOffset,
      renderEvent: renderEvent,
      ampm: ampm,
      minTimeMinutes: minTimeMinutes,
      maxTimeMinutes: maxTimeMinutes,
    })
  const theme = useTheme()
  const hours = generateHoursArray(minTimeMinutes, maxTimeMinutes, stepMinutes)
  return React.createElement(
    React.Fragment,
    null,
    headerComponent != null
      ? React.createElement(View, { style: headerComponentStyle }, headerComponent)
      : null,
    React.createElement(
      ScrollView,
      Object.assign(
        {
          style: [
            {
              height: containerHeight - cellHeight * 3,
            },
            style,
          ],
          ref: scrollView,
          scrollEventThrottle: 32,
        },
        Platform.OS !== 'web' ? panResponder.panHandlers : {},
        {
          showsVerticalScrollIndicator: false,
          nestedScrollEnabled: true,
          contentOffset: Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 },
        },
      ),
      React.createElement(
        View,
        Object.assign(
          { style: [u['flex-1'], theme.isRTL ? u['flex-row-reverse'] : u['flex-row']] },
          Platform.OS === 'web' ? panResponder.panHandlers : {},
        ),
        React.createElement(
          View,
          { style: [u['z-20'], u['w-50']] },
          hours.map((hour, index) =>
            React.createElement(HourGuideColumn, {
              key: index + '',
              cellHeight: cellHeight,
              hour: ampm ? hour.hour12Label : hour.hour24Label,
              ampm: ampm,
              hourStyle: hourStyle,
            }),
          ),
        ),
        dateRange.map((date) =>
          React.createElement(
            View,
            { style: [u['flex-1'], u['overflow-hidden']], key: date.toString() },
            hours.map((hour, index) =>
              React.createElement(HourGuideCell, {
                key: index + '',
                cellHeight: cellHeight,
                date: date,
                hour: ampm ? hour.hour12Label : hour.hour24Label,
                onPress: _onPressCell,
                index: index,
                calendarCellStyle: calendarCellStyle,
              }),
            ),
            events
              .filter(({ start }) =>
                dayjs(start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'),
              )
              .map(_renderMappedEvent),
            events
              .filter(
                ({ start, end }) =>
                  dayjs(start).isBefore(date.startOf('day')) &&
                  dayjs(end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'),
              )
              .map((event) =>
                Object.assign(Object.assign({}, event), { start: dayjs(event.end).startOf('day') }),
              )
              .map(_renderMappedEvent),
            events
              .filter(
                ({ start, end }) =>
                  dayjs(start).isBefore(date.startOf('day')) &&
                  dayjs(end).isAfter(date.endOf('day')),
              )
              .map((event) =>
                Object.assign(Object.assign({}, event), {
                  start: dayjs(event.end).startOf('day'),
                  end: dayjs(event.end).endOf('day'),
                }),
              )
              .map(_renderMappedEvent),
            isToday(date) &&
              !hideNowIndicator &&
              React.createElement(View, {
                style: [
                  styles.nowIndicator,
                  { backgroundColor: theme.palette.nowIndicator },
                  { top: `${getRelativeTopInDay(now, minTimeMinutes, maxTimeMinutes)}%` },
                ],
              }),
          ),
        ),
      ),
    ),
  )
}
const CalendarBody = typedMemo(_CalendarBody)

function _CalendarEventForMonthView({
  event,
  onPressEvent,
  eventCellStyle,
  renderEvent,
  date,
  dayOfTheWeek,
  calendarWidth,
  isRTL,
  eventMinHeightForMonthView,
  showAdjacentMonths,
}) {
  const theme = useTheme()
  const { eventWidth, isMultipleDays, isMultipleDaysStart, eventWeekDuration } = React.useMemo(
    () => getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths),
    [date, dayOfTheWeek, event, calendarWidth, showAdjacentMonths],
  )
  const touchableOpacityProps = useCalendarTouchableOpacityProps({
    event,
    eventCellStyle,
    onPressEvent,
    injectedStyles: [
      { backgroundColor: theme.palette.primary.main },
      isMultipleDaysStart && eventWeekDuration > 1
        ? {
            position: 'absolute',
            width: eventWidth,
            zIndex: 10000,
          }
        : {},
      isRTL ? { right: 0 } : { left: 0 },
      u['mt-2'],
    ],
  })
  return React.createElement(
    TouchableOpacity,
    {
      style: { minHeight: eventMinHeightForMonthView },
      onPress: () =>
        onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(event),
    },
    (!isMultipleDays && date.isSame(event.start, 'day')) || (isMultipleDays && isMultipleDaysStart)
      ? renderEvent
        ? renderEvent(event, touchableOpacityProps)
        : React.createElement(
            View,
            Object.assign({}, touchableOpacityProps),
            React.createElement(
              Text,
              {
                style: [
                  { color: theme.palette.primary.contrastText },
                  theme.typography.xs,
                  u['truncate'],
                  isRTL && { textAlign: 'right' },
                ],
                numberOfLines: 1,
              },
              event.title,
            ),
          )
      : null,
  )
}
const CalendarEventForMonthView = typedMemo(_CalendarEventForMonthView)

function _CalendarBodyForMonthView({
  containerHeight,
  targetDate,
  style,
  onPressCell,
  onPressDateHeader,
  events,
  onPressEvent,
  eventCellStyle,
  calendarCellStyle,
  calendarCellTextStyle,
  onSwipeHorizontal,
  hideNowIndicator,
  showAdjacentMonths,
  renderEvent,
  maxVisibleEventCount,
  weekStartsOn,
  eventMinHeightForMonthView,
  moreLabel,
  sortedMonthView,
}) {
  const { now } = useNow(!hideNowIndicator)
  const [calendarWidth, setCalendarWidth] = React.useState(0)
  const panResponder = usePanResponder({
    onSwipeHorizontal,
  })
  const weeks = showAdjacentMonths
    ? getWeeksWithAdjacentMonths(targetDate, weekStartsOn)
    : calendarize(targetDate.toDate(), weekStartsOn)
  const minCellHeight = containerHeight / 5 - 30
  const theme = useTheme()
  const getCalendarCellStyle = React.useMemo(
    () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
    [calendarCellStyle],
  )
  const getCalendarCellTextStyle = React.useMemo(
    () =>
      typeof calendarCellTextStyle === 'function'
        ? calendarCellTextStyle
        : () => calendarCellTextStyle,
    [calendarCellTextStyle],
  )
  const sortedEvents = React.useCallback(
    (day) => {
      return sortedMonthView
        ? events
            .filter(({ start, end }) =>
              day.isBetween(dayjs(start).startOf('day'), dayjs(end).endOf('day'), null, '[)'),
            )
            .sort((a, b) => {
              if (dayjs(a.start).isSame(b.start, 'day')) {
                const aDuration = dayjs.duration(dayjs(a.end).diff(dayjs(a.start))).days()
                const bDuration = dayjs.duration(dayjs(b.end).diff(dayjs(b.start))).days()
                return bDuration - aDuration
              }
              return a.start.getTime() - b.start.getTime()
            })
        : events.filter(({ start, end }) =>
            day.isBetween(dayjs(start).startOf('day'), dayjs(end).endOf('day'), null, '[)'),
          )
    },
    [events, sortedMonthView],
  )
  return React.createElement(
    View,
    Object.assign(
      {
        style: [
          {
            height: containerHeight,
          },
          u['flex-column'],
          u['flex-1'],
          u['border-b'],
          u['border-l'],
          u['border-r'],
          u['rounded'],
          { borderColor: theme.palette.gray['200'] },
          style,
        ],
        onLayout: ({ nativeEvent: { layout } }) => setCalendarWidth(layout.width),
      },
      panResponder.panHandlers,
    ),
    weeks.map((week, i) =>
      React.createElement(
        View,
        {
          key: i,
          style: [
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            Platform.OS === 'android' && style,
            {
              minHeight: minCellHeight,
            },
          ],
        },
        week
          .map((d) => (showAdjacentMonths ? targetDate.date(d) : d > 0 ? targetDate.date(d) : null))
          .map((date, ii) =>
            React.createElement(
              TouchableOpacity,
              {
                onPress: () => date && onPressCell && onPressCell(date.toDate()),
                style: [
                  i > 0 && u['border-t'],
                  theme.isRTL && ii > 0 && u['border-r'],
                  !theme.isRTL && ii > 0 && u['border-l'],
                  { borderColor: theme.palette.gray['200'] },
                  u['p-2'],
                  u['flex-1'],
                  u['flex-column'],
                  {
                    minHeight: minCellHeight,
                  },
                  Object.assign(
                    {},
                    getCalendarCellStyle(
                      date === null || date === void 0 ? void 0 : date.toDate(),
                      i,
                    ),
                  ),
                ],
                key: ii,
              },
              React.createElement(
                TouchableOpacity,
                {
                  onPress: () =>
                    date &&
                    (onPressDateHeader
                      ? onPressDateHeader(date.toDate())
                      : onPressCell && onPressCell(date.toDate())),
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      { textAlign: 'center' },
                      theme.typography.sm,
                      {
                        color:
                          (date === null || date === void 0
                            ? void 0
                            : date.format('YYYY-MM-DD')) === now.format('YYYY-MM-DD')
                            ? theme.palette.primary.main
                            : (date === null || date === void 0 ? void 0 : date.month()) !==
                              targetDate.month()
                            ? theme.palette.gray['500']
                            : theme.palette.gray['800'],
                      },
                      Object.assign(
                        {},
                        getCalendarCellTextStyle(
                          date === null || date === void 0 ? void 0 : date.toDate(),
                          i,
                        ),
                      ),
                    ],
                  },
                  date && date.format('D'),
                ),
              ),
              date &&
                sortedEvents(date).reduce(
                  (elements, event, index, events) => [
                    ...elements,
                    index > maxVisibleEventCount
                      ? null
                      : index === maxVisibleEventCount
                      ? React.createElement(
                          Text,
                          {
                            key: index,
                            style: [
                              theme.typography.moreLabel,
                              { marginTop: 2, color: theme.palette.moreLabel },
                            ],
                          },
                          moreLabel.replace(
                            '{moreCount}',
                            `${events.length - maxVisibleEventCount}`,
                          ),
                        )
                      : React.createElement(CalendarEventForMonthView, {
                          key: index,
                          event: event,
                          eventCellStyle: eventCellStyle,
                          onPressEvent: onPressEvent,
                          renderEvent: renderEvent,
                          date: date,
                          dayOfTheWeek: ii,
                          calendarWidth: calendarWidth,
                          isRTL: theme.isRTL,
                          eventMinHeightForMonthView: eventMinHeightForMonthView,
                          showAdjacentMonths: showAdjacentMonths,
                        }),
                  ],
                  [],
                ),
            ),
          ),
      ),
    ),
  )
}
const CalendarBodyForMonthView = typedMemo(_CalendarBodyForMonthView)

function _CalendarHeader({
  dateRange,
  cellHeight,
  style,
  allDayEvents,
  onPressDateHeader,
  onPressEvent,
  activeDate,
  headerContentStyle = {},
  dayHeaderStyle = {},
  dayHeaderHighlightColor = '',
  weekDayHeaderHighlightColor = '',
  showAllDayEventCell = true,
  hideHours = false,
}) {
  const _onPressHeader = React.useCallback(
    (date) => {
      onPressDateHeader && onPressDateHeader(date)
    },
    [onPressDateHeader],
  )
  const _onPressEvent = React.useCallback(
    (event) => {
      onPressEvent && onPressEvent(event)
    },
    [onPressEvent],
  )
  const theme = useTheme()
  const borderColor = { borderColor: theme.palette.gray['200'] }
  const primaryBg = { backgroundColor: theme.palette.primary.main }
  return React.createElement(
    View,
    {
      style: [
        showAllDayEventCell ? u['border-b-2'] : {},
        showAllDayEventCell ? borderColor : {},
        theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
        style,
      ],
    },
    !hideHours && React.createElement(View, { style: [u['z-10'], u['w-50'], borderColor] }),
    dateRange.map((date) => {
      const shouldHighlight = activeDate ? date.isSame(activeDate, 'date') : isToday(date)
      return React.createElement(
        TouchableOpacity,
        {
          style: [u['flex-1'], u['pt-2']],
          onPress: () => _onPressHeader(date.toDate()),
          disabled: onPressDateHeader === undefined,
          key: date.toString(),
        },
        React.createElement(
          View,
          {
            style: [
              { height: cellHeight },
              objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                theme.typography.xs,
                u['text-center'],
                {
                  color: shouldHighlight
                    ? stringHasContent(weekDayHeaderHighlightColor)
                      ? weekDayHeaderHighlightColor
                      : theme.palette.primary.main
                    : theme.palette.gray['500'],
                },
              ],
            },
            date.format('ddd'),
          ),
          React.createElement(
            View,
            {
              style: objHasContent(dayHeaderStyle)
                ? dayHeaderStyle
                : shouldHighlight
                ? [
                    primaryBg,
                    u['h-36'],
                    u['w-36'],
                    u['pb-6'],
                    u['rounded-full'],
                    u['items-center'],
                    u['justify-center'],
                    u['self-center'],
                    u['z-20'],
                  ]
                : [u['mb-6']],
            },
            React.createElement(
              Text,
              {
                style: [
                  {
                    color: shouldHighlight
                      ? stringHasContent(dayHeaderHighlightColor)
                        ? dayHeaderHighlightColor
                        : theme.palette.primary.contrastText
                      : theme.palette.gray['800'],
                  },
                  theme.typography.xl,
                  u['text-center'],
                  Platform.OS === 'web' &&
                    shouldHighlight &&
                    !stringHasContent(dayHeaderHighlightColor) &&
                    u['mt-6'],
                ],
              },
              date.format('D'),
            ),
          ),
        ),
        showAllDayEventCell
          ? React.createElement(
              View,
              {
                style: [
                  u['border-l'],
                  { borderColor: theme.palette.gray['200'] },
                  { height: cellHeight },
                ],
              },
              allDayEvents.map((event, index) => {
                if (!dayjs(date).isBetween(event.start, event.end, 'day', '[]')) {
                  return null
                }
                return React.createElement(
                  TouchableOpacity,
                  {
                    style: [eventCellCss.style, primaryBg, u['mt-2']],
                    key: index,
                    onPress: () => _onPressEvent(event),
                  },
                  React.createElement(
                    Text,
                    {
                      style: {
                        fontSize: theme.typography.sm.fontSize,
                        color: theme.palette.primary.contrastText,
                      },
                    },
                    event.title,
                  ),
                )
              }),
            )
          : null,
      )
    }),
  )
}
const CalendarHeader = typedMemo(_CalendarHeader)

function _CalendarHeaderForMonthView({ locale, weekStartsOn, style }) {
  const dates = getDatesInWeek(new Date(), weekStartsOn, locale)
  const todayWeekNum = dayjs().day()
  const theme = useTheme()
  return React.createElement(
    View,
    {
      style: [
        u['border-b'],
        { borderColor: theme.palette.gray['100'] },
        theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
        style,
      ],
    },
    dates.map((date) =>
      React.createElement(
        View,
        { style: { flex: 1, paddingTop: 2 }, key: date.toISOString() },
        React.createElement(
          View,
          { style: { height: 30 } },
          React.createElement(
            Text,
            {
              style: [
                u['text-center'],
                {
                  color:
                    todayWeekNum === date.day()
                      ? theme.palette.primary.main
                      : theme.palette.gray['800'],
                },
              ],
            },
            date.format('ddd'),
          ),
        ),
      ),
    ),
  )
}
const CalendarHeaderForMonthView = typedMemo(_CalendarHeaderForMonthView)

function _CalendarContainer({
  events,
  height,
  hourRowHeight,
  ampm = false,
  date,
  eventCellStyle,
  calendarCellStyle,
  calendarCellTextStyle,
  locale = 'en',
  hideNowIndicator = false,
  mode = 'week',
  overlapOffset,
  scrollOffsetMinutes = 0,
  showTime = true,
  headerContainerStyle = {},
  headerContentStyle = {},
  dayHeaderStyle = {},
  dayHeaderHighlightColor = '',
  weekDayHeaderHighlightColor = '',
  bodyContainerStyle = {},
  swipeEnabled = true,
  weekStartsOn = 0,
  onChangeDate,
  onPressCell,
  onPressDateHeader,
  onPressEvent,
  renderEvent,
  renderHeader: HeaderComponent = CalendarHeader,
  renderHeaderForMonthView: HeaderComponentForMonthView = CalendarHeaderForMonthView,
  weekEndsOn = 6,
  maxVisibleEventCount = 3,
  eventMinHeightForMonthView = 22,
  activeDate,
  headerComponent = null,
  headerComponentStyle = {},
  hourStyle = {},
  showAllDayEventCell = true,
  minTimeMinutes = 0,
  maxTimeMinutes = 1440,
  stepMinutes = 60,
}) {
  const [targetDate, setTargetDate] = React__default.useState(dayjs(date))
  React__default.useEffect(() => {
    if (date) {
      setTargetDate(dayjs(date))
    }
  }, [date])
  const allDayEvents = React__default.useMemo(
    () => events.filter((event) => isAllDayEvent(event.start, event.end)),
    [events],
  )
  const daytimeEvents = React__default.useMemo(
    () => events.filter((event) => !isAllDayEvent(event.start, event.end)),
    [events],
  )
  const dateRange = React__default.useMemo(() => {
    switch (mode) {
      case 'month':
        return getDatesInMonth(targetDate, locale)
      case 'week':
        return getDatesInWeek(targetDate, weekStartsOn, locale)
      case '3days':
        return getDatesInNextThreeDays(targetDate, locale)
      case 'day':
        return getDatesInNextOneDay(targetDate, locale)
      case 'custom':
        return getDatesInNextCustomDays(targetDate, weekStartsOn, weekEndsOn, locale)
      default:
        throw new Error(
          `[react-native-big-calendar] The mode which you specified "${mode}" is not supported.`,
        )
    }
  }, [mode, targetDate, locale, weekEndsOn, weekStartsOn])
  React__default.useEffect(() => {
    if (onChangeDate) {
      onChangeDate([dateRange[0].toDate(), dateRange.slice(-1)[0].toDate()])
    }
  }, [dateRange, onChangeDate])
  const cellHeight = React__default.useMemo(
    () =>
      hourRowHeight ||
      Math.max(height - stepMinutes / 2, MIN_HEIGHT) /
        generateHoursArray(minTimeMinutes, maxTimeMinutes, stepMinutes).length,
    [height, hourRowHeight, minTimeMinutes, maxTimeMinutes, stepMinutes],
  )
  const theme = useTheme()
  const getDateRange = React__default.useCallback(
    (date) => {
      switch (mode) {
        case 'month':
          return getDatesInMonth(date, locale)
        case 'week':
          return getDatesInWeek(date, weekStartsOn, locale)
        case '3days':
          return getDatesInNextThreeDays(date, locale)
        case 'day':
          return getDatesInNextOneDay(date, locale)
        case 'custom':
          return getDatesInNextCustomDays(date, weekStartsOn, weekEndsOn, locale)
        default:
          throw new Error(
            `[react-native-big-calendar] The mode which you specified "${mode}" is not supported.`,
          )
      }
    },
    [mode, locale, weekEndsOn, weekStartsOn],
  )
  const onSwipeHorizontal = React__default.useCallback(
    (direction) => {
      if (!swipeEnabled) {
        return
      }
      let nextTargetDate
      if ((direction === 'LEFT' && !theme.isRTL) || (direction === 'RIGHT' && theme.isRTL)) {
        nextTargetDate = targetDate.add(modeToNum(mode, targetDate), 'day')
      } else {
        if (mode === 'month') {
          nextTargetDate = targetDate.add(targetDate.date() * -1, 'day')
        } else {
          nextTargetDate = targetDate.add(modeToNum(mode, targetDate) * -1, 'day')
        }
      }
      setTargetDate(nextTargetDate)
      if (onChangeDate) {
        const nextDateRange = getDateRange(nextTargetDate)
        onChangeDate([nextDateRange[0].toDate(), nextDateRange.slice(-1)[0].toDate()])
      }
    },
    [swipeEnabled, targetDate, mode, theme.isRTL, getDateRange, onChangeDate],
  )
  const commonProps = {
    cellHeight,
    dateRange,
    mode,
    onPressEvent,
  }
  if (mode === 'month') {
    const headerProps = {
      style: headerContainerStyle,
      locale: locale,
      weekStartsOn: weekStartsOn,
      headerContentStyle: headerContentStyle,
      dayHeaderStyle: dayHeaderStyle,
      dayHeaderHighlightColor: dayHeaderHighlightColor,
      weekDayHeaderHighlightColor: weekDayHeaderHighlightColor,
      showAllDayEventCell: showAllDayEventCell,
    }
    return React__default.createElement(
      React__default.Fragment,
      null,
      React__default.createElement(HeaderComponentForMonthView, Object.assign({}, headerProps)),
      React__default.createElement(
        CalendarBodyForMonthView,
        Object.assign(
          { showAdjacentMonths: false, moreLabel: '', sortedMonthView: false },
          commonProps,
          {
            style: bodyContainerStyle,
            containerHeight: height,
            events: [...daytimeEvents, ...allDayEvents],
            eventCellStyle: eventCellStyle,
            calendarCellStyle: calendarCellStyle,
            calendarCellTextStyle: calendarCellTextStyle,
            weekStartsOn: weekStartsOn,
            hideNowIndicator: hideNowIndicator,
            onPressCell: onPressCell,
            onPressEvent: onPressEvent,
            onSwipeHorizontal: onSwipeHorizontal,
            renderEvent: renderEvent,
            targetDate: targetDate,
            maxVisibleEventCount: maxVisibleEventCount,
            eventMinHeightForMonthView: eventMinHeightForMonthView,
          },
        ),
      ),
    )
  }
  const headerProps = Object.assign(Object.assign({}, commonProps), {
    style: headerContainerStyle,
    allDayEvents: allDayEvents,
    onPressDateHeader: onPressDateHeader,
    activeDate,
    headerContentStyle: headerContentStyle,
    dayHeaderStyle: dayHeaderStyle,
    dayHeaderHighlightColor: dayHeaderHighlightColor,
    weekDayHeaderHighlightColor: weekDayHeaderHighlightColor,
    showAllDayEventCell: showAllDayEventCell,
  })
  return React__default.createElement(
    React__default.Fragment,
    null,
    React__default.createElement(HeaderComponent, Object.assign({}, headerProps)),
    React__default.createElement(
      CalendarBody,
      Object.assign({}, commonProps, {
        style: bodyContainerStyle,
        containerHeight: height,
        events: daytimeEvents,
        eventCellStyle: eventCellStyle,
        calendarCellStyle: calendarCellStyle,
        hideNowIndicator: hideNowIndicator,
        overlapOffset: overlapOffset,
        scrollOffsetMinutes: scrollOffsetMinutes,
        ampm: ampm,
        showTime: showTime,
        onPressCell: onPressCell,
        onPressEvent: onPressEvent,
        onSwipeHorizontal: onSwipeHorizontal,
        renderEvent: renderEvent,
        headerComponent: headerComponent,
        headerComponentStyle: headerComponentStyle,
        hourStyle: hourStyle,
        minTimeMinutes: minTimeMinutes,
        maxTimeMinutes: maxTimeMinutes,
        stepMinutes: stepMinutes,
      }),
    ),
  )
}
const CalendarContainer = typedMemo(_CalendarContainer)

dayjs.extend(isBetween)
function _Calendar(_a) {
  //const _theme = merge(defaultTheme, theme, { isRTL }) as ThemeInterface
  var props = __rest(_a, ['theme', 'isRTL'])
  return React__default.createElement(
    ThemeContext.Provider,
    { value: defaultTheme },
    React__default.createElement(CalendarContainer, Object.assign({}, props)),
  )
}
const Calendar = typedMemo(_Calendar)

dayjs.extend(duration)
dayjs.extend(isBetween)

export {
  Calendar,
  CalendarBody,
  CalendarBodyForMonthView,
  CalendarEvent,
  CalendarEventForMonthView,
  CalendarHeader,
  CalendarHeaderForMonthView,
  DAY_MINUTES,
  DefaultCalendarEventRenderer,
  HOUR_GUIDE_WIDTH,
  MIN_HEIGHT,
  OVERLAP_OFFSET,
  OVERLAP_PADDING,
  ThemeContext,
  Calendar as default,
  defaultTheme,
  eventCellCss,
  formatStartEnd,
  generateHoursArray,
  getCountOfEventsAtEvent,
  getDatesInMonth,
  getDatesInNextCustomDays,
  getDatesInNextOneDay,
  getDatesInNextThreeDays,
  getDatesInWeek,
  getEventSpanningInfo,
  getOrderOfEvent,
  getRelativeTopInDay,
  getStyleForOverlappingEvent,
  getTimeContext,
  getWeeksWithAdjacentMonths,
  hours,
  isAllDayEvent,
  isToday,
  modeToNum,
  normalize,
  objHasContent,
  padZeros,
  parseStartEndHour,
  stringHasContent,
  todayInMinutes,
  typedMemo,
  u,
  useTheme,
}
//# sourceMappingURL=index.es.js.map

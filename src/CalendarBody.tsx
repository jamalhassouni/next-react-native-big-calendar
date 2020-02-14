import * as React from 'react'
import dayjs from 'dayjs'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { commonStyles, PRIMARY_COLOR } from './commonStyles'
import { formatHour, isToday, hours, getRelativeTopInDay, DAY_MINUTES } from './utils'
import { Event, EventCellStyle } from './interfaces'

function getEventCellPositionStyle({ end, start }: { end: dayjs.Dayjs; start: dayjs.Dayjs }) {
  const relativeHeight = 100 * (1 / DAY_MINUTES) * end.diff(start, 'minute')
  const relativeTop = getRelativeTopInDay(start)
  return {
    height: `${relativeHeight}%`,
    top: `${relativeTop}%`,
  }
}

interface DayJsConvertedEvent {
  title: string
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

interface CalendarBodyProps<T> {
  containerHeight: number
  cellHeight: number
  dateRange: dayjs.Dayjs[]
  dayJsConvertedEvents: DayJsConvertedEvent[]
  style: ViewStyle
  onPressEvent?: (event: Event<T>) => void
  eventCellStyle?: EventCellStyle<T>
  scrollOffsetMinutes?: number
}

export const CalendarBody = React.memo(
  ({
    containerHeight,
    cellHeight,
    dateRange,
    style = {},
    dayJsConvertedEvents,
    onPressEvent,
    eventCellStyle,
    scrollOffsetMinutes = 0,
  }: CalendarBodyProps<any>) => {
    const getEventStyle = React.useMemo(
      () => (typeof eventCellStyle === 'function' ? eventCellStyle : (_: any) => eventCellStyle),
      [eventCellStyle],
    )
    const scrollView = React.useRef<ScrollView>(null)
    const [now, setNow] = React.useState(dayjs())

    React.useEffect(() => {
      if (scrollView.current && scrollOffsetMinutes) {
        scrollView.current.scrollTo({ y: (cellHeight * scrollOffsetMinutes) / 60, animated: false })
      }
    }, [scrollView.current])

    React.useEffect(() => {
      setInterval(() => setNow(dayjs()), 2 * 60 * 1000)
    }, [])

    return (
      <ScrollView ref={scrollView} style={[{ height: containerHeight - cellHeight * 2 }, style]}>
        <View>
          <View style={[styles.body]}>
            <View style={[commonStyles.hourGuide]}>
              {hours.map(hour => (
                <View key={hour} style={{ height: cellHeight }}>
                  <Text style={commonStyles.guideText}>{formatHour(hour)}</Text>
                </View>
              ))}
            </View>
            {dateRange.map(date => (
              <View style={[{ flex: 1 }]} key={date.toString()}>
                {hours.map(hour => (
                  <View key={hour} style={[commonStyles.dateCell, { height: cellHeight }]} />
                ))}
                {dayJsConvertedEvents
                  .filter(
                    ({ start, end }) =>
                      start.isAfter(date.startOf('day')) && end.isBefore(date.endOf('day')),
                  )
                  .map(event => (
                    <TouchableOpacity
                      key={event.start.toString()}
                      style={[
                        styles.eventCell,
                        getEventCellPositionStyle(event),
                        getEventStyle(event),
                      ]}
                      onPress={() => onPressEvent && onPressEvent(event)}
                      disabled={!onPressEvent}
                    >
                      <Text style={styles.eventTitle}>{event.title}</Text>
                    </TouchableOpacity>
                  ))}
                {isToday(date) && (
                  <View style={[styles.nowIndicator, { top: `${getRelativeTopInDay(now)}%` }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  },
)

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 12,
  },
  eventCell: {
    position: 'absolute' as const,
    backgroundColor: PRIMARY_COLOR,
    zIndex: 100,
    width: '96%',
    alignSelf: 'center' as const,
    borderRadius: 3,
    padding: 4,
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: 'red',
    height: 2,
    width: '100%',
  },
})
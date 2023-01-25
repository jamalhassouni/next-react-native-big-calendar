import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Dimensions, Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Calendar, defaultTheme, modeToNum } from './Calendar'

const today = dayjs().toDate()
const Button = ({ content, onClick }) => {
  return <button onClick={onClick}>{content}</button>
}
const events = [
  {
    title: 'Meeting',
    start: dayjs().set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Coffee break',
    start: dayjs().set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'Meeting again',
    start: dayjs().set('hour', 16).set('minute', 30).toDate(),
    end: dayjs().set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner at the Plaza',
    start: dayjs().set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Go home',
    start: dayjs().set('hour', 21).set('minute', 30).toDate(),
    end: dayjs().set('hour', 22).set('minute', 30).toDate(),
  },
  {
    title: 'Read a book',
    start: dayjs().set('hour', 22).set('minute', 30).toDate(),
    end: dayjs().set('hour', 23).set('minute', 30).toDate(),
  },
  {
    title: 'Exercise',
    start: dayjs().add(1, 'day').set('hour', 5).set('minute', 0).toDate(),
    end: dayjs().add(1, 'day').set('hour', 5).set('minute', 30).toDate(),
  },
  {
    title: 'Repair my car',
    start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Gardening',
    start: dayjs().add(2, 'day').set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().add(2, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Mowing',
    start: dayjs().add(2, 'day').set('hour', 11).set('minute', 0).toDate(),
    end: dayjs().add(2, 'day').set('hour', 11).set('minute', 30).toDate(),
  },
  {
    title: 'Go to beach',
    start: dayjs().add(3, 'day').set('hour', 8).set('minute', 0).toDate(),
    end: dayjs().add(3, 'day').set('hour', 8).set('minute', 30).toDate(),
  },
  {
    title: 'Meeting 2',
    start: dayjs().add(7, 'day').set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().add(7, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Coffee break',
    start: dayjs().add(7, 'day').set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().add(7, 'day').set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'Dentist appointment',
    start: dayjs().add(8, 'day').set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().add(8, 'day').set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'Study',
    start: dayjs().add(9, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(12, 'day').set('hour', 20).set('minute', 30).toDate(),
  },
  {
    title: 'Go to airport',
    start: dayjs().add(10, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(10, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Meeting',
    start: dayjs().add(11, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(11, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Lunch',
    start: dayjs().add(11, 'day').set('hour', 12).set('minute', 0).toDate(),
    end: dayjs().add(11, 'day').set('hour', 13).set('minute', 0).toDate(),
  },
  {
    title: 'Shopping',
    start: dayjs().add(11, 'day').set('hour', 14).set('minute', 0).toDate(),
    end: dayjs().add(11, 'day').set('hour', 15).set('minute', 0).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(11, 'day').set('hour', 18).set('minute', 0).toDate(),
    end: dayjs().add(11, 'day').set('hour', 19).set('minute', 0).toDate(),
  },
  {
    title: 'Go to movies',
    start: dayjs().add(11, 'day').set('hour', 20).set('minute', 0).toDate(),
    end: dayjs().add(11, 'day').set('hour', 22).set('minute', 0).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(12, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(12, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(12, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(12, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(12, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(12, 'day').set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(12, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(12, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(13, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(13, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(13, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(13, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(13, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(13, 'day').set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(13, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(13, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(14, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(14, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(14, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(14, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(14, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(14, 'day').set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(14, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(14, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(15, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(15, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(15, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(15, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(15, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(15, 'day').set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(15, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(15, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(16, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(16, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(16, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(16, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(16, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(16, 'day').set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(16, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(16, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(17, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(17, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(17, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(17, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(17, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(17, 'day').set('hour', 17).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(17, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(17, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(18, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(18, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(18, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(18, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(18, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(18, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(18, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(18, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(19, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(19, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(19, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(19, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(19, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(19, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(19, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(19, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(20, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(20, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(20, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(20, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(20, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(20, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(20, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(20, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(21, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(21, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(21, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(21, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(21, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(21, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(21, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(21, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(22, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(22, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(22, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(22, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(22, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(22, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(22, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(22, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(23, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(23, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(23, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(23, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(23, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(23, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(23, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(23, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(24, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(24, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(24, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(24, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(24, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(24, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(24, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(24, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
  {
    title: 'Gym',
    start: dayjs().add(25, 'day').set('hour', 6).set('minute', 0).toDate(),
    end: dayjs().add(25, 'day').set('hour', 7).set('minute', 0).toDate(),
  },
  {
    title: 'Brunch',
    start: dayjs().add(25, 'day').set('hour', 9).set('minute', 30).toDate(),
    end: dayjs().add(25, 'day').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Work',
    start: dayjs().add(25, 'day').set('hour', 11).set('minute', 30).toDate(),
    end: dayjs().add(25, 'day').set('hour', 18).set('minute', 30).toDate(),
  },
  {
    title: 'Dinner',
    start: dayjs().add(25, 'day').set('hour', 18).set('minute', 30).toDate(),
    end: dayjs().add(25, 'day').set('hour', 19).set('minute', 30).toDate(),
  },
]
function App() {
  const [additionalEvents, setAdditionalEvents] = React.useState([])
  const [mode, setMode] = useState('week')
  const [date, setDate] = useState(today)

  const addEvent = React.useCallback(
    (start) => {
      const title = 'new Event'
      const end = dayjs(start).add(59, 'minute').toDate()
      setAdditionalEvents([...additionalEvents, { start, end, title }])
    },
    [additionalEvents, setAdditionalEvents],
  )
  const onPressEvent = React.useCallback((event) => {
    console.log('onPressEvent ', event)
  }, [])
  const onPressDateHeader = React.useCallback((event) => {
    console.log('onPressDateHeader ', event)
  }, [])
  const onChangeDate = React.useCallback((event) => {
    console.log('onChangeDate ', event)
  }, [])
  const onModeChange = React.useCallback((event) => {
    console.log('onModeChange ', event)
  }, [])

  const _onPrevDate = () => {
    if (mode === 'month') {
      let dd = dayjs(date).subtract(1, 'month').toDate()
      onChangeDate([dd, dd])
      setDate(dd)
    } else {
      let dd = dayjs(date)
        .add(modeToNum(mode, date) * -1, 'day')
        .toDate()
      onChangeDate([dd, dd])

      setDate(dd)
    }
  }

  const _onNextDate = () => {
    let dd = dayjs(date).add(modeToNum(mode, date), 'day').toDate()
    onChangeDate([dd, dd])
    setDate(dd)
  }

  const _onToday = () => {
    setDate(today)
    onChangeDate([today])
  }
  const textStyle = defaultTheme === 'dark' ? styles.textWhite : styles.textGray800

  const pickerStyle = [
    styles.pickerStyle,
    defaultTheme === 'dark' ? styles.pickerStyleDark : styles.pickerStyleNoraml,
  ]
  return (
    <div className="App">
      <View style={styles.View}>
        <View style={styles.ButtonsView}>
          <Button content="Today" onClick={_onToday} />
          <Button content="<" onClick={_onPrevDate} />
          <Button content=">" onClick={_onNextDate} />
          <View style={styles.currentDate}>
            <Text style={textStyle}>{dayjs(date).format('MMMM YYYY')}</Text>
          </View>
        </View>

        <Picker
          style={[pickerStyle]}
          selectedValue={mode}
          onValueChange={(text) => {
            onModeChange(text)
            setMode(text)
          }}
        >
          <Picker.Item value="day" label="Day" />
          <Picker.Item value="3days" label="3days" />
          <Picker.Item value="week" label="Week" />
          <Picker.Item value="month" label="Month" />
        </Picker>
      </View>
      <Calendar
        height={1024}
        events={[...events, ...additionalEvents]}
        onPressCell={addEvent}
        theme={'default'}
        sortedMonthView={false}
        weekStartsOn={1} // week start on Monday
        minTimeMinutes={480} // 8h
        maxTimeMinutes={1320} // 22h
        stepMinutes={30}
        onPressEvent={onPressEvent}
        onPressDateHeader={onPressDateHeader}
        mode={mode}
        //renderEvent={customEventRenderer}
        eventCellStyle={(event) => {
          let className = event.type == 'blocked' ? 'blocked_time' : 'simple'
          return { backgroundColor: event.color, className, color: '#000' }
        }}
        overlapOffset={70}
        activeDate={date}
        onChangeDate={onChangeDate}
        swipeEnabled={true}
        scrollOffsetMinutes={480} // 480 to scroll to 8am when the calendar rendered.
      />
    </div>
  )
}

export default App

export const styles = StyleSheet.create({
  desktop: {
    //height: "100%",
  },
  mobile: {
    display: 'flex',
    alignContent: 'center',
    height: '100%',
  },
  View: {
    display: 'flex',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: '1px',
    borderColor: '#E5E7EB',
  },
  ViewMobile: {
    display: 'flex',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: '1px',
    borderColor: '#E5E7EB',
  },
  currentDate: {
    marginLeft: '1rem',
  },
  ButtonsView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  pickerStyle: {
    marginVertical: 10,
    marginLeft: '1rem',
    marginRight: '1rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    color: '#374151',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    borderRadius: '0.25rem',
    borderColor: '#D1D5DB',
  },
  pickerStyleDark: {
    backgroundColor: '#1F2937',
    color: '#ffffff',
  },
  pickerStyleNoraml: {
    backgroundColor: '#ffffff',
    color: '#374151',
  },
  textWhite: {
    color: '#ffffff',
  },
  textGray800: {
    color: '#1F2937',
  },
  bgGray900: {
    backgroundColor: '#111827',
  },
})

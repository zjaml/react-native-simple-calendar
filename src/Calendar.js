import React, {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native'
import moment from 'moment'
import jaLocal from 'moment/locale/ja' //import this will cause the moment use ja locale

const {width} = Dimensions.get('window')

class Calendar extends React.Component {
  render() {
    console.log(moment.weekdaysMin())
    numberOfDays = moment().endOf('month').date()
    dayOfWeekOn1st = moment().date(1).day()
    let dateViews = []
    for(i = 0; i < dayOfWeekOn1st; i++){
      dateViews.push(<DateView key={-i}/>)
    }

    for(i = 1; i<= numberOfDays; i++ )
    {
      dateViews.push(<DateView key={i} text={i}/>)
    }
    //add fillers befor 1st.
    //add dates for current month
    return (
      <View style={styles.calendarContainer}>
        {dateViews}
      </View>
    )
  }
}

Calendar.propTypes = {
  // auto show selectedDate's month.
  selectedDate: React.PropTypes.string,
  eventDates: React.PropTypes.arrayOf(React.PropTypes.string)
}

Calendar.defaultProps = {
  eventDates: []
}

var DateView = ({text}) =>
  <View style={styles.dateViewContainer}>
    <Text>{text}</Text>
  </View>

var styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor:'gray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width
  },
  dateViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 7 - 1,
    height: width / 7 - 1,
  }
})

export default Calendar

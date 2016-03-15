import React, {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ViewPagerAndroid,
} from 'react-native'
import Constants from './constants'
import moment from 'moment'
import jaLocal from 'moment/locale/ja' //import this will cause the moment use ja locale
import ViewPager from 'react-native-viewpager'
const {width} = Dimensions.get('window')

var dataSource = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => {
    console.log(`p1: ${p1} p2: ${p2}`)
    return p1 !== p2
  }
});

class Calendar extends React.Component {
  render() {
    console.log(moment.weekdaysMin())
    const targetMonth = moment(this.props.monthToDisplay, Constants.MONTH_FORMAT)
    const prevMonth = moment(targetMonth).subtract(1, 'months')
    const nextMonth = moment(targetMonth).add(1, 'months')
    // return this.renderSingleMonthCalendar(targetMonth)
    let monthsToRender = []
    for(let i = -60; i <= 60; i ++){
      monthsToRender.push(i)
    }
    return <ViewPager style= {[ styles.viewPager,this.props.style]}
      dataSource = {dataSource.cloneWithPages(monthsToRender)}
      renderPage = {this.renderSingleMonthCalendar.bind(this)}
      renderPageIndicator = {false}
      initialPage = {0}
      />
  }

  renderSingleMonthCalendar(offset, page){
    console.log(`offset ${offset} page${page}`)
    let baseDate = moment().add(offset, 'months')
    const numberOfDays = moment(baseDate).endOf('month').date()
    const dayOfWeekOn1st = baseDate.startOf('month').day()
    // console.log(`numberOfDays ${numberOfDays} dayOfWeekOn1st ${dayOfWeekOn1st}`)
    let headingViews = moment.weekdaysMin().map((weekDay, index) =>
        <View style={styles.heading} key={`h:${index}`}><Text>{weekDay}</Text></View>)
    let dateViews = []
    //add month title
    //add headings
    //add fillers befor 1st.
    for(i = 0; i < dayOfWeekOn1st; i++){
      dateViews.push(<DateView key={-i} selected={false}/>)
    }
    //add dates for current month
    for(i = 1; i<= numberOfDays; i++ ){
      let d = moment(baseDate).date(i)
      dateViews.push(<DateView key={i} text={i}
        onPress = {this.selectDate.bind(this, d)}
        selected = {this.isDateSelected.bind(this, d)()}
        hasEvent = {this.hasEvent.bind(this,d)()}
        />)
    }

    return (
      <View>
        <Text>{baseDate.format(Constants.MONTH_FORMAT)}</Text>
      <View key={baseDate.format(Constants.MONTH_FORMAT)} style={styles.calendarContainer}>
        {headingViews}
        {dateViews}
      </View>
    </View>
    )
  }

  selectDate(date) {
    if(this.props.dateSelected)
      this.props.dateSelected(date.format(Constants.DATE_FORMAT))
  }

  isDateSelected(date){
    // console.log(`selectedDate ${selectedDate} date: ${date}`)
    if(this.props.selectedDate)
      return date.format(Constants.DATE_FORMAT) === this.props.selectedDate
    else
      return false;
  }

  hasEvent(date){
    return this.props.eventDates.indexOf(date.format(Constants.DATE_FORMAT)) > -1;
  }
}

Calendar.propTypes = {
  // in 'YYYY MM'
  monthToDisplay: React.PropTypes.string,
  selectedDate: React.PropTypes.string,
  dateSelected: React.PropTypes.func,
  eventDates: React.PropTypes.arrayOf(React.PropTypes.string)
}

Calendar.defaultProps = {
  eventDates: [],
  selectedDate: moment().format(Constants.DATE_FORMAT),
  monthToDisplay: moment().format(Constants.MONTH_FORMAT)
}

var DateView = ({text, onPress, selected, hasEvent}) =>{
  let eventView = null
  if(hasEvent)
    eventView = <View style={styles.point} />
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.dateViewContainer}>
        <Text style={selected?styles.selected:null}>{text}</Text>
        {eventView}
      </View>
    </TouchableOpacity>
  )
}

var styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    width: width,
    backgroundColor:'#ffffcc',
    // height: width * 5 / 7
  },
  viewPager: {
    // flex: 1
  },
  heading:{
    width: width / 7 - 1,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateViewContainer: {
    // backgroundColor: '#ffe6cc',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 7 - 1,
    height: width / 7 - 1,
  },
  selected:{
    color: 'red'
  },
  point: {
    position: 'absolute',
    bottom: 4,
    left: (width / 7 - 1 - 4 )/2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'red'
  }
})

export default Calendar

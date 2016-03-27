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
})

class Calendar extends React.Component {
  render() {
    let monthsToRender = []
    for(let i = -12; i <= 12; i ++){
      monthsToRender.push(i)
    }

    console.log(`calendar render method called with monthsToRender:${monthsToRender}`)
    return <ViewPager ref='viewPager' style= {[ styles.viewPager,this.props.style]}
      dataSource = {dataSource.cloneWithPages(monthsToRender)}
      renderPage = {this.renderSingleMonthCalendar.bind(this)}
      onChangePage = {
        pageNum => {
          console.log(`page changed: ${pageNum}`)
          // this.props.monthChanged(monthsToRender[pageNum - 1].format(Constants.MONTH_FORMAT))
        }
      }
      renderPageIndicator = {false}
      initialPage = {12}
      />
  }

  renderSingleMonthCalendar(offset, page){
    let baseDate = moment().add(offset, 'months')
    const numberOfDays = moment(baseDate).endOf('month').date()
    const dayOfWeekOn1st = baseDate.startOf('month').day()
    // console.log(`numberOfDays ${numberOfDays} dayOfWeekOn1st ${dayOfWeekOn1st}`)
    //add headings
    let headingViews = moment.weekdaysMin().map((weekDay, index) =>
        <View style={styles.heading} key={`h:${index}`}>
          <Text style={styles.headingText}>{weekDay}</Text>
        </View>)
    let dateViews = []
    //add fillers befor 1st.
    for(let i = 0; i < dayOfWeekOn1st; i++){
      dateViews.push(<DateView key={-i} selected={false}/>)
    }
    //add dates for current month
    for(let i = 1; i<= numberOfDays; i++ ){
      let d = moment(baseDate).date(i)
      dateViews.push(<DateView key={i} text={i}
        isToday = {this.isToday.bind(this, d)()}
        onPress = {this.selectDate.bind(this, d)}
        selected = {this.isDateSelected.bind(this, d)()}
        hasEvent = {this.hasEvent.bind(this,d)()}
        />)
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{baseDate.format(Constants.MONTH_FORMAT_DISPLAY)}</Text>
          <TouchableOpacity onPress={this.showCurrentMonth.bind(this)} style={styles.thisMonthButton}>
            <Text>今月</Text>
          </TouchableOpacity>
        </View>
        <View key={baseDate.format(Constants.MONTH_FORMAT)} style={styles.calendarContainer}>
        {headingViews}
        {dateViews}
      </View>
    </View>
    )
  }

  showCurrentMonth(){
    this.refs.viewPager.goToPage(13)
  }

  selectDate(date) {
    if(this.props.dateSelected)
      this.props.dateSelected(date.format(Constants.DATE_FORMAT))
  }

  isToday(date){
    return date.format(Constants.DATE_FORMAT) === moment().format(Constants.DATE_FORMAT)
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
  selectedDate: React.PropTypes.string,
  dateSelected: React.PropTypes.func,
  eventDates: React.PropTypes.arrayOf(React.PropTypes.string)
}

Calendar.defaultProps = {
  eventDates: [],
  selectedDate: moment().format(Constants.DATE_FORMAT),
  monthChanged: () => {}
}

var DateView = ({text, onPress, selected, hasEvent, isToday}) =>{
  let eventView = null
  if(hasEvent)
    eventView = <View style={styles.point} />
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.dateViewContainer, selected? styles.selected:null]}>
        <Text style={[styles.dateText,isToday? styles.today:null]}>{text}</Text>
        {eventView}
      </View>
    </TouchableOpacity>
  )
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'stretch'
  },

  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    width: width,
    borderWidth: .5,
    borderColor:'#ddd'
    // backgroundColor:'#ffffcc',
    // height: width * 5 / 7
  },
  viewPager: {
    // flex: 1
  },
  titleContainer:{
    width: width,
    flexDirection: 'row',
    alignItems:'center',
    height: 50,
    justifyContent: 'center'
  },
  titleText: {
    fontWeight: '500',
    fontSize: 18
  },
  thisMonthButton: {
    position: 'absolute',
    right: 10,
    top: 15
  },
  heading:{
    width: width / 7 - 1,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 3,
    borderBottomWidth: .5,
    borderColor: '#ddd',
  },
  headingText: {
    fontWeight: '500'
  },
  dateViewContainer: {
    // backgroundColor: '#ffe6cc',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 7 - 1,
    height: width / 7 - 1,
  },
  dateText: {
  },
  today: {
    color: 'red',
  },
  selected:{
    backgroundColor: '#ffe6cc',
    borderRadius: (width /7 - 1)/2
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

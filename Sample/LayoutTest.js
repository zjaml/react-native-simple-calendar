
'use strict'

import React, {
 AppRegistry,
 Component,
 StyleSheet,
 Text,
 View
} from 'react-native';

class LayoutTest extends Component {
  render(){
    return (
      <View style= {{backgroundColor: 'green', }}>
        <View style={styles.parent}>
          {this.renderChild(15, 0)}
          <View style={{width:100}}></View>
          {this.renderChild(60, 1)}
        </View>
        <View style={styles.parent}>
          {this.renderChild(15, 2)}
        </View>
      </View>
    )
  }

  renderChild(count, pkey){
    let childViews = []
    for(let i=0; i< count; i ++){
      childViews.push(<View key={`${pkey}:${i}`} style={styles.child}></View>)
    }
    return childViews
  }
}

let styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#ffffcc',
    // height: 200,
    margin: 1
  },
  child: {
    width: 30,
    height: 30,
    backgroundColor: '#ff6666'
  }
})

export default LayoutTest

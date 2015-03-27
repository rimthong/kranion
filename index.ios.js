/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TabBarIOS,
  SliderIOS,
  View,
} = React;

var TabBarItemIOS = TabBarIOS.Item;

var Kranion = React.createClass({

  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    var rows = [
      {id: 1, dateTime: '2015-01-01 09:00 AM', trigger:'light', treatment:'aspirin', pain:1, comment:'Just a little migraine'},
      {id: 2, dateTime: '2015-01-02 10:00 AM', trigger:'smell', treatment:'vicodin', pain:4, comment:'A bit bigger, and persistent'},
      {id: 3, dateTime: '2015-01-03 8:30 AM', trigger:'nuts', treatment:'injection', pain:6, comment:'Uuuuuugh, brain melting.'},
      {id: 4, dateTime: '2015-01-04 01:20 PM', trigger:'alex being a dick', treatment:'NOTHING WORKS', pain:10, comment:"I'm gonna stab him"}
    ]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      inputPain: 0,
      selectedTab: 'listTab',
      dataSource: ds.cloneWithRows(rows)
    };
  },
  render: function() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarItemIOS
          name="listTab"
          icon={{uri:'favorites'}}
          accessibilityLabel="List Tab"
          selected={this.state.selectedTab === 'listTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'listTab',
            });
          }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEntry}
            style={styles.listView}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          name="editTab"
          icon={{uri:'bookmarks'}}
          accessibilityLabel="Edit Tab"
          selected={this.state.selectedTab === 'editTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'editTab',
            });
          }}>
          <View style={styles.formContainer}>
            <Text>Pain</Text>
            <SliderIOS
              style={styles.slider}
              onValueChange={(value) => this.setState({inputPain: value})} />
            <Text>Trigger</Text>
            <TextInput
              placeholder="Sunlight, food, ..."
              onChangeText={(text) => this.setState({inputTrigger: text})}
              style={styles.textInputDefault}
            />
            <Text>Treatment</Text>
            <TextInput
              placeholder="Aspirin, immitrex, ..."
              onChangeText={(text) => this.setState({inputTreatment: text})}
              style={styles.textInputDefault}
            />
            <Text>Comment</Text>
            <TextInput
              placeholder="Extra details"
              onChangeText={(text) => this.setState({inputComment: text})}
              style={styles.textInputDefault}
            />
          </View>
        </TabBarItemIOS>
      </TabBarIOS>
    );
  },
  renderEntry: function(entry) {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text>{entry.id}</Text>
          <Text>{entry.dateTime}</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text>{entry.comment}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{entry.trigger}</Text>
          <Text>{entry.treatment}</Text>
          <Text>{entry.pain}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  slider: {
    height: 10,
    margin: 10,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputDefault: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  dateContainer: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  dataContainer: {
    fontSize: 12,
    textAlign: 'right',
    margin: 10,
  },
  commentContainer: {
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
    color: '#333333',
  }
});

AppRegistry.registerComponent('Kranion', () => Kranion);

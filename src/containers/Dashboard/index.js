import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, ListItem, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import YBButton from '../../components/YBButton';
import YBInput from '../../components/YBInput';
import styles from './styles';
import Add from './Add.png';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Dashboard extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Events',
    headerTitleStyle: [{ alignSelf: 'center', color: colors.darkTextColor }, fonts.plainText],
    headerLeft: (
      <View />
  ),
    headerRight: (
      <View />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      data: [{ title: 'Thanksgiving at Mammaws', details: '11/22/17 @ 6 pm', completed: false }, { title: 'Thanksgiving at Mimis', details: '11/23/17 @ 6 pm' , completed: false }, { title: 'Thanksgiving at Grandmas', details: '11/15/17 @ 1 pm', completed: true }, { title: 'Work Holiday Party', details: '11/10/17 @ 12:20 pm', completed: true }],
    };
  }

  renderHeader = () => {
    return (
      <View>

      </View>
    );
  }

  renderListHeader = () => {
    return (
      <TouchableOpacity style={styles.header} onPress={() => this.props.navigation.navigate('Create')} >
        <Text style={styles.headerText}>Create new Event</Text>
        <Image
        style={styles.headerAddImage}
          source={Add}/>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={item.completed ? styles.listItemCompleted : styles.listItemDefault}
              onPress={() => this.props.navigation.navigate('Details', {item})}
            >
              <Text style={styles.listItemText}>{item.title}</Text>
              <Text style={styles.listItemText}>{item.details}</Text>
              <Text style={styles.listItemText}>{item.completed ? 'completed' : null}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
          ListHeaderComponent={this.renderListHeader}
        />
      </View>
    );
  }
}

export default Dashboard;

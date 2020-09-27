import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Card,
  CardItem,
  Item,
  Footer,
  FooterTab,
} from 'native-base';
import {View, TouchableOpacity, Style, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
export default class NotificationComponent extends Component {
  render() {
    return (
      <Container >
        <Content style={{marginTop:27}}>
          <Card style={styles.cardstyle}>
            <CardItem style={styles.cardstyle}>
              <Text style={{color:"grey",textAlign:'center'}}>No Notifications</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  cardstyle: {
    backgroundColor: 'lightgrey',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center'
  },
});
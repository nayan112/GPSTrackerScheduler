import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.onChangeText = this.onChangeText.bind(this);
    this.serviceRef = this.updateRef.bind(this, 'serviceId');

    this.state = {
      serviceId: '',
      statusText: '',
      startButtonState: false,
      stopButtonState: true,
      latitude: null,
      longitude: null
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  onChangeText(text) {
    ['serviceId']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        this.setState({ serviceId: text });
      });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }
  SOSClicked = () => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     });
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
    fetch('http://gpstracker-gpstracker.a3c1.starter-us-west-1.openshiftapps.com/api/gps?posttype=sos', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceId : this.state.serviceId,
            WorkerTracker:[{
              Latitude:this.state.latitude,
              Longitude:this.state.longitude
            }]
          }),
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
          //Alert.alert("Error", "Error: "+ res.message);
    }
          else{
          this.setState({ auth_token: res.auth_token });
          //Alert.alert("Success", "You have succesfully signed up");
          }
        }).catch((error) => {
        //console.error(error);
        });
    this.setState({ statusText: 'SOS sent' })
  }
  StartClicked = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    fetch('http://gpstracker-gpstracker.a3c1.starter-us-west-1.openshiftapps.com/api/gps?posttype=start', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceId : this.state.serviceId,
            WorkerTracker:[{
              Latitude:this.state.latitude,
              Longitude:this.state.longitude
            }]
          }),
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
          //Alert.alert("Error", "Error: "+ res.message);
    }
          else{
          this.setState({ auth_token: res.auth_token });
          //Alert.alert("Success", "You have succesfully signed up");
          }
        }).catch((error) => {
        //console.error(error);
        });
    this.setState({ statusText: 'Service started' })
    this.setState({ startButtonState: true })
    this.setState({ stopButtonState: false })
  }
  StopClicked = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    fetch('http://gpstracker-gpstracker.a3c1.starter-us-west-1.openshiftapps.com/api/gps?posttype=stop', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceId : this.state.serviceId,
            WorkerTracker:[{
              Latitude:this.state.latitude,
              Longitude:this.state.longitude
            }]
          }),
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
          //Alert.alert("Error", "Error: "+ res.message);
    }
          else{
          this.setState({ auth_token: res.auth_token });
          //Alert.alert("Success", "You have succesfully signed up");
          }
        }).catch((error) => {
        //console.error(error);
        });
    this.setState({ statusText: 'Service completed' })
    this.setState({ startButtonState: false })
    this.setState({ stopButtonState: true })
  }
  CancelledClicked = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    fetch('http://gpstracker-gpstracker.a3c1.starter-us-west-1.openshiftapps.com/api/gps?posttype=cancel', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceId : this.state.serviceId,
            WorkerTracker:[{
              Latitude:this.state.latitude,
              Longitude:this.state.longitude
            }]
          }),
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
          //Alert.alert("Error", "Error: "+ res.message);
    }
          else{
          this.setState({ auth_token: res.auth_token });
          //Alert.alert("Success", "You have succesfully signed up");
          }
        }).catch((error) => {
        //console.error(error);
        });
    this.setState({ statusText: 'Service Cancelled' })
  }
  render() {
    let { serviceId } = this.state;
    let data = [{
      label: 'SR_001-CA001', value: 'SR_001'
    }, {
      label: 'SR_002-CA002', value: 'SR_002'
    }, {
      label: 'SR_003-CA003', value: 'SR_003'
    }, {
      label: 'SR_004-CA004', value: 'SR_004'
    }];
    return (
      <View style={{ margin: 50, padding: 50 }}>
        <Text style={styles.welcome}>Task Scheduler with GPS Tracker</Text>
        <Text style={styles.instructions}></Text>
        <ActivityIndicator size="large" color="#0000ff" animating={false} />
        <Text style={styles.instructions}></Text>
        <Dropdown label='Service ID - Confined Area' data={data} ref={this.serviceRef} value={serviceId} onChangeText={this.onChangeText} propsExtractor={({ props }, index) => props}/>
        <Button onPress={this.StartClicked} title="Start" disabled={this.state.startButtonState} />
        <Text style={styles.instructions}></Text>
        <Button onPress={this.StopClicked} title="Stop" disabled={this.state.stopButtonState} />
        <Text style={styles.instructions}></Text>
        <Button onPress={this.CancelledClicked} title="Cancel" />
        <Text style={styles.instructions}></Text>

        <Text style={styles.instructions}></Text>
        <Text style={styles.instructions}></Text>
        <Text style={styles.instructions}></Text>
        <Text style={styles.instructions}></Text>
        <Text style={styles.instructions}></Text>

        <Button color='red' onPress={this.SOSClicked} title="SOS" />
        <Text style={styles.instructions}></Text>
        <Text style={styles.welcome}>{this.state.statusText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
});

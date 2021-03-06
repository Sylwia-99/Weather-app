import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import Result from './Result'


const APIKey = '3ef1a1b77aa10b2768ef3f7c90292c0d'

class App extends Component{
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    tempFeels: '',
    pressure: '',
    wind: '',
    clouds: '',
    err: false
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  /*handleCitySubmit = (e) => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
  
    fetch(API)
    .then(response => {
      if(response.ok){
        return response
      }
      throw Error("Nie udało się")
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString()
      this.setState(prevState => ({
        err: false,
        date: time,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: prevState.value,
      }))
    })
    .catch(err => {
      console.log(err);
      this.setState(prevState =>({
        err: true,
        city: prevState.value
      }))
    })
  }*/

  componentDidUpdate(prevProps, prevState){
    if(this.state.value.length === 0 ) return;
    if(prevState.value !== this.state.value){
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
  
      fetch(API)
      .then(response => {
        if(response.ok){
          return response
        }
        throw Error("Nie udało się")
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString()
        this.setState(state => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          tempFeels: data.main.feels_like,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: state.value,
          clouds: data.clouds.all
        }))
      })
      .catch(err => {
        console.log(err);
        this.setState(state =>({
          err: true,
          city: state.value
        }))
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h2>Pogoda w Twoim mieście</h2>
        <Form 
        value={this.state.value} 
        change = {this.handleInputChange}
        //submit={this.handleCitySubmit}
        />
        <Result weather={this.state}/>
      </div>
    );
  }
}

export default App;

<template>
  <div id="app">
    <p>Calgary, AB</p>
    <p v-if="temp !==''">{{currTemp}} °<span class="temp" @click="convertTempurature">{{tempuratureUnits}}</span></p>
    <skycon :condition="weatherIcon" v-if="condition !==''" />
    <p>{{description}}</p>
    <p>Create By Phong Pham</p>
    <router-view/>
  </div>
</template>

<script>
const axios = require('axios')
let date = new Date()
let apiKey = 'd8a373b544e73c59487318679bfd12c4'
let city = 'Calgary'
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
export default {
  data: () => ({
    temp: '',
    condition: '',
    description: '',
    tempuratureUnits: 'F',
    currTemp: ''
  }),
  name: 'App',
  created: function () {
    this.fetchData(url)
  },
  methods: {
    fetchData: function (url) {
      axios.get(url)
        .then(response => {
          this.temp = response.data.main.temp
          this.currTemp = Math.round((this.temp - 273.15) * 1.8000 + 32.00)
          this.condition = response.data.weather[0].main
          this.description = response.data.weather[0].description
        })
    },
    convertTempurature: function () {
      if (this.tempuratureUnits === 'F') {
        this.currTemp = Math.round((this.currTemp - 32) * 5 / 9)
        this.tempuratureUnits = 'C'
      } else {
        this.currTemp = Math.round((this.currTemp * 9 / 5) + 32)
        this.tempuratureUnits = 'F'
      }
    }
  },
  computed: {
    kelvinToFahrenheit: function () {
      return Math.round((this.temp - 273.15) * 1.8000 + 32.00)
    },
    weatherIcon: function () {
      if (this.condition === 'Clouds') {
        return 'cloudy'
      } else if (this.condition === 'Snow') {
        return 'snow'
      } else if (this.condition === 'Clear') {
        if (date.getHours().toLocaleString('en-US', 'MDT') > 20) {
          return 'clear-night'
        } else {
          return 'clear-day'
        }
      } else if (this.condition === 'Rain') {
        return 'rain'
      } else if (this.condition === 'Sleet') {
        return 'sleet'
      } else if (this.condition === 'Fog') {
        return 'fog'
      } else {
        console.log('there was an error')
      }
    }
  }
}
</script>

<style>
body{
  background-color: black;
  color:white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.temp{
  cursor: pointer;
  color: #006dcc;
}
</style>

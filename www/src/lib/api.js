import axios from 'axios'
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos, error) => {
      if (error) reject(error)
      else resolve(pos)
    })
  })
}

export const getWeatherByLocation = pos => {
  return axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22(%20${pos.coords.latitude}%2C${pos.coords.longitude}%20)%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
}

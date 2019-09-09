
import axios from 'axios';

const createSensorData = (id, name, temp, hum, pm25, pm10, pressure) => {
  return {
      id,
      name,
      temp,
      hum,
      pm25,
      pm10,
      pressure
  } 
};

const getSensorData = () => {
    return new Promise((resolve, reject) => {
    axios.get('rpi-dht/dht').then((res) => {
        //console.log(res);
        console.log('Sensor data inside', createSensorData(
            res.data.device, 
            res.data.device,
            res.data.sensorData.temperature,
            res.data.sensorData.humidity));
        resolve([createSensorData(
            res.data.device, 
            res.data.device,
            res.data.sensorData.temperature,
            res.data.sensorData.humidity),
            createSensorData(
                res.data.device, 
                res.data.device,
                res.data.sensorData.temperature,
                res.data.sensorData.humidity)]);
    });
});
}

export {createSensorData, getSensorData};


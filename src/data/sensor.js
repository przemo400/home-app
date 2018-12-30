
import axios from 'axios';

const createSensorData = (id, name, temp, hum) => {
  return {
      id,
      name,
      temp,
      hum
  } 
};

const getSensorData = () => {
    axios.get('rpi-dht/dht?test=true').then((res) => {
        console.log(res);
        console.log('Sensor data inside', createSensorData(
            res.data.device, 
            res.data.device,
            res.data.temperature,
            res.data.humidity));
        return 'wracam';
    });
    return ['wracam'];
}

export {createSensorData, getSensorData};


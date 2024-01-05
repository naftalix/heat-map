import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getHeatMap, printHeatMapNumercLog } from './data/data-service';
import HeatMap from './components/HeatMap';
import { BucketOptions, NumericTimes } from './interfaces/general-interfaces';
import DropDown from './components/DropDown';

function App() {

  const convertStringDatesToNumericTimes = (timesDates: string[]): NumericTimes[] => {
    return timesDates
      .map<Date>((sDate) => new Date(sDate))
      .map<NumericTimes>((date) => ({ day: date.getDay(), hour: date.getHours() }));
  }

  const [times, setTimes] = useState<NumericTimes[]>([]);
  const [hoursRange, setHoursRange] = useState({ from: 0, to: 23 });
  const [colorLevel, setColorLevel] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('./data.json');
      let data = await res.json()
      let times = convertStringDatesToNumericTimes(data);
      setTimes(times);
    }
    fetchData();
  }, [])

  const handleHoursChange = (e: any) => {
    let val = e.value
    setHoursRange({ from: 0, to: val });
  }

  const handleColorChange = (e: any) => {
    let val = e.value
    setColorLevel(val);
  }

  return (
    <div className="App">
      {times.length !== 0 ?
        <HeatMap
          times={times}
          colorLevel={colorLevel}
          fromHour={hoursRange.from}
          toHour={hoursRange.to}
        /> :
        null}
      <div style={{display: "flex" ,width: "50%"}}>
        <DropDown options={BucketOptions} handleChange={handleHoursChange}></DropDown>
        <DropDown options={[
          {
            value: 5,
            label: "5 Colors",
          },
          {
            value: 3,
            label: "3 Colors",
          },
          {
            value: 4,
            label: "4 Colors",
          }
        ]} handleChange={handleColorChange}></DropDown>
      </div>
    </div>
  );
}

export default App;



import React from "react";
import "./App.css"
import {Chart} from "chart.js/auto";
import {Bar} from "react-chartjs-2"
import sourceData from "./data/sourceData.json"
import { useState,useEffect } from "react";

function App() {
  
  let [value,setValue]=useState("daily")    
  let [data,setData]=useState(sourceData)

  
  let inputchanged=(event)=>{
    
    setValue(event.target.value)
    
  }
  
  useEffect(()=>{
    
    let month_set=new Set()
    let month=[]

    /////  to calculate monthly data

    const monthlyData=(sourceData)=>{
      
      
      let month_data=sourceData.map(each=>{
      let date=new Date(each.timestamp)
      return month_set.add(date.getMonth()) })

      for(let i of month_set){
       
        if(i===0){
          let sum1=0
          sourceData.map(ele=>{
            let mon=new Date(ele.timestamp)
            
            if(mon.getMonth()===0){
              
              sum1+=ele.value
            }

          })
          let month1=sum1/31;
          month.push({
            timestamp:"January",
            value:month1,

          })
        }

      return month;
      
    }
    }
    
    //// to calculate weekly data

    let weeklyData=()=>{
      const weekly= [];
      
      console.log("data generated for ", value)
      for (let i = 0; i < sourceData.length; i +=7) {
        const chunk = sourceData.slice(i, i + 7);
        console.log("chunk[0]",chunk[0].timestamp)
        const sum = chunk.reduce((acc, item) => acc + item.value, 0);
        const average = sum / chunk.length;
        weekly.push({
          timestamp: chunk[0].timestamp,
          value: average,
        });
      }
      return weekly;


    }
    
    /* when the input value is changes like whether it is daily or weekly or monthly
       then the output will be loaded accordingly.
    */
    const filterData = () => {
      let filteredData = sourceData;
      console.log("value",value)
      console.log(value === "weekly")
      if (value === "weekly") {
        filteredData = weeklyData(sourceData, 7); 
      } else if (value === "monthly") {
        filteredData = monthlyData(sourceData);
      }
      setData(filteredData);
    };

    filterData()
  
    
  },[value])


  


  return (
    
    <div className="container">
      <div>
        <label className="heading" htmlFor="report">Select a value from given Dropdown   : </label>
        <select id="report" className="container-2" onChange={inputchanged} >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <h2>Your {value} report is Here!</h2>
      
     
        <Bar
          data={{
            labels:data.map((time)=>time.timestamp),
            datasets:[{
              label:"count",
              data:data.map((value)=> value.value)          
            }]
          }}
        />
     
         
    </div>
  );
}

export default App;

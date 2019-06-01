import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import axios from 'axios';
  
class Graph extends PureComponent {
    constructor(props){
      super(props);

      this.state = {
        monthlyData:[]
      }
    }
    async componentDidMount() {

      //fetch data from backend
      let responseData = await axios({
        method:'get',
        url:'http://localhost:5000/graphs'
      })
      
      let chartData = []
      
      //refactor data into an array. recharts barchart takes data as an array
      for(let dataPoint in responseData.data){
        let barPoint = {
          month:dataPoint,
          amount:responseData.data[dataPoint]
        }
        
        chartData.push(barPoint)
      }

      //set state with updated data from backend
      this.setState({monthlyData:[...chartData]})
        
    }

    render() {

      const data = this.state.monthlyData;

      return (
        <BarChart
          width={700}
          height={500}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      );
    }
  }

  export default Graph
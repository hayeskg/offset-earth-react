import React from 'react';
import './App.css';

import TreesChart from './components/TreesChart';

const axios = require('axios');



class App extends React.Component {

  state = {
    treesData: [],
    treesPerDay: [],
    dates: []
  }

  getTreesData = () => {
    axios.get('https://api.offset.earth/trees')
      .then(({ data }) => {
        this.setState({ treesData: [...data] })
      })
      .then(() => {
        return this.handleDates(this.state.treesData)
      })
      .then((arr) => {
        console.dir(arr)
        this.addTreesPerDay(arr);
      })

  }

  handleDates = (treesData) => {
    let formattedTreesData = [];
    treesData.map((dataObj) => {
      let tempDate = new Date(dataObj.createdAt);
      let tempYear = tempDate.getFullYear();
      let tempMonth = tempDate.getMonth();
      let tempDay = tempDate.getDate();
      let myDate = tempYear + '-' + tempMonth + '-' + tempDay;
      let outObj = { date: myDate, trees: dataObj.value };
      formattedTreesData.push(outObj);
    });
    formattedTreesData.sort((a, b) => a.date - b.date);
    return formattedTreesData;
  }

  addTreesPerDay = (formattedTreesData) => {
    let finalTreesData = [];
    let tempTreesSum = 0;
    for (let i = 0; i < formattedTreesData.length - 1; i++) {
      if (formattedTreesData[i].date === formattedTreesData[i + 1].date) {
        tempTreesSum += formattedTreesData[i].trees;
      } else {
        finalTreesData.push({ date: formattedTreesData[i].date, trees: formattedTreesData[i].trees })
      }
      tempTreesSum = 0;
    }
    console.dir(finalTreesData)
  }

  componentDidMount() {
    console.log('mounting...');
    this.getTreesData();
  }

  render() {
    return (
      <div className="App">
        <h1>Offset Earth front-end challenge by K Hayes</h1>
        <TreesChart />
        {/* {this.state.treesData.map((datapoint) => {
          return (
            <>
              <p>Trees planted: {datapoint.value}</p>
              <p>Date planted: {datapoint.createdAt}</p>
            </>
          )
        })} */}
      </div>
    )
  }


}


export default App;

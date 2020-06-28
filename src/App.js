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
        this.getXYArrays(this.state.treesData);
      })
  }

  getXYArrays = (treesData) => {
    let tempTreesPerDay = [];
    let tempDates = []
    treesData.map((dataObj) => {
      tempTreesPerDay.push(dataObj.value);
      tempDates.push(dataObj.createdAt);
    })
    console.log(tempTreesPerDay);
    console.dir(tempDates);
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
        {this.state.treesData.map((datapoint) => {
          return (
            <>
              <p>Trees planted: {datapoint.value}</p>
              <p>Date planted: {datapoint.createdAt}</p>
            </>
          )
        })}
      </div>
    )
  }


}


export default App;

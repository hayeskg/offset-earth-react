import React from 'react';
import './App.css';

const axios = require('axios');



class App extends React.Component {

  state = {
    treesData: []
  }

  getTreesData = () => {
    axios.get('https://api.offset.earth/trees')
      .then(({ data }) => {
        this.setState({ treesData: [...data] })
      })
  }

  componentDidMount() {
    console.log('mounting...');
    this.getTreesData();
  }

  render() {
    return (
      <div className="App">
        <h1>Offset Earth front-end challenge by K Hayes</h1>
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

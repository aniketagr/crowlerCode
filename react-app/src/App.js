import React from 'react';
import Table from './components/Table.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  async componentDidMount() {
    const url = "http://localhost:8081/listMovies";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ "apiResponse": data });
  }

  render() {
    return (
      <div className="App">
        <Table apiResponse={this.state.apiResponse} />
      </div>
    );
  }

}
export default App;

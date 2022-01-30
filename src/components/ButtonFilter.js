import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const data = makeData()

class FilterButtons extends React.Component {
  render() {
    const { props } = this;
    return (
      <div>
        <button onClick={(e) => {console.log("in A right now, ")props.filterFunc(e, "A")}} id="A" className="letter">A</button>
        <button onClick={(e) => props.filterFunc(e, "B")} id="B" className="letter">B</button>
        <button onClick={(e) => props.filterFunc(e, "C")} id="C" className="letter">C</button>
      </div>
    );
  }
}

const BottomMenu = props => (
  <div className="btm-menu">
    <div className="toprow">
      <div className="filter-keys">
        <FilterButtons filterFunc={props.filterFunc} />
      </div>
    </div>
  </div>
); 

class DataGridWithFilter extends React.Component {

  // you need constructor() for binding alphaFilter to this. 
  // otherwise it cannot call this.setState
  constructor(props) {
    super(props);
    this.state = {

    }
    this.alphaFilter = this.alphaFilter.bind(this);
  }

  // personally i do not use ids for passing data. 
  // therefore introduced the l parameter for the letter
  alphaFilter(e, l) {
    //console.log(e.target.id);
    this.setState({ filtered: [{ id: "dName", value: l.toLowerCase() }] });
  }

  render() {
    return <div>
      <DataGrid filtered={this.state.filtered}
        filterFunc={this.alphaFilter}
      />
      <BottomMenu filtered={this.state.filtered}
        filterFunc={this.alphaFilter} />
    </div>
  }
}

class DataGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          "dName": "aname aaaa",
          "dDept": "dept aaaa",
          "dRoom": "room aaaaaa"
        },
        {
          "dName": "bname bbbb",
          "dDept": "dept bbb",
          "dRoom": "room bbbb"
        }
      ]
    };
  }

  componentDidMount() {

    // fetch('http://localhost:3000/rooms.json').then((results) => results.json()).then((data) => {
    //   console.log(data.room);

    //   this.setState({
    //     data: [
    //       {
    //         "dName": "name aaaaa",
    //         "dDept": "dept aaaa",
    //         "dRoom": "room aaaaaa"
    //       }
    //     ]
    //   })
    // })
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "Name",
              accessor: "dName",
              //Filter: () => {0},
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Department",
              accessor: "dDept",
              filterable: false
            },
            {
              Header: "Room",
              accessor: "dRoom",
              filterable: false
            },
            {
              Header: "Map",
              accessor: "dRoom",
              id: "over",
              filterable: false
            }

          ]
          }

          defaultPageSize={14}
          className="-striped -highlight"
          filtered={this.props.filtered}
          onFilteredChange={filtered => this.props.filterFunc({ filtered })}
        />
        <br />
      </div>
    );
  }
}


const makeDefaultState = () => ({
  sorted: [],
  page: 0,
  pageSize: 10,
  expanded: {},
  resized: [],
  filtered: []
});

class App extends React.Component {
  constructor() {
    super();
    this.state = makeDefaultState();
    this.resetState = this.resetState.bind(this);
  }
  resetState() {
    this.setState(makeDefaultState());
  }
  render() {
    return (<DataGridWithFilter /> )
  }
}

render(<App />, document.getElementById("root"));

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';
import { RaceEvent } from './types/RaceEvent';
import { GetEvents} from './apis/RaceAPI'

interface IState {
  raceEvents?: RaceEvent[],
  columnDefs?: any,
  gridOptions?: any,
  options?: any
};

class App extends React.Component<IState> {

  public state: IState = {
    raceEvents: [],

    columnDefs: [
      { headerName: "Event Name", field: "EventName", filter: "agTextColumnFilter", sortable: true },
      { headerName: "Event Venue", field: "Venue", filter: "agTextColumnFilter", sortable: true },
      { headerName: "Time the event starts", field: "StartTime", filter: "agDateColumnFilter", sortable: true },
      {
        headerName: "", field: "Icon", width: 60,
        cellRenderer: function (params: any) {
          return '<img src="' + params.value + '" className="img-thumbnail"';
        }
      }

    ],
    gridOptions: {
      context: {
        componentParent: this,
      },
      rowHeight: 50,
      pagination: false
    },
  };

  async setStateAsync(state: IState) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    try {
      const events = await GetEvents();
      await this.setStateAsync({ raceEvents: events });
    } catch (error) {

    }
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container content panel">
            <div className="titleContainer panel">
              <div className="row">
                <div className="col-sm-2">
                  <img src={require('./assets/images/logo.png')} className="img-thumbnail" />
                </div>
                <div className="col-sm-3">
                  <h3 className="title-container__subtitle">www.beteasy.com</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ag-theme-balham" style={{ marginLeft: '20px', height: '360px', width: '90%' }}>
                <AgGridReact
                  columnDefs={this.state.columnDefs}
                  gridOptions={this.state.gridOptions}
                  domLayout='autoHeight'
                  rowData={this.state.raceEvents}>
                </AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

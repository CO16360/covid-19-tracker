import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/corona.css';
import CountUp from 'react-countup';
import CountryPicker from './CountryPicker'

export default class CoronaTracker extends Component {
    constructor(props){
        super(props);
        this.state={
            confirm:null,
            deaths:null,
            recovered:null,
            lastupdate:null,
            country:null

        }
    }
    handleCountryChange=(country)=>{
        axios.get("https://covid19.mathdro.id/api/countries/" + country)
        .then(response=>{
            this.setState({
                confirm:response.data.confirmed.value,
                deaths:response.data.deaths.value,
                recovered:response.data.recovered.value,
                lastupdate:response.data.lastUpdate
            })
        })
    }
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        axios.get('https://covid19.mathdro.id/api')
       .then(response=>{
           this.setState({
               confirm:response.data.confirmed.value,
               deaths:response.data.deaths.value,
               recovered:response.data.recovered.value,
               lastupdate:response.data.lastUpdate
           })
       })
      .catch(error=>{
          console.log(error.response);
          
      })
    }
    render() {
        return (
          <React.Fragment>
              <div className="corona-body">
                  <div className="container">
                      <div>
                          <div className="name">
                              <center>Covid-19 Tracker</center>
                              </div>
                      </div>
                      <center>
                          <p className="lastupdate">
                              <u>
                                  last update: {new Date(this.state.lastupdate).toDateString()}
                                  </u>
                          </p>
                          </center>
                  </div>
                  <CountryPicker handleCountryChange={this.handleCountryChange} />
                  <div className="card-deck card-decks">
                   <div className="card confirm box">
                       <div className="card-title c-title">
                           <center>Confirmed</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                               <CountUp
                               start={0}
                               end={this.state.confirm}
                               duration={1}
                               separator=","
                               className="number"/>
                               </div>
                   </div>
                   <div className="card recovered box">
                       <div className="card-title c-title">
                           <center>Recovered</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                               <CountUp
                               start={0}
                               end={this.state.recovered}
                               duration={1}
                               separator=","
                               className="number"/>
                               </div>
                   </div>
                   <div className="card deaths box">
                       <div className="card-title c-title">
                           <center>Deaths</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                               <CountUp
                               start={0}
                               end={this.state.deaths}
                               duration={1}
                               separator=","
                               className="number"/>
                               </div>
                   </div>
                   </div>
                 
                  </div>
                 

              
              </React.Fragment>
        )
    }
}

import React, { Component } from 'react'
import {NativeSelect,FormControl} from '@material-ui/core';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class CountryPicker extends Component {
    constructor(props){
        super(props);
        this.state={
            countries:[],
            country:""
        }
    }
    componentDidMount(){
        this.fetchCountries()
    }
    fetchCountries=()=>{
        axios.get("https://covid19.mathdro.id/api/countries")
        .then(response=>{
            this.setState({
                countries:response.data.countries
            })
        })
    }
    handleChange=(event)=>{
        var value=event.target.value;
        this.props.handleCountryChange(value);

    }
    render() {
        return (
          <center>
              <FormControl>
                  <NativeSelect onChange={this.handleChange}>
                     <option key="global" value="global">Global</option>
                     {
                         this.state.countries.map(c=>(
                         <option key={c.name} value={c.name}>{c.name}</option>
                         ))
                     }
                    
                      </NativeSelect>
                    
                  </FormControl>
              </center>
        )
    }
}

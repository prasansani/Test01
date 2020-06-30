import React, { Component } from 'react';
import Select from 'react-select';

const baseUrl = 'http://localhost:';

export class Home extends Component {

    state = {
        selectedCountry: "Please Select a Country",
        selectedState: "Please Select a State",
        selectedCity: "Please Select a City",
        countries: [],
        states: [],
        cities: []
    };

    componentDidMount() {
        this.fetchCountries();
    }

    fetchCountries() {
        fetch(`${baseUrl}3001/countries/getcountrylist`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ countries: data.map(country => ({ value: country.id, label: country.name })) });
            })
            .catch(console.log);
    }

    fetchStates(selectedCountry) {
        fetch(`${baseUrl}3002/states/getstatebycountry?countryId=${selectedCountry.value}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ states: data.map(state => ({ value: state.id, label: state.name })) });
            })
            .catch(console.log);
    }

    fetchCities(selectedState) {
        fetch(`${baseUrl}3003/cities/getcitiesbystate?stateId=${selectedState.value}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ cities: data.map(city => ({ value: city.id, label: city.name })) });
            })
            .catch(console.log);
    }

    onCountryChange = selectedCountry => {
        this.setState({ state: [], cities: [], selectedCountry: selectedCountry, selectedState: "Please Select a State", selectedCity: "Please Select a City" });
        this.fetchStates(selectedCountry);
    };

    onStateChange = selectedState => {
        this.setState({ cities: [], selectedState: selectedState, selectedCity: "Please Select a City" });
        this.fetchCities(selectedState);
    }

    onCityChange = selectedCity => {
        this.setState({ selectedCity: selectedCity });
    }

    render() {

        return (
            <form>
                <Select
                    value={this.state.selectedCountry}
                    onChange={this.onCountryChange}
                    options={this.state.countries}
                />

                <Select
                    value={this.state.selectedState}
                    onChange={this.onStateChange}
                    options={this.state.states}
                />

                <Select
                    value={this.state.selectedCity}
                    onChange={this.onCityChange}
                    options={this.state.cities}
                />
            </form >
        );
    }
}
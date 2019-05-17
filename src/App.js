import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    customers: [],
    customer: {
      id: 5,
      name: 'sample'
    }
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = _ => {
    fetch('http://localhost:4000/customers')
      .then(response => response.json())
      .then(response => this.setState({ customers: response.data }))
      .catch(err => console.error(err))
  }

  addCustomer = _ => {
      const { customer } = this.state;
      fetch(`http://localhost:4000/customers/add?id=${customer.id}&name=${customer.name}`)
      .then(this.getCustomer)
      .catch(err => console.error(err))
  }

  renderCustomer = ({customer_id, name})  => <div key={customer_id}>{name}</div>

  render() {
    const { customers, customer } = this.state;
    return (
      <div className="App">
        {customers.map(this.renderCustomer)}
        <div>
          <input 
            value = {customer.id} 
            onChange={ e => this.setState({ customer: { ...customer, id: e.target.value } })} />
          <input 
            value = {customer.name} 
            onChange={ e => this.setState({ customer: { ...customer, name: e.target.value } })} 
          />
          <button onClick={this.addCustomer}> Add Product </button>
        </div>
      </div>
    );
  }
}

export default App;

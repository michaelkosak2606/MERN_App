import React, { Component } from 'react';
import axios from 'axios'
import { CSSTransitionGroup } from 'react-transition-group'


import './App.css';

export default class App extends Component {
  state = {
    items: [],
    value: ""
  }
  handleChange = event => {
    this.setState({
      value: event.target.value
    })
  }
  checkEmptyString = item => {
    return item.replace(/ /g, "").length
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    const name = this.state.value
    const item = { "name": name }

    if (this.checkEmptyString(name) > 0) {
      this.setState({
        value: ""
      })
      await axios.post('/api/items', item).then(response => {
        this.fetchData()
      })
    }
  }
  handleRemove = async (id) => {
    const url = '/api/items/' + id
    await axios.delete(url).then(response => {
      this.fetchData()
    })
  }

  fetchData = async () => {
    const response = await axios.get('/api/items')
    const items = await Promise.all(response.data)
    await this.setState({
      items: [...items]
    })
  }
  async componentDidMount() {
    await this.fetchData()
  }

  render() {
    const items = this.state.items.map((item, index) => {
      return (
        <li key={item._id}> {item.name}  <button onClick={() => this.handleRemove(item._id)}> remove</button> </li>
      )
    })
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="label">
            <p> Add New Item:</p>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              style={{ outline: "none" }} />
          </label>
          <input type="submit" value="SAVE" />
        </form>
        <ul>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={1000}
          >
            {items}
          </CSSTransitionGroup>
        </ul>

      </div>
    );
  }
}


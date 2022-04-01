import {Component} from 'react'
import './App.css'
import {v4} from 'uuid'
import PasswordList from './component/PasswordList'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    updatedList: '',
    website: '',
    username: '',
    password: '',
    isChecked: false,
    isListPresent: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      updatedList: [prevState.updatedList, newValue],
      username: '',
      password: '',
      website: '',
      searchInput: '',
      isListPresent: true,
    }))
  }

  onShowPassword = event => {
    if (event.target.checked) {
      this.setState({isChecked: true})
    } else {
      this.setState({isChecked: false})
    }
  }

  deleteItem = id => {
    const {updatedList} = this.state
    const newList = updatedList.filter(eachValue => eachValue.id !== id)
    this.setState({updatedList: newList})
  }

  render() {
    const {
      updatedList,
      website,
      username,
      password,
      searchInput,
      isChecked,
    } = this.state
    let {isListPresent} = this.state
    const newList = updatedList.filter(eachValue =>
      eachValue.website.toLowercase().includes(searchInput.toLowercase()),
    )
    if (newList.length === 0) {
      isListPresent = false
    } else {
      isListPresent = true
    }
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="logo"
          />
        </div>
        <div>
          <div>
            <div>
              <form onSubmit={this.onAddContent}>
                <h1>Add New Password</h1>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    type="text"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
          <div>
            <div>
              <h1>Your Passwords</h1>
              <p>{newList.length}</p>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                onChange={this.onChangeSearch}
                placeholder="search"
                value={searchInput}
              />
            </div>
            <hr />
            <div>
              <input
                type="checkbox"
                onChange={this.onShowPassword}
                id="check"
              />
              <label htmlFor="check">Show Passwords</label>
            </div>
            {!isListPresent && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No passwords</p>
              </div>
            )}
            {isListPresent && (
              <ul>
                {newList.map(eachValue => (
                  <PasswordList
                    key={eachValue.id}
                    listDetails={eachValue}
                    isChecked={isChecked}
                    deleteItem={this.deleteItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App

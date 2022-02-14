import "./main.css";
import { Component } from "react";

import UserListItem from "../UserListItem";

class UserList extends Component {
  constructor() {
    super();
    this.state = { loading: true, users: [] };
  }
  async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_ADMIN_API_KEY}/user/list`
    );
    const json = await res.json();
    if (json.error) {
      console.error(json.error);
    }
    this.setState({ loading: false, users: json.data });
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="list">
          <h2>loading events...</h2>
        </div>
      );
    }
    return (
      <table className="admin-list">
        <thead>
          <tr>
            <th>Tools</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <UserListItem
            barcodeNums={this.state.users.map((x) => x.barcodeNum)}
          />
          {Object.keys(this.state.users).map((key) => (
            <UserListItem
              key={key}
              barcodeNum={this.state.users[key].barcodeNum}
              name={this.state.users[key].name}
              email={this.state.users[key].email}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default UserList;

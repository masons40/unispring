import React, { useEffect, useState } from "react";
import { getLoggedInUser, setLoggedInUser } from "./util";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    setLoggedInUser(undefined);
    window.location.replace("/login");
  }

  render() {
    const user = getLoggedInUser();

    return (
      <div id="sideMenu">
        <div className="has-text-centered">
          <div>
            <h1 className="title is-3 ">University of Springfield</h1>
          </div>
        </div>
        <figure className="image is-96x96">
          <i className="material-icons">face</i>
        </figure>
        <div className="has-text-centered">
          <div>
            <h2 className="heading">
              {user.forename} {user.surname}
            </h2>
          </div>
        </div>
        <div className="has-text-centered">
          <div>
              {user.stage !== undefined
                      ? <span className="tag is-info">STAGE {user.stage}</span>
                      : <span className="tag is-danger">STAFF</span>
              }
          </div>
        </div>

        <aside className="menu">
          <ul className="menu-list">
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">apps</i>
              </span>
              <a href="/modules">Modules</a>
            </li>
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">account_circle</i>
              </span>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">show_chart</i>
              </span>
              <a href="/stats">Stats</a>
            </li>
          </ul>

          <ul className="menu-list">
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">power_settings_new</i>
              </span>
              <a
                onClick={() => this.logout()}
                href="#"
                className="modal-button"
                data-target="#log-in-reg"
                aria-haspopup="true"
                id="logout-btn"
              >
                Logout
              </a>
            </li>
          </ul>
        </aside>
        <footer className="footer">
          <div className="has-text-centered">
            <h6>Copyright © University of Springfield</h6>
          </div>
        </footer>
      </div>
    );
  }
}

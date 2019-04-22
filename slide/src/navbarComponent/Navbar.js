import React, { Component } from 'react';
import './styles/navbar.scss';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false
    };
  }

  showNav = () => {
    if (!this.state.showNav) {
      this.setState(prevState => {
        return { showNav: !prevState['showNav'] };
      });
    } else {
      let a = this;
      document.getElementById('nav').classList.add('navbar_class_leave');
      setTimeout(function() {
        a.setState(prevState => {
          return { showNav: !prevState['showNav'] };
        });
      }, 450);
    }
  };

  render() {
    if (!this.state.showNav) {
      return <div className="static_nav_button" onClick={this.showNav} />;
    } else {
      return (
        <div>
          <div className="static_nav_button" onClick={this.showNav} />

          <div id="nav" className="navbar_class">
            <div className="transparent_circle_animation_div_wrap">
              <div className="transparent_circle_animation_div" />
            </div>
            <div className="navbar_items_wrap">
              <div className="navbar_items">
                <div className="navbar_item_top nav_icon_img">
                  <Link to="/login">
                    <div className="link" onClick={this.showNav} />
                  </Link>
                </div>
                <div className="navbar_item_left nav_icon_img">
                  <Link to="/profile">
                    <div className="link" onClick={this.showNav} />
                  </Link>
                </div>
                <div className="navbar_item_right nav_icon_img">
                  <Link to="/chats">
                    <div className="link" onClick={this.showNav} />
                  </Link>
                </div>
                <div className="navbar_item_close nav_icon_img" onClick={this.showNav} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Navbar;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand } from "@coreui/react";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand className="text-white">Microcontroller <i className="fa fa-cogs pl-1" aria-hidden="true"></i></AppNavbarBrand>
          <Nav className="d-md-down-none mr-auto" navbar>
            <NavItem className="px-3">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </NavItem>
          </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;

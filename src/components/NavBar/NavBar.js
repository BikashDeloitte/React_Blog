import { React, useEffect, useState } from "react";
//to avoid reload of paper
import { NavLink as ReactRouteLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { currentUser, doLoggedOut, isLoggedIn } from "../../auth/UserDataAuth";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(currentUser());
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  //logout redirect and clear local storage
  const doLogOut = () => {
    doLoggedOut();
    setIsLogin(false);
    navigate("/");
  };

  //for checking and getting user data for login/logout
  useEffect(() => {
    setUser(currentUser());
    setIsLogin(isLoggedIn());
  }, [isLogin]);

  return (
    <div>
      <Navbar color="dark" expand="md" dark fixed="top" className="px-3">
        <NavbarBrand tag={ReactRouteLink} to="/">
          My Blog
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactRouteLink} to="/home">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactRouteLink} to="/about">
                about
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                more
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Service</DropdownItem>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {isLogin && (
              <>
                <NavItem>
                  <NavLink onClick={() => doLogOut()}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactRouteLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
              </>
            )}
            {!isLogin && (
              <>
                <NavItem>
                  <NavLink tag={ReactRouteLink} to="login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactRouteLink} to="signup">
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;

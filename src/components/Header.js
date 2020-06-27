import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components"

//stylesheet
const Nav = styled.nav
`
  position: fixed;
  background-color: #f8f7fa;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1
`
const List = styled.ul
`
  display: flex;
  justify-content: center;
  list-style-type: none;
  font-size: 2rem;
  border-bottom: 1px solid;
`
const Item = styled.li
`
  margin: 1rem;
  border-bottom: 4px solid ${props => props.current ? "#9cb5a2" : "transparent"}
`
const I = styled.i
`
  color: ${props => props.current ? "#9cb5a2" : "black"}
`


// component
function Header({ location:{ pathname } }) {
  return (
    <Nav>
      <List>
        <Item current={pathname === "/"}>
          <Link to="/"><I current={pathname === "/"} className="fas fa-home"></I></Link>
        </Item>
        <Item current={pathname === "/tv"}>
          <Link to="/tv"><I current={pathname === "/tv"} className="fas fa-tv"></I></Link>
        </Item>
        <Item current={pathname === "/search"}>
          <Link to="/search"><I current={pathname === "/search"} className="fas fa-search"></I></Link>
        </Item>
      </List>
    </Nav>
  )
}

export default withRouter(Header)
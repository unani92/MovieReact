import React from "react";
import {Link} from "react-router-dom";
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
`

// component
function Header() {
  const onClick = event => {
    const icons = document.querySelectorAll("i")
    icons.forEach(icon => {
      if (icon.classList.contains("selected")) {
        icon.classList.remove("selected")
      }
    })
    event.target.classList.add("selected")
  }
  return (
    <Nav>
      <List>
        <Item>
          <Link to="/"><i onClick={onClick} className="fas fa-home selected"></i></Link>
        </Item>
        <Item>
          <Link to="/tv"><i onClick={onClick} className="fas fa-tv"></i></Link>
        </Item>
        <Item>
          <Link to="/search"><i onClick={onClick} className="fas fa-search"></i></Link>
        </Item>
      </List>
    </Nav>
  )
}

export default Header
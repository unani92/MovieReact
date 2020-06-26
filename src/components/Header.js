import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components"

const List = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  font-size: 2rem;
  border-bottom: 1px solid;
`
const Item = styled.li`
  margin: 1rem;
`
const Slink= styled(Link)`
  color: black;
  &:hover {
  text-decoration: none;
  color: #f54296
  }
`

function Header() {

  return (
    <nav>
      <List>
        <Item>
          <Slink to="/">Home</Slink>
        </Item>
        <Item>
          <Slink to="/tv">TV</Slink>
        </Item>
        <Item>
          <Slink to="/search">Search</Slink>
        </Item>
      </List>
    </nav>
  )
}

export default Header
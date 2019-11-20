import React from 'react'
import {
  Section,
  Title,
  SubTitle,
  Container,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
} from '@brightleaf/elements'
import { Link } from '@reach/router'

export default () => (
  <Section>
    <Title>Make Things</Title>
    <SubTitle as="p">Create awesome things</SubTitle>
    <Container>
      <br />
      <Menu>
        <MenuLabel>
          <SubTitle as="p">Items</SubTitle>
        </MenuLabel>
        <MenuList className="menu-list">
          <MenuListItem>
            <Link to="/contact">Contact Form</Link>
          </MenuListItem>
          <MenuListItem>
            <Link to="/backoff">Back Off</Link>
          </MenuListItem>
        </MenuList>
      </Menu>
    </Container>
  </Section>
)

import React, {useState} from 'react';
import {Link} from 'react-router-dom'
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
    NavbarText
} from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">TK Sukamaju</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink><Link to="/">Home</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/product">Product</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/topics">Topics</Link></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header
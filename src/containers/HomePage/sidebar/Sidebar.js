import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBriefcase,
    faPaperPlane,
    faQuestion,
    faImage,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
            <h3>Booking care</h3>
        </div>
        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
                <SubMenu className="mr-3" title="Home" icon={faHome} items={submenus[0]} />
                <NavItem>
                    <NavLink tag={Link} to={"/about"}>
                        <FontAwesomeIcon icon={faBriefcase} className="mr-3" />
                        About
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/faq"}>
                        <FontAwesomeIcon icon={faQuestion} className="mr-3" />
                        FAQ
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/contact"}>
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                        Contact
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>
);

const submenus = [
    [
        {
            title: "Home 1",
            target: "Home-1",
        },
        {
            title: "Home 2",
            target: "Home-2",
        },
        {
            itle: "Home 3",
            target: "Home-3",
        },
    ]
];

export default SideBar;

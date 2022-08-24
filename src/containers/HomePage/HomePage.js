import React, {Component, useState} from 'react';
import SideBar from "./sidebar/Sidebar";
import Content from "./content/Content";
import { BrowserRouter as Router } from "react-router-dom";
import "./HomePage.scss";
const HomePage = () => {
    const [sidebarIsOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    return (
        <Router>
            <div className="wrapper">
                <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
                <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
            </div>
        </Router>
    );

}


export default HomePage;

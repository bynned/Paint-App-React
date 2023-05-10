import "./App.css";
import CanvasCom from "./components/CanvasCom";
import Menu from "./components/Menu";
import React, { useState } from "react";
import { ReactComponent as GearIcon } from "./icons/settings.svg";
import { ReactComponent as AddIcon } from "./icons/add.svg";
import { ReactComponent as PaintBrush } from "./icons/paintbrush.svg";

function App() {
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);
  const [paintingStatus, setPaintingStatus] = useState(false);

  return (
    <>
      <NavBar>
        <NavItem icon={<GearIcon></GearIcon>} />
        <NavItem icon={<AddIcon></AddIcon>}>
          {/* Dropdown starts here */}
          <DropdownMenu />
        </NavItem>
      </NavBar>
      <div className="App">
        <h1 className="titleheader">Paint app</h1>
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          setPaintingStatus={setPaintingStatus}
          paintingStatus={paintingStatus}
          lineWidth={lineWidth}
          lineColor={lineColor}
          lineOpacity={lineOpacity}
        />
        <CanvasCom
          paintingStatus={paintingStatus}
          lineWidth={lineWidth}
          lineColor={lineColor}
          lineOpacity={lineOpacity}
        />
      </div>
    </>
  );
}

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <DropdownItem leftIcon={<PaintBrush />}>PaintBrush</DropdownItem>
    </div>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default App;

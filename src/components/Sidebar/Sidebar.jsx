import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import decrypt from "../../utils/Functions/decrypt";

const Sidebar = (props) => {
  const sidebar = useRef(null);
  let ps;

  const mainPageClick = () => {
    var name = decrypt(localStorage.getItem("name"));
    if (name === "ADMIN") {
      props.history.push({
        pathname: "/admin/dashboard",
      });
    } else {
      props.history.push({
        pathname: "/subuser/dashboard",
      });
    }
  };

  const toggleCloseAllClick = () => {
    var menus = document.querySelectorAll("[id=dropdown-container]");
    for (var j = 0; j < menus.length; j++) {
      if (menus[j].style.display === "block") {
        menus[j].style.display = "none";
      }
    }
    var caret = document.querySelectorAll("[id=rotate-lefty]");
    for (var a = 0; a < caret.length; a++) {
      caret[a].className = "fa fa-angle-left";
    }
  };

  useEffect(() => {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    const handleDropdownClick = (e) => {
      var dropdownContent = e.target.nextElementSibling;
      if (dropdownContent && dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        var caret_ = e.target.querySelector("[id=rotate-lefty]");
        if (caret_) {
          caret_.className = "fa fa-angle-left";
        }
      } else if (dropdownContent) {
        var menus = document.querySelectorAll("[id=dropdown-container]");
        for (var j = 0; j < menus.length; j++) {
          if ((menus[j].style.display = "block")) {
            menus[j].style.display = "none";
          }
        }
        var caret = document.querySelectorAll("[id=rotate-lefty]");
        for (var a = 0; a < caret.length; a++) {
          caret[a].className = "fa fa-angle-left";
        }
        var caret_ = e.target.querySelector("[id=rotate-lefty]");
        if (caret_) {
          caret_.className = "fa fa-angle-down";
        }
        dropdownContent.style.display = "block";
      }
    };

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", handleDropdownClick);
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }

    return () => {
      for (i = 0; i < dropdown.length; i++) {
        dropdown[i].removeEventListener("click", handleDropdownClick);
      }

      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, []);

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <center>
          <img
            onClick={mainPageClick}
            src={require("img/bank.png").default}
            style={{  width: "100px" }}
            alt="react-logo"
          />
        </center>
      </div>
      <div
        className="sidebar-wrapper"
        ref={sidebar}
        style={{ paddingBottom: "20px" }}
      >
        <Nav>
          {props.routes.map((prop, key) => {
            if (!prop.sub_menu.length > 0) {
              return (
                <div className="sidenav" key={key}>
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={prop.icon}
                        style={{ height: "20px", paddingRight: "5px" }}
                      />
                      <p onClick={toggleCloseAllClick}>{prop.name}</p>
                    </div>
                  </NavLink>
                </div>
              );
            } else {
              return (
                <div className="sidenav" key={key}>
                  <div className="nav-link">
                    <div
                      className="dropdown-btn"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={prop.icon}
                        style={{ height: "20px", paddingRight: "5px" }}
                      />
                      <p>{prop.name}</p>
                      <i
                        data-toggle="collapser"
                        style={{ width: "10%", textAlign: "right" }}
                        id="rotate-lefty"
                        className="fa fa-angle-left"
                      ></i>
                    </div>
                    <div className="dropdown-container" id="dropdown-container">
                      {prop.sub_menu.map((prop, key) => {
                        return (
                          <NavLink
                            key={key}
                            style={{ padding: "0", margin: "0" }}
                            to={prop.layout + prop.path}
                            className="nav-link"
                            activeClassName="active"
                          >
                            <p
                              onClick={toggleCloseAllClick}
                              style={{ fontSize: "12px" }}
                            >
                              {prop.name}
                            </p>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

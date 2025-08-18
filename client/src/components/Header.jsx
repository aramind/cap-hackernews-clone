import { NavLink, useNavigate } from "react-router-dom";

import React from "react";
import { AUTH_TOKEN } from "../constants";

const Header = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex pal justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <NavLink to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </NavLink>
        <NavLink to="/" className="ml1 no-underline black">
          new
        </NavLink>
        <div className="ml1">|</div>
        <NavLink to="/top" className="ml1 no-underline black">
          top
        </NavLink>
        <div className="ml1">|</div>
        <NavLink to="/search" className="ml1 no-underline black">
          search
        </NavLink>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <NavLink to="/create" className="ml1 no-underline black">
              submit
            </NavLink>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <NavLink to="/login" className="ml1 no-underline black">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;

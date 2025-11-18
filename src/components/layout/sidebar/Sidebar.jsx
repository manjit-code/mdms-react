import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Sidebar({ items, path }) {
  const theme = useSelector((state) => state.theme.colors);

  const getNavClassNames = ({ isActive }) =>
    `text-left p-3 block transition-all duration-200 
     ${isActive
        ? `font-bold ${theme.text.primary}`
        : `${theme.text.secondary} hover:${theme.text.primary}`
     }`;

  return (
    <div
      className={`flex flex-col h-screen ${theme.background.sidebar} ${theme.text.primary} pl-5 w-1/5`}
    >
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={`/${path}/${item.value}`}
          className={getNavClassNames}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

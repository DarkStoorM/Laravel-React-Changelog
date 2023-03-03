import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../AppRoutes";

export function Header() {
  const location = useLocation();
  const pageLinks = [
    {
      name: "Changelog",
      url: AppRoutes.ROOT,
    },
    {
      name: "New entry",
      url: `${AppRoutes.CHANGELOG}`,
    },
  ];

  useEffect(() => {
    pageLinks.map((page) => {
      if (page.url === location.pathname) {
        document.title = page.name;
      }
    });
  }, []);

  return (
    <nav className="navbar">
      <ul>
        {pageLinks.map((page, key) => (
          <li key={key} className={`${location.pathname === page.url && "navbar__link--active"}`}>
            <Link to={page.url}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

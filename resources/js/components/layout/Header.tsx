import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../AppRoutes";

export function Header() {
  const location = useLocation();
  const pageLinks = [
    {
      id: "home",
      name: "Changelog",
      url: AppRoutes.ROOT,
    },
    {
      id: "new-entry",
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
          // Can't use short-circuit, because it prints true/false into the class name
          <li
            key={key}
            className={`${location.pathname === page.url ? "navbar__link--active" : ""}`}
          >
            <Link id={page.id} to={page.url}>
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

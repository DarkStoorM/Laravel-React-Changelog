import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../AppRoutes";

export function Header() {
  const location = useLocation();
  const pageLinks = [
    {
      name: "Home",
      url: AppRoutes.ROOT,
    },
    {
      name: "Add new change",
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
    <nav>
      <div>
        <ul>
          {pageLinks.map((page, key) => (
            <li key={key} className={`${location.pathname === page.url && "active"}`}>
              <Link to={page.url}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

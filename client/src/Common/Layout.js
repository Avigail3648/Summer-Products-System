import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
  const token = localStorage.getItem("userToken")

  return <div className="page">
    <header>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? "linksHeader active" : "linksHeader"
        }
      >
        register
      </NavLink>
      &nbsp;
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "linksHeader active" : "linksHeader"
        }
      >
        login
      </NavLink>
      &nbsp;
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? "linksHeader active" : "linksHeader"
        }
      >
        products
      </NavLink>
      &nbsp;
      <NavLink
        to="/AdminProduct"
        className={({ isActive }) =>
          isActive ? "linksHeader active" : "linksHeader"
        }
      >
        Product-Management
      </NavLink>
      &nbsp;
      <NavLink
        to="/baskets"
        className={({ isActive }) =>
          isActive ? "linksHeader active" : "linksHeader"
        }
      >
        basket
      </NavLink>
      &nbsp;
      {token && (
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive ? "linksHeader active" : "linksHeader"
          }
        >
          logout
        </NavLink>
      )}
    </header>
    <main >
      <Outlet />
    </main>
  </div>
}
export default Layout

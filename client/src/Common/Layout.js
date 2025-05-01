import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    const token = localStorage.getItem("userToken")

    return <div className="page">
        <header>
            <Link className="linksHeader" to="/register">register </Link>&nbsp;
            <Link className="linksHeader" to="/login">login  </Link>&nbsp;
            <Link className="linksHeader" to="/products">products </Link>&nbsp;
            <Link className="linksHeader" to="/AdminProduct">Product-Management </Link>&nbsp;
            <Link className="linksHeader" to="/baskets">basket </Link>&nbsp;
            {token ?
                <Link className="linksHeader" to="/logout">logout </Link> : <></>}
        </header>
        <main >
            <Outlet />
        </main>
    </div>
}
export default Layout
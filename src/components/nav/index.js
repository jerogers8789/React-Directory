import React from 'react';
import NameSearch from "../NameSearch";
import "./nav.css";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

       <div className="search-area col-4">
        <NameSearch />
    </div>
</nav>
    );
}
export default Nav;
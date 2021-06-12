import React, { useContext } from "react";
import UserBody from "../UserBody";
import "./UserTable.css";
import UserContext from "../../utils/UserContext";

const UserTable = () => {
    const context = useContext(UserContext);

    return (
        <div className="usertable mt-5">
            <table
                id="table"
                className="table table-striped table-hover table-condensed">
                <thead>
                    <tr>
                        {context.userState.headings.map(({ name, width }) => {
                            return (
                                <th
                                    className="col"
                                    key={name}
                                    style={{ width }}
                                    onClick={() => {
                                        context.handleSort(name.toLowerCase());
                                    }}>
                                    {name}
                                    <span className="pointer"></span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <UserBody />
            </table>
        </div>
    );
}

export default UserTable;
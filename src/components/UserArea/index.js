import React, {useState, useEffect} from "react";
import UserTable from "../UserTable";
import Nav from "../nav";
import API from "../../utils/API";
import "./UserArea.css";
import UserContext from "../../utils/UserContext"

const UserArea = () => {
      const [userState, setUserState] = useState({
        users: [],
        order: "ascend",
        filteredUsers: [],
        headings: [
          { name: "Img", width: "10%", },
          { name: "Name", width: "10%", },
          { name: "Phone", width: "20%", },
          { name: "Email", width: "20%", },
        ]
      });
    
      const handleSort = heading => {
        if (userState.order === "descend") {
            setUserState({
                order:"ascend"
            })
        } else{
            setUserState({
                order:"descend"
            })
        }
    
        const compareFnc = (a, b) => {
          if (userState.order === "ascend") {
            if (a[heading] === undefined) {
              return 1;
            } else if (b[heading] === undefined) {
              return -1;
            } else if (heading === "name") {
              return a[heading].first.localeCompare(b[heading].first);
            } else {
              return b[heading] - a[heading];
            } 
          } else {
        if (a[heading] === undefined){
            return 1;
        } else if (b[heading] === undefined){
            return -1;
        } else if (heading ==="name"){
            return b[heading].first.localeCompare(a[heading].first);
        } else {
        return b[heading]-  a[heading];
        }
        }}
        const sortedUsers = userState.filteredUsers.sort(compareFnc);

        setUserState({
          ...userState,
          filteredUsers: sortedUsers
});
};   
      const handleSearchChange = event => {
        const filter = event.target.value;
        const filteredList = userState.users.filter(item => {
          let values = item.name.first.toLowerCase();
          return values.indexOf(filter.toLowerCase()) !== -1;
        });
        setUserState({ 
        ...userState, 
        filteredUsers: filteredList });
      };
      useEffect(() => {
        API.getUsers().then(results => {
          setUserState({
            ...userState,
            users: results.data.results,
            filteredUsers: results.data.results
          });
        });
      }, []);
    
      return (
        <UserContext.Provider
          value={{ userState, handleSearchChange, handleSort }}>
          <Nav />
          <div className="user-area">
            {userState.filteredUsers.length > 0 ? <UserTable />: <div></div>}
          </div>
        </UserContext.Provider>
    );
}
    
    export default UserArea;
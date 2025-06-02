import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8081/api/user/list")
      const result = await res.json()
      setUsers(result)
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
        and <a href="https://mui.com/components/dividers/">Dividers</a> to
        display your users like so:
      </Typography> */}
      <List component="nav">
        {users ? (
          users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={item.first_name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </List>
      {/* <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography> */}
    </div>
  );
}

export default UserList;

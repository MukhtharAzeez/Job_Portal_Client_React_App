import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { currentUser } from "../../../../redux/user/userAuthSlicer";
import { useSelector } from "react-redux";
import moment from "moment";
import { PostAddModal } from "../../Upload/UploadPost";

export function AddPost() {
  const [addPost, setAddPost] = React.useState(false);
  const handleOpen = () => setAddPost(true);

  const { userName , image} =  useSelector(currentUser)
  return (
    <>
      <Card
        className="min-w-[380px] md:min-w-[450px]"
        sx={{
          // minWidth: { xs: "auto", md: "auto", sm: 400 },
          margin: 1,
        }}
      >
        <CardHeader
          avatar={
            image ? (
              <Avatar alt="User Profile" src={image} />
            ) : (
              <Avatar className="bg-black" aria-label="recipe">
                  {userName && userName[0]}
              </Avatar>
            )
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={userName}
          subheader={moment(Date.now()).format("DD MMMM YYYY")}
        />
        <CardContent>
          <button className="px-4 py-2 w-full text-bold shadow:md shadow-md hover:shadow-inner hover:bg-gray-100 rounded-md" onClick={handleOpen}>
            Create
          </button>
        </CardContent>
        <PostAddModal addPost={addPost} setAddPost={setAddPost} />
      </Card>
    </>
  );
}

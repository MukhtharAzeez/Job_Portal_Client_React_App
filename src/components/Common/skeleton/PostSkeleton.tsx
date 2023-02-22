import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Skeleton } from "@mui/material";

interface Props {
    mode: String;
}

export function PostSkeleton() {
    return (
        <>
            {
                <Card
                    // sx={{
                    //     minWidth: { xs: 380, lg: 500, md: 500, sm: 500 },
                    // }}
                    className="min-w-[440px]"
                >
                    <CardHeader
                        avatar={
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                width={40}
                                height={40}
                            />
                        }
                        action={null}
                        title={
                            <Skeleton
                                animation="wave"
                                height={24}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />
                        }
                        subheader={<Skeleton animation="wave" height={24} width="40%" />}
                    />
                    <Box sx={{ position: "relative", width: "100%", height: 350 }}>
                        <Skeleton
                            sx={{ height: 350 }}
                            animation="wave"
                            variant="rectangular"
                        />
                    </Box>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <Skeleton
                                animation="wave"
                                height={15}
                                style={{ marginBottom: 6 }}
                            />
                            <Skeleton animation="wave" height={15} width="80%" />
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <Checkbox
                                    icon={<FavoriteBorderIcon />}
                                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                                />
                            </IconButton>
                            <IconButton aria-label="chat" sx={{ marginRight: 1 }}>
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton aria-label="save post">
                                <Checkbox
                                    icon={<BookmarkBorderIcon />}
                                    checkedIcon={
                                        <BookmarkIcon/>
                                    }
                                />
                            </IconButton>
                        </CardActions>
                    </Box>
                </Card>
            }
        </>
    );
}
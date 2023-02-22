import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const COMPANY_SIDE_BAR_LINKS = [
  {
    title: "Home",
    icon: HomeOutlinedIcon,
    href: "/company",
  },
  {
    title: "Admins",
    icon: PeopleOutlineIcon,
    href: "/company/admins",
  },
  {
    title: "Messages",
    icon: ChatBubbleOutlineOutlinedIcon,
    href: "/company/messages",
  },
  {
    title: "Notifications",
    icon: NotificationsNoneOutlinedIcon,
    href: "/company/notifications",
  },
  {
    title: "Requests",
    icon: HomeOutlinedIcon,
    href: "/company/requests",
  },
  {
    title: "Profile",
    icon: AccountCircleOutlinedIcon,
    href: "/company/profile",
  },
];

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LoginIcon from "@mui/icons-material/LoginSharp";

export const COMPANY_ADMIN_SIDEBAR_LINKS = [
  {
    title: "Home",
    icon: HomeOutlinedIcon,
    href: "/company-admin",
  },
  {
    title: "Posted Jobs",
    icon: WorkOutlineIcon,
    href: "/company-admin/jobs",
  },
  {
    title: "Post Job",
    icon: PostAddIcon,
    href: "/company-admin/create",
  },
  {
    title: "Messages",
    icon: ChatBubbleOutlineOutlinedIcon,
    href: "/company-admin/inbox",
  },
  {
    title: "Scheduled Interviews",
    icon: TodayOutlinedIcon,
    href: "/company-admin/schedules",
  },
  {
    title: "Tidings",
    icon: NotificationsNoneOutlinedIcon,
    href: "/company-admin/notifications",
  },
  {
    title: "Profile",
    icon: Person2OutlinedIcon,
    href: "/company-admin/profile",
  },
  {
    title: "Logout",
    icon: LoginIcon,
    href: "/company-admin/login",
  },
];

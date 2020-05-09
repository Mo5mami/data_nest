/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";

import HomeIcon from '@material-ui/icons/Home';
import PublishIcon from '@material-ui/icons/Publish';

// core components/views for Admin layout

import HomePage from "views/Home/Home.js";

import ForumIcon from '@material-ui/icons/Forum';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';



// core components/views for RTL layout
import Dataset from "views/Datasets/Dataset";
import Blog from "views/Blog/Blog";
import Profile from "views/Profile/Profile";
import Contribution from './views/Contribution/Contribution';
import UploadDataset from "views/UploadDataset/UploadDataset";
const dashboardRoutes = [
  
  
  {
    path: "/home",
    name: "Home",
    rtlName: "لوح",
    icon: HomeIcon,
    component: HomePage,
    layout: "/admin"
  },
  {
    path: "/datasets",
    name: "Datasets",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Dataset,
    layout: "/admin"
  },
  {
    path: "/up",
    name: "Upload Dataset",
    rtlName: "قائمة الجدول",
    icon: PublishIcon,
    component: UploadDataset,
    layout: "/admin"
  },
  {
    path: "/contribution",
    name: "Contribution",
    rtlName: "لوح",
    icon: AssignmentTurnedInIcon,
    component: Contribution,
    layout: "/admin"
  },
  {
    path: "/blog",
    name: "Blog",
    rtlName: "لوح",
    icon: ForumIcon,
    component: Blog,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Profile,
    layout: "/admin"
  },
  /*{
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;

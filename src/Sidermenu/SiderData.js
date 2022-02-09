import React from "react";
import * as FaBIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MDIcons from "react-icons/md";
import * as BiIcons from 'react-icons/bi'
export const SiderbarData = [
  {
    tittle: "Home",
    path: "/movies",
    icon: <AiIcons.AiFillHome />,
    cName: "side-item",
  },
  {
    tittle: "Movies",
    path: "/movies",
    icon: <MDIcons.MdLocalMovies />,
    cName: "side-item",
  },
  {
    tittle: "Search",
    path: "/search",
    icon: <AiIcons.AiOutlineSearch />,
    cName: "side-item",
  },

  {
    tittle: "Favorites",
    path: "/favorites",
    icon: <AiIcons.AiFillHeart />,
    cName: "side-item",
  },
  {
    tittle: "Sign Out",
    path: "/",
    icon: <BiIcons.BiLogOutCircle />,
    cName: "side-item",
  },
];

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { BsArrowLeftCircle } from "react-icons/bs";
import { AiFillPieChart } from "react-icons/ai";
import { SiFuturelearn } from "react-icons/si";
import { SiOpenaccess } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import HamburgerButton from "./HamburgerMenuButton/HamburgerButton";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const Menus = [
    { title: "Dashboard", path: "/dashboard", src: <AiFillPieChart /> },
    { title: "Course", path: "/course", src: <SiFuturelearn /> },
    { title: "Profile", path: "/profile", src: <CgProfile /> },
    {
      title: "Logout",
      path: "/login",
      src: <SiOpenaccess />,
      gap: "true",
      onClick: () => localStorage.removeItem("userData"),
    },
  ];

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        <BsArrowLeftCircle
          className={`${
            !open && "rotate-180"
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/">
          <div className={`flex ${open && "gap-x-4"} items-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2 text-blue-500 fill-current dark:text-blue-400"
              viewBox="0 0 512 512"
            >
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 469.3c-117.8 0-213.3-95.5-213.3-213.3S138.2 42.7 256 42.7 469.3 138.2 469.3 256 373.8 469.3 256 469.3z"></path>
              <path d="M256 106.7c-58.9 0-106.7 47.8-106.7 106.7S197.1 320 256 320s106.7-47.8 106.7-106.7S314.9 106.7 256 106.7zm0 170.7c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"></path>
            </svg>
            {open && (
              <span className="text-xl font-medium whitespace-nowrap dark:text-white">
                Dayana Project
              </span>
            )}
          </div>
        </Link>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={menu.onClick && menu.onClick}
            >
              <li
                className={`flex justify-between items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-x-4">
                  <span className="text-2xl">{menu.src}</span>
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-300 hover:block`}
                  >
                    {menu.title}
                  </span>
                </div>
                {/* <dev className={`self-end ${!open && "hidden"} z-10`}>
                  <IoIosArrowDown className="inline text-xl" />
                </dev> */}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

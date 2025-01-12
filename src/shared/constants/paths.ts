import {
  RiDashboardFill,
  RiBuildingFill,
  RiHome5Fill,
  RiUser3Fill,
  RiCalendarEventFill,
  RiFileList3Fill,
} from "@remixicon/react";

export const protectedPaths = {
  dashboard: {
    icon: RiDashboardFill,
    path: "/dashboard",
    name: "Dashboard",
  },
  building: {
    icon: RiBuildingFill,
    path: "/building",
    name: "Buildings",
  },
  apartment: {
    icon: RiHome5Fill,
    path: "/apartment",
    name: "Apartments",
  },
  chiefOccupant: {
    icon: RiUser3Fill,
    path: "/chief-occupant",
    name: "Chief Occupants",
  },
  reservation: {
    icon: RiCalendarEventFill,
    path: "/reservation",
    name: "Reservations",
  },
  application: {
    icon: RiFileList3Fill,
    path: "/application",
    name: "Applications",
  },
};

// ------------------------------------------------------------------------

export const prefixOfUnprotectedPaths = "/authentication";
export const unprotectedPaths = {
  selectUser: `${prefixOfUnprotectedPaths}/select-user`,
  adminLogin: `${prefixOfUnprotectedPaths}/admin-login`,
  chiefOccupantLogin: `${prefixOfUnprotectedPaths}/chief-occupant-login`,
};

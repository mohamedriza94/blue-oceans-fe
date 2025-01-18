export const protectedPaths = {
  dashboard: {
    icon: "RiDashboardFill",
    path: "/dashboard",
    name: "Dashboard",
  },
  building: {
    icon: "RiBuildingFill",
    path: "/building",
    name: "Buildings",
  },
  apartment: {
    icon: "RiHome5Fill",
    path: "/apartment",
    name: "Apartments",
  },
  chiefOccupant: {
    icon: "RiUser3Fill",
    path: "/chief-occupant",
    name: "Chief Occupants",
  },
  lease: {
    icon: "RiFilePaper2Fill",
    path: "/lease",
    name: "Lease",
  },
  extensionRequest: {
    icon: "RiCalendarTodoFill",
    path: "/extension-request",
    name: "Extension Request",
  },
  // reservation: {
  //   icon: "RiCalendarEventFill",
  //   path: "/reservation",
  //   name: "Reservations",
  // },
  // application: {
  //   icon: "RiFileList3Fill",
  //   path: "/application",
  //   name: "Applications",
  // },
  co_dashboard: {
    icon: "RiDashboardFill",
    path: "/co/dashboard",
    name: "Dashboard",
  },
  // co_application: {
  //   icon: "RiFileList3Fill",
  //   path: "/co/application",
  //   name: "My Applications",
  // },
  co_lease: {
    icon: "RiFileShield2Fill",
    path: "/co/lease",
    name: "My Lease",
  },
  co_rent: {
    icon: "RiWallet3Fill",
    path: "/co/rent",
    name: "My Rent",
  },
};

// ------------------------------------------------------------------------

export const prefixOfUnprotectedPaths = "/authentication";
export const unprotectedPaths = {
  selectUser: `${prefixOfUnprotectedPaths}/select-user`,
  adminLogin: `${prefixOfUnprotectedPaths}/admin-login`,
  chiefOccupantLogin: `${prefixOfUnprotectedPaths}/chief-occupant-login`,
};

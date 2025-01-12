export const protectedPaths = {
  dashboard: "/dashboard",
  menus: {
    create: "/menus/create",
    list: "/menus/list",
  },
  staffMembers: "/staff-members",
  settings: "/settings",
  inquiries: "/inquiries",
  ingredients: {
    create: "/ingredients/create",
    list: "/ingredients/list",
  },
  categories: {
    create: "/categories/create",
    list: "/categories/list",
  },
  recipes: {
    create: "/recipes/create",
    list: "/recipes/list",
  },
  blogs: {
    create: "/blogs/create",
    list: "/blogs/list",
  },
};

// ------------------------------------------------------------------------

export const prefixOfUnprotectedPaths = "/authentication";
export const unprotectedPaths = {
  login: `${prefixOfUnprotectedPaths}/login`,
  forgotPassword: `${prefixOfUnprotectedPaths}/forgot-password`,
  resetPassword: `${prefixOfUnprotectedPaths}/reset-password`,
};

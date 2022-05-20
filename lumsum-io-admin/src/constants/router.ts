export const getRouteTitle = (pathname: string) => {
  const key = pathname.split("/")[1];

  switch (key) {
    case "users":
      return "Users";

    case "suppliers":
      return "Suppliers";

    case "categories":
      return "Categories";

    case "products":
      return "Products";

    case "reviews":
      return "Reviews";

    case "settings":
      return "Settings";

    case "profile":
      return "Profile";

    case "admins":
      return "Admins";

    default:
      return "Dashboard";
  }
};

export const dashboardHome = (role) =>
    role === "admin" ? "/dashboard/admin" : "/dashboard/user";

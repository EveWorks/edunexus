import { routes } from "@/utils/routes";
import { PagesOptions } from "next-auth";

export const pagesOptions: Partial<PagesOptions> = {
  signIn: routes.signIn,
};

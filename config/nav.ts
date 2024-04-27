import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/admin/dashboard", title: "Home", icon: HomeIcon },
  { href: "/admin/account", title: "Account", icon: Cog },
  { href: "/admin/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/admin/media",
        title: "Media",
        icon: Globe,
      },
      {
        href: "/admin/products",
        title: "Products",
        icon: Globe,
      },
    ],
  },

];


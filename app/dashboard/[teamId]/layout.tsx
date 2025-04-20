'use client';

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import {
  BadgePercent,
  BarChart4,
  Columns3,
  Globe,
  Locate,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Users,
  Zap,
  MonitorDown,
  Wallet,
  Bot,
  TrendingUp
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const navigationItems: SidebarItem[] = [
  {
    name: "Overview",
    href: "/",
    icon: Globe,
    type: "item",
  },
  {
    type: "label",
    name: "Fitur",
  },
  {
    name: "JKT48",
    href: "/jkt48",
    icon: Users,
    type: "item",
  },
  {
    name: "Downloader",
    href: "/downloader",
    icon: MonitorDown,
    type: "item",
  },
  {
    name: "Payment Gateway",
    href: "/payment",
    icon: Wallet,
    type: "item",
  },
  {
    name: "AI",
    href: "/ai",
    icon: Bot,
    type: "item",
  },
  {
    type: "label",
    name: "Layanan",
  },
  {
    name: "TopUp",
    href: "/topup",
    icon: TrendingUp,
    type: "item",
  },
  {
    type: "label",
    name: "Monetization",
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: ShoppingBag,
    type: "item",
  },
  {
    type: "label",
    name: "Settings",
  },
  {
    name: "Configuration",
    href: "/configuration",
    icon: Settings2,
    type: "item",
  },
  {
    name: "Docs",
    // Use anchor <a> tag to ensure the link opens externally
    href: "https://docs.jkt48connect.my.id",
    icon: Zap,
    type: "item",
    external: true,
  },
];

export default function Layout(props: { children: React.ReactNode }) {
  const params = useParams<{ teamId: string }>();
  const user = useUser({ or: 'redirect' });
  const team = user.useTeam(params.teamId);
  const router = useRouter();

  if (!team) {
    router.push('/dashboard');
    return null;
  }

  return (
    <SidebarLayout
      items={navigationItems}
      basePath={`/dashboard/${team.id}`}
      sidebarTop={
        <SelectedTeamSwitcher
          selectedTeam={team}
          urlMap={(team) => `/dashboard/${team.id}`}
        />
      }
      baseBreadcrumb={[
        {
          title: team.displayName,
          href: `/dashboard/${team.id}`,
        },
      ]}
    >
      {props.children}
    </SidebarLayout>
  );
}

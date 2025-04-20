'use client';

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import {
  BadgePercent,
  BarChart4,
  Bot,
  Brain,
  CloudDownload,
  Globe,
  Locate,
  PackageSearch,
  Settings2,
  ShoppingCart,
  Ticket,
  UserCheck,
  Users,
  Zap,
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
    type: "category",
    name: "JKT48",
    icon: Users,
    children: [
      {
        name: "Member & Team",
        href: "/jkt48/people",
        type: "item",
      },
      {
        name: "Theater & Events",
        href: "/jkt48/events",
        type: "item",
      },
      {
        name: "Showroom",
        href: "/jkt48/showroom",
        type: "item",
      },
    ],
  },
  {
    type: "category",
    name: "Downloader",
    icon: CloudDownload,
    children: [
      {
        name: "YouTube / Video",
        href: "/downloader/video",
        type: "item",
      },
      {
        name: "Instagram / TikTok",
        href: "/downloader/social",
        type: "item",
      },
    ],
  },
  {
    type: "category",
    name: "Payment Gateway",
    icon: ShoppingCart,
    children: [
      {
        name: "TopUp & Transaksi",
        href: "/payment/topup",
        type: "item",
      },
      {
        name: "Orders",
        href: "/orders",
        type: "item",
      },
      {
        name: "Revenue",
        href: "/revenue",
        type: "item",
      },
    ],
  },
  {
    type: "category",
    name: "AI",
    icon: Bot,
    children: [
      {
        name: "AI Chatbot",
        href: "/ai/chat",
        type: "item",
      },
      {
        name: "AI Tools",
        href: "/ai/tools",
        type: "item",
      },
    ],
  },
  {
    type: "label",
    name: "Lainnya",
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: Settings2,
    type: "item",
  },
  {
    name: "Configuration",
    href: "/configuration",
    icon: Settings2,
    type: "item",
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
      baseBreadcrumb={[{
        title: team.displayName,
        href: `/dashboard/${team.id}`,
      }]}
    >
      {props.children}
    </SidebarLayout>
  );
}

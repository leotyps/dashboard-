import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { PricingGrid } from "@/components/pricing";
import { stackServerApp } from "@/stack";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ComponentIcon, Users } from "lucide-react";

export default async function IndexPage() {
  const project = await stackServerApp.getProject();
  if (!project.config.clientTeamCreationEnabled) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="max-w-xl gap-4">
          <p className="font-bold text-xl">Setup Required</p>
          <p>
            {
              "To start using this project, please enable client-side team creation in the Stack Auth dashboard (Project > Team Settings). This message will disappear once the feature is enabled."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero
        capsuleText="Free & Community Powered"
        capsuleLink="https://jkt48connect.vercel.app"
        title="JKT48Connect REST API"
        subtitle="A powerful open API for JKT48 live schedule, events, lineups, and more."
        primaryCtaText="Get Started"
        primaryCtaLink={stackServerApp.urls.signUp}
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/valzyy/jkt48connect"
        credits={
          <>
            Built with ❤️ by{" "}
            <a
              href="https://valzyofc.my.id"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Valzyy
            </a>
          </>
        }
      />

      <div id="features" />
      <FeatureGrid
        title="What You Can Access"
        subtitle="Explore all live and upcoming JKT48 content through our API."
        items={[
          {
            icon: <Users className="h-12 w-12" />,
            title: "Live Members",
            description: "Get real-time data of who is live on SHOWROOM.",
          },
          {
            icon: <ComponentIcon className="h-12 w-12" />,
            title: "Schedule",
            description: "Access upcoming theater shows, events, and more.",
          },
          {
            icon: <GitHubLogoIcon className="h-12 w-12" />,
            title: "100% Open-source",
            description: "Completely free and open-source on GitHub.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 fill-current"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48..." />
              </svg>
            ),
            title: "JSON REST API",
            description: "Easy-to-use REST endpoints. No auth required.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 fill-current"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            ),
            title: "Instant Updates",
            description: "Stay updated with dynamic and fresh data.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 fill-current"
              >
                <path d="M9 19V6h13M5 6H2v13a2 2 0 002 2h13v-3" />
              </svg>
            ),
            title: "Easy Integration",
            description: "Plug into your own apps, bots, or websites easily.",
          },
        ]}
      />

      <div id="pricing" />
      <PricingGrid
        title="Pricing"
        subtitle="Simple and always free."
        items={[
          {
            title: "Public Access",
            price: "Free",
            description: "Perfect for fans, hobby projects, and more.",
            features: [
              "Access all public endpoints",
              "Real-time data",
              "Community supported",
              "Free forever",
            ],
            buttonText: "Start Using API",
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Basic",
            price: "10k",
            description: "For devs who want more control and rate limits.",
            features: [
              "All public endpoints",
              "Higher rate limits",
              "Custom Apikey",
              "Priority support",
              "Free forever",
            ],
            buttonText: "Get Early Access",
            isPopular: true,
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Premium",
            price: "15k",
            description: "For devs who want more access and control limit..",
            features: [
              "All public and premium endpoints",
              "Higher rate limits",
              "Custom Apikey",
              "Priority support",
              "Free forever",
            ],
            buttonText: "Buy Now",
            isPopular: true,
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Custom",
            price: "For sale & Open",
            description: "Need something more? Let’s talk.",
            features: [
              "Custom Apikey",
              "Custom Limit",
              "Open for contributions",
              "Backed by the community",
              "Free forever",
            ],
            buttonText: "Contact Dev",
            buttonHref: "https://wa.me/6285701479245",
          },
        ]}
      />
    </>
  );
}

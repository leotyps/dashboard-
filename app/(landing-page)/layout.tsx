import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Features", href: "/#features" },
          { title: "Pricing", href: "/#pricing" },
          { title: "Github", href: "https://github.com/stack-auth/stack-template", external: true },
        ]}
      />
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy="Valzyy"
        builtByLink="https://wa.me/6285701479245"
        githubLink="https://github.com/zenova-id"
        twitterLink="https://twitter.com/stack_auth"
        linkedinLink="linkedin.com/company/stack-auth"
      />
    </div>
  );
}

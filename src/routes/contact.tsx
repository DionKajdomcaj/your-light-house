import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LightHouse" },
      { name: "description", content: "Visit the LightHouse showroom in Brescia or get in touch with the studio." },
      { property: "og:title", content: "Contact — LightHouse" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Contact"
        title="Write, call, or come by."
        intro="The studio answers within two working days. For trade enquiries please mention your firm and the project location."
      />

      <section className="container-x grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="space-y-10 text-sm">
            <div>
              <div className="eyebrow text-muted-foreground">Showroom</div>
              <div className="mt-3 font-display text-2xl">Via dei Mille 14</div>
              <div className="text-muted-foreground">25122 Brescia, Italy</div>
              <div className="mt-2 text-muted-foreground">
                Tuesday – Saturday, 10 – 18
              </div>
            </div>
            <div>
              <div className="eyebrow text-muted-foreground">Studio</div>
              <div className="mt-3"><a href="mailto:hello@lighthouse.studio" className="underline underline-offset-4">hello@lighthouse.studio</a></div>
              <div>+39 030 555 0142</div>
            </div>
            <div>
              <div className="eyebrow text-muted-foreground">Trade</div>
              <div className="mt-3"><a href="mailto:trade@lighthouse.studio" className="underline underline-offset-4">trade@lighthouse.studio</a></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="border border-border p-10">
              <h2 className="font-display text-3xl">Thank you.</h2>
              <p className="mt-3 text-muted-foreground">
                We have your note and will reply within two working days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Your name" id="name" required />
                <Field label="Email" id="email" type="email" required />
              </div>
              <Field label="Firm / project (optional)" id="firm" />
              <div>
                <label htmlFor="message" className="eyebrow text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="self-start bg-foreground px-8 py-4 text-sm tracking-wide text-background hover:bg-foreground/90"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}

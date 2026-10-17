"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, socialIcons } from "./SocialIcons";
import { contact } from "@/lib/data";
import { sendMail } from "@/lib/mail";
import { Heading } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const payload = {
        name: String(data.get("name")),
        email: String(data.get("email")),
        message: String(data.get("message")),
      };
      await sendMail(payload);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border border-line bg-void/60 px-4 py-3.5 text-base text-bone placeholder:text-mute/60 focus:border-visor focus:outline-none";

  return (
    <section id="contact" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading className="text-5xl sm:text-7xl">
            <span className="glitch" data-text="Ready to join?">
              Ready to join?
            </span>
          </Heading>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-mute">
            Questions about a competition, the society or joining? Send us a message and we will reply.
          </p>
          <ul className="mt-10 grid gap-5 text-lg">
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-visor" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-visor">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-visor" aria-hidden="true" />
              <span>{contact.address}</span>
            </li>
          </ul>

          {contact.socials.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 font-display text-xs font-semibold tracking-widest text-mute uppercase">
                Social
              </p>
              <ul className="flex flex-wrap gap-3">
                {contact.socials.map((social) => {
                  const Icon = socialIcons[social.icon] ?? InstagramIcon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-mute transition-all duration-300 hover:border-visor hover:text-visor hover:shadow-[0_0_16px_rgba(255,159,28,0.2)]"
                        aria-label={social.label}
                      >
                        <Icon size={16} />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <form
          onSubmit={submit}
          className="cyber-card clip-hud grid gap-5 border border-line bg-panel/60 p-7 sm:p-10 lg:col-span-6"
        >
          <label className="grid gap-2 text-sm text-mute">
            Your name
            <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm text-mute">
            Your email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={field}
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm text-mute">
            Message
            <textarea name="message" required rows={5} className={field} placeholder="How can we help?" />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-cyber clip-hud bg-visor px-7 py-4 font-display text-lg font-semibold text-void transition-colors hover:bg-bone disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thank you" : "Send message"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>
          )}
        </form>
      </div>
    </section>
  );
}

"use client";

import type { ComponentType } from "react";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { contact } from "@/lib/data";
import { sendMail } from "@/lib/mail";
import { Heading } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: WhatsAppIcon,
};

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await sendMail({
        name: String(data.get("name")),
        email: String(data.get("email")),
        message: String(data.get("message")),
      });
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
                  const Icon = socialIcons[social.icon] ?? Instagram;
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

import type { ComponentType } from "react";
import Image from "next/image";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { contact, nav } from "@/lib/data";

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

export default function Footer() {
  return (
    <footer className="border-t border-line bg-deep px-6 pt-16 pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="#top" className="inline-flex items-center gap-3" aria-label="Back to top">
            <Image src="/logo.png" alt="" width={56} height={56} />
            <span className="font-display text-3xl font-bold tracking-tight">
              SSC<span className="text-visor">ICTS</span>
            </span>
          </a>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">
            Empowering the next generation of tech leaders through innovation, collaboration and excellence.
          </p>
          {contact.socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {contact.socials.map((social) => {
                const Icon = socialIcons[social.icon] ?? Instagram;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-line text-mute transition-all duration-300 hover:border-visor hover:text-visor hover:shadow-[0_0_16px_rgba(255,159,28,0.25)]"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <h3 className="font-display text-lg font-semibold">Quick links</h3>
          <ul className="mt-4 grid gap-2 text-mute">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-visor">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <ul className="mt-4 grid gap-2 text-mute">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-visor">
                {contact.email}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-7xl border-t border-line pt-6 text-sm text-mute">
        &copy; 2026 SSCICTS · Cypher &rsquo;27. All rights reserved. Designed by SSCICTS Developers.
      </p>
    </footer>
  );
}

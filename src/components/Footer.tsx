import Image from "next/image";
import { InstagramIcon, socialIcons } from "./SocialIcons";
import { contact, nav } from "@/lib/data";

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
                const Icon = socialIcons[social.icon] ?? InstagramIcon;
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

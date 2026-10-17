import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { Heading } from "./ui";

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-display text-sm font-semibold tracking-widest text-visor uppercase">Good to know</p>
          <Heading className="text-4xl sm:text-5xl lg:text-6xl">Frequently asked questions</Heading>
        </div>
        <div className="space-y-3">
          {faqs.map((item) => (
            <details key={item.q} name="faq" className="faq glass group rounded-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-lg font-semibold text-bone sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown size={20} className="shrink-0 text-visor transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-6 pb-6 text-lg leading-relaxed text-mute">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

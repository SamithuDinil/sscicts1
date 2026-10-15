import Image from "next/image";
import { projects } from "@/lib/data";
import { Heading, Tilt, Wipe } from "./ui";

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" className="relative bg-deep px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <Heading className="text-5xl sm:text-7xl">What we build</Heading>
          <p className="mt-5 text-xl text-mute">Projects and sessions run by our members.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Tilt className="lg:col-span-7">
            <article className="clip-hud group h-full border border-line bg-panel/60">
              <Wipe className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </Wipe>
              <div className="p-7 sm:p-9">
                <p className="font-display text-base font-medium text-visor">{featured.tag}</p>
                <h3 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">{featured.title}</h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-mute">{featured.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {featured.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-4 py-1.5 text-sm text-bone">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Tilt>

          <div className="grid gap-6 lg:col-span-5">
            {rest.map((project) => (
              <Tilt key={project.title}>
                <article className="clip-hud group grid h-full border border-line bg-panel/60 sm:grid-cols-5 lg:grid-cols-1">
                  <Wipe className="relative aspect-[16/10] overflow-hidden sm:col-span-2 sm:aspect-auto lg:col-span-1 lg:aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </Wipe>
                  <div className="p-6 sm:col-span-3 lg:col-span-1">
                    <p className="font-display text-sm font-medium text-visor">{project.tag}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-2 leading-relaxed text-mute">{project.text}</p>
                  </div>
                </article>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

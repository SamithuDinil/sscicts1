import Image from "next/image";
import { projects } from "@/lib/data";
import { Heading, Tilt, Wipe } from "./ui";

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" className="relative bg-deep px-6 py-32 sm:py-40">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 font-display text-sm font-semibold tracking-widest text-visor uppercase">
            Portfolio
          </p>
          <Heading className="text-5xl sm:text-7xl">
            <span className="glitch" data-text="What we build">
              What we build
            </span>
          </Heading>
          <p className="mt-5 text-xl text-mute">Projects and sessions run by our members.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Tilt className="lg:col-span-7" max={8}>
            <article className="cyber-card clip-hud group h-full border border-line bg-panel/70 overflow-hidden">
              <span className="tilt-glare" />
              <Wipe className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent to-transparent opacity-80" />
              </Wipe>
              <div className="relative z-[2] p-7 sm:p-9">
                <p className="font-display text-base font-medium text-visor">{featured.tag}</p>
                <h3 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl glitch" data-text={featured.title}>
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-mute">{featured.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {featured.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line bg-void/40 px-4 py-1.5 text-sm text-bone backdrop-blur-sm"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Tilt>

          <div className="grid gap-6 lg:col-span-5">
            {rest.map((project) => (
              <Tilt key={project.title} max={9}>
                <article className="cyber-card clip-hud group grid h-full overflow-hidden border border-line bg-panel/70 sm:grid-cols-5 lg:grid-cols-1">
                  <span className="tilt-glare" />
                  <Wipe className="relative aspect-[16/10] overflow-hidden sm:col-span-2 sm:aspect-auto lg:col-span-1 lg:aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                  </Wipe>
                  <div className="relative z-[2] p-6 sm:col-span-3 lg:col-span-1">
                    <p className="font-display text-sm font-medium text-visor">{project.tag}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-tight glitch" data-text={project.title}>
                      {project.title}
                    </h3>
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

import type { ProjectStat } from "../types/projects";

export function ProjectStatsSection({ stats }: { stats: ProjectStat[] }) { return <section className="bg-[#090909] px-[clamp(28px,5vw,72px)] py-[62px] text-white"><div className="mx-auto grid max-w-[1460px] grid-cols-4 gap-10 max-[700px]:grid-cols-2">{stats.map((stat) => <div key={stat.label}><p className="text-[34px] font-bold tracking-[-1px]">{stat.value}</p><p className="mt-2 text-[8px] tracking-[3px] text-white/25 uppercase">{stat.label}</p></div>)}</div></section>; }

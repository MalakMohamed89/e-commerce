export default function ShowByLabel({ paragraph,shopByLabel }: { shopByLabel: string ,paragraph:string}) {
  return (
    <div className="flex items-center gap-4 py-10 pl-2 lg:pl-6 2xl:pl-22">
      <div className="h-10 w-1.5 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
        {paragraph} <span className="text-emerald-600">{shopByLabel}</span>
      </h1>
    </div>
  );
}
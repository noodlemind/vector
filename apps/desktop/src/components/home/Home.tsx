import { useEffect, useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { NeedsYouRow } from "./NeedsYouRow";
import { getHomeView, type HomeView } from "../../lib/home";

export function Home() {
  const [view, setView] = useState<HomeView | null>(null);

  useEffect(() => {
    let active = true;
    getHomeView()
      .then((v) => {
        if (active) setView(v);
      })
      .catch((error) => {
        console.error("Failed to load home view", error);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section aria-labelledby="home-heading" className="mx-auto flex w-full max-w-[640px] flex-col pt-[8vh]">
      <h1 id="home-heading" className="sr-only">
        Home
      </h1>

      {view?.catchUp ? (
        <p className="mb-[34px] text-[12.5px] text-muted-dim">{view.catchUp}</p>
      ) : null}

      <div className="mb-1.5">
        <Eyebrow>Needs you</Eyebrow>
      </div>

      <div className="flex flex-col">
        {view?.needs.map((item) => <NeedsYouRow key={item.id} item={item} />)}
      </div>

      {view ? (
        <p className="mt-auto flex items-center gap-[9px] pt-[26px] text-[12.5px] text-muted-dim">
          <span aria-hidden="true" className="size-[5px] rounded-full bg-muted-dim" />
          <span>
            Underway — {view.underway.preparing} preparing, {view.underway.evaluating} evaluating
          </span>
          <span className="text-separator">·</span>
          <span>{view.underway.resolved} resolved</span>
        </p>
      ) : null}
    </section>
  );
}

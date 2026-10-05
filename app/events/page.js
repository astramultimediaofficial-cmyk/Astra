import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import { CtaBand, Highlights, WorkshopsSection } from "@/component/site/Sections";

export const metadata = {
  title: "Workshops | Astra Multimedia",
  description:
    "Intensive one-day workshops in UI/UX, Digital Marketing, SAP and multimedia careers, led by Astra mentors in Coimbatore and online.",
};

export default function Events() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Workshops" }]}
        eyebrow="One-day workshops"
        title={
          <>
            Learn fast. <span className="as-accent-red">Go deep.</span>
          </>
        }
        lead="Join our intensive one-day workshops — hands-on sessions for SAP, Digital Marketing, UI/UX and multimedia career paths. Available online and in person."
      />
      <WorkshopsSection withHead={false} className="" />
      <Highlights />
      <CtaBand
        title={
          <>
            Reserve your
            <br />
            seat today.
          </>
        }
        copy="Seats in each workshop are limited. Call or message us to book your slot for the next batch."
      />
    </SiteShell>
  );
}

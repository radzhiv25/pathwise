"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Clock,
  Gauge,
  ListTodo,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const viewMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function InsightMeter({
  label,
  value,
  caption,
}: {
  label: string;
  value: number;
  caption: string;
}) {
  return (
    <Card size="sm" className="h-full">
      <CardHeader className="border-b border-border/80 pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm">{label}</CardTitle>
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] font-medium text-primary">
            {value}%
          </span>
        </div>
        <CardDescription>{caption}</CardDescription>
      </CardHeader>
      <CardContent className="pt-3">
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700"
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="mt-3 text-[0.65rem] leading-relaxed text-muted-foreground">
          Illustrative signal your real scores come from what you share in chat.
        </p>
      </CardContent>
    </Card>
  );
}

const previewUserMsg1 =
  "I'm a PM wanting to move into AI product work in the next 6 months. Where should I start?";
const previewAssistantMsg1 =
  "Let's anchor on proof: ship one small AI-assisted workflow your team already uses, then draft a 3-bullet narrative that ties metrics → model risk → rollout. Want me to propose a two-week plan?";
const previewUserMsg2 = "Yes—two weeks is doable.";
const previewAssistantMsg2 =
  "Week 1: pick one workflow, capture a baseline metric, ship an internal toggle. Week 2: tighten the narrative and book two 15-minute readouts with stakeholders who can sponsor a pilot.";
const previewUserMsg3 =
  "Our Slack is pretty noisy—would a lightweight triage bot be too much scope for week 1?";
const previewAssistantMsg3 =
  "Not if we bound it: one channel, one intake template, and a clear “done” signal (e.g. time-to-first-response). If that still feels big, we swap the bot for a single saved-search + digest.";

function ChatPreview() {
  return (
    <Card className="h-full lg:col-span-3">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary">
            <MessageSquare className="size-4" aria-hidden />
          </div>
          <div>
            <CardTitle>Career check-in</CardTitle>
            <CardDescription>Example thread same layout as in the app</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[min(22rem,55vh)] flex-1 flex-col gap-3 pt-4">
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-lg bg-primary px-3 py-2.5 text-left text-xs leading-relaxed text-primary-foreground">
            {previewUserMsg1}
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[92%] rounded-lg border border-border bg-card px-3 py-2.5 text-left text-xs leading-relaxed text-foreground shadow-sm">
            {previewAssistantMsg1}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[72%] rounded-lg bg-primary px-3 py-2.5 text-left text-xs leading-relaxed text-primary-foreground">
            {previewUserMsg2}
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[92%] rounded-lg border border-border bg-card px-3 py-2.5 text-left text-xs leading-relaxed text-foreground shadow-sm">
            {previewAssistantMsg2}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-lg bg-primary px-3 py-2.5 text-left text-xs leading-relaxed text-primary-foreground">
            {previewUserMsg3}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center">
        <Input
          disabled
          readOnly
          value=""
          placeholder="Ask about your next move…"
          className="pointer-events-none flex-1 opacity-95"
          aria-hidden
        />
        <Button size="sm" className="w-full shrink-0 sm:w-auto" disabled>
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}

export function LandingShowcase() {
  return (
    <div className="border-t border-border bg-muted/20">
      {/* What you leave with */}
      <motion.section {...viewMotion} className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Highlights
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Signals PathWise keeps visible in every thread
          </h2>
          <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">
            The UI is built around three recurring insights so you always know what changed, not
            just what was said.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <InsightMeter
            label="Role–market fit"
            value={78}
            caption="How your story lines up with the roles you say you want."
          />
          <InsightMeter
            label="Skill leverage"
            value={64}
            caption="What to reuse from your background vs. what to learn next."
          />
          <InsightMeter
            label="Move confidence"
            value={86}
            caption="Whether your next step is realistic on your timeline and constraints."
          />
        </div>
      </motion.section>

      <Separator className="mx-auto max-w-5xl" />

      {/* Session + structured takeaways */}
      <motion.section
        {...viewMotion}
        transition={{ ...viewMotion.transition, delay: 0.05 }}
        className="mx-auto max-w-5xl px-4 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            In the product
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            A session looks like a chat with structure underneath
          </h2>
          <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">
            Same components you use in the app: cards for context, bubbles for dialogue, and a
            compact strip for takeaways you can screenshot or revisit later.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <ChatPreview />

          <Card className="h-full lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" aria-hidden />
                <CardTitle>Session insights</CardTitle>
              </div>
              <CardDescription>What the counselor is trying to keep explicit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0 px-0">
              <div className="flex gap-3 px-4 py-3">
                <Target className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-medium text-foreground">Focus</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Narrow from “AI PM” to one credible proof you can ship inside your current org.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3 px-4 py-3">
                <TrendingUp className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-medium text-foreground">Leverage</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Reuse PM craft (discovery, metrics) before chasing new certificates.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3 px-4 py-3">
                <Briefcase className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-medium text-foreground">Next move</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Two-week plan: ship workflow + write narrative + line up two internal demos.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3 px-4 py-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-medium text-foreground">Time box</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Keep milestones to a two-week slice so scope does not dissolve between visits.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3 px-4 py-3">
                <ListTodo className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-medium text-foreground">Assumptions</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Name what would invalidate the plan—budget, sponsor air cover, or hiring
                    freeze—before debating tactics.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border text-[0.65rem] text-muted-foreground">
              Real sessions mirror this pattern: dialogue on the left, durable takeaways on the
              right.
            </CardFooter>
          </Card>
        </div>
      </motion.section>

      <Separator className="mx-auto max-w-5xl" />

      {/* Three product behaviors */}
      <motion.section
        {...viewMotion}
        transition={{ ...viewMotion.transition, delay: 0.08 }}
        className="mx-auto max-w-5xl px-4 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Why it feels intuitive
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            The product keeps three habits on rails
          </h2>
        </div>

        <div className="mt-10 rounded-2xl border border-border/70 bg-muted/20 p-2 shadow-sm ring-1 ring-foreground/[0.04] sm:p-3 dark:bg-muted/10">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
            <Card size="sm" className="rounded-xl">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground">
                    Context
                  </span>
                  <Gauge className="size-5 text-primary" aria-hidden />
                </div>
                <CardTitle className="mt-2 text-base">Grounded context</CardTitle>
                <CardDescription>
                  Each PathWise chat is a saved session with full message history. The counselor
                  replies from that thread and the system prompt—there is no separate profile wizard
                  or scoring engine today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">·</span>
                    Scroll back through prior turns in the same session instead of restating
                    everything.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">·</span>
                    The model is steered as a career counselor (planning, search, interviews,
                    transitions)—not a bespoke company policy bot.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">·</span>
                    BYOK in chat settings: keys live in this browser’s localStorage
                  </li>
                  {/* <li className="flex gap-2">
                    <span className="text-primary">·</span>
                    Assistant messages render as markdown when the model formats lists or emphasis
                    that way.
                  </li> */}
                </ul>
              </CardContent>
            </Card>

            <Card size="sm" className="rounded-xl">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-primary">
                    Compare
                  </span>
                  <TrendingUp className="size-5 text-primary" aria-hidden />
                </div>
                <CardTitle className="mt-2 text-base">Weighing tradeoffs</CardTitle>
                <CardDescription>
                  There is no dedicated “compare paths” UI yet—tradeoffs show up in natural language
                  in the chat. The table is an example of tensions people often talk through with a
                  counselor, not an automated matrix.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 md:pt-1">
                <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
                  <table className="w-full border-collapse text-left font-mono text-[0.65rem] leading-tight [&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-0.5">
                    <caption className="sr-only">
                      Example career tensions you might explore in conversation, not a live product
                      comparison grid
                    </caption>
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        <th
                          scope="col"
                          className="text-xs font-semibold tracking-tight text-foreground"
                        >
                          Option A
                        </th>
                        <th
                          scope="col"
                          className="w-9 text-center text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground"
                        >
                          vs
                        </th>
                        <th
                          scope="col"
                          className="text-right text-xs font-semibold tracking-tight text-foreground"
                        >
                          Option B
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/80">
                        <td>Stay in current role</td>
                        <td className="bg-muted/20 text-center text-[0.55rem] text-muted-foreground/60">
                          —
                        </td>
                        <td className="text-right">Pursue a new track</td>
                      </tr>
                      <tr className="border-b border-border/80">
                        <td>More applications</td>
                        <td className="bg-muted/20 text-center text-[0.55rem] text-muted-foreground/60">
                          —
                        </td>
                        <td className="text-right">Fewer, deeper intros</td>
                      </tr>
                      <tr className="border-b border-border/80">
                        <td>Generalist story</td>
                        <td className="bg-muted/20 text-center text-[0.55rem] text-muted-foreground/60">
                          —
                        </td>
                        <td className="text-right">Niche positioning</td>
                      </tr>
                      <tr className="border-b border-border/80">
                        <td>Local market</td>
                        <td className="bg-muted/20 text-center text-[0.55rem] text-muted-foreground/60">
                          —
                        </td>
                        <td className="text-right">Relocation</td>
                      </tr>
                      <tr>
                        <td>Stability first</td>
                        <td className="bg-muted/20 text-center text-[0.55rem] text-muted-foreground/60">
                          —
                        </td>
                        <td className="text-right">Higher-risk upside</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card size="sm" className="rounded-xl">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-primary">
                    Next steps
                  </span>
                  <Sparkles className="size-5 text-primary" aria-hidden />
                </div>
                <CardTitle className="mt-2 text-base">What you do with a reply</CardTitle>
                <CardDescription>
                  PathWise does not auto-extract tasks or collapse answers into a separate checklist
                  view. You get streamed markdown text—anything you keep is what you copy or act on
                  yourself.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-3 py-2.5">
                  {[
                    "Copy a sentence into your resume or outreach draft.",
                    "Paste the model’s bullet list into your notes app if it helped.",
                    "Start a new chat when the topic shifts so threads stay readable.",
                    // "Switch provider or model in settings if tone or depth feels off.",
                    "Book time on your calendar for the one action you named in chat.",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 font-mono text-[0.7rem] text-foreground"
                    >
                      <span className="size-3.5 shrink-0 rounded border border-primary/50 bg-background" />
                      {t}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Closing CTA */}
      <motion.section
        {...viewMotion}
        transition={{ ...viewMotion.transition, delay: 0.1 }}
        className="mx-auto max-w-5xl px-4 pb-20 pt-4 sm:pb-24"
      >
        <Card className="overflow-hidden bg-card/80">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-10 text-center sm:px-10">
            <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Ready to pressure-test your next career move?
            </h2>
            <p className="max-w-lg text-pretty text-sm text-muted-foreground">
              Sign in, start a thread, and keep the same components you saw here—cards, chat, and
              takeaways—in one flow.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/login">
                  Start chat
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link href="/signup">Create account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}

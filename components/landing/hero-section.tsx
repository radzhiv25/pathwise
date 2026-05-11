"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  KeyRound,
  ListChecks,
  LogIn,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const flowSteps = [
  {
    icon: LogIn,
    title: "Sign in",
    description: "Create an account or log in your sessions stay tied to you.",
  },
  {
    icon: MessageSquare,
    title: "Open a chat",
    description: "Describe where you are: role, goals, blockers, or a fork in the road.",
  },
  {
    icon: ListChecks,
    title: "Get a clear path",
    description: "Turn the thread into next steps you can actually act on this week.",
  },
  {
    icon: KeyRound,
    title: "Own the stack (optional)",
    description: "Bring your own model keys; they live in this browser only when you choose.",
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center px-6 py-20 md:py-28">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,var(--primary)_12%,transparent_62%)] opacity-40 dark:opacity-35"
      />

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground"
        >
          PathWise
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Career guidance,{" "}
          <span className="text-primary">without the noise.</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          PathWise is a focused career companion: one thread at a time, grounded questions, and
          answers you can use not generic essays.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10"
        >
          <Button asChild size="lg" className="rounded-full px-7">
            <Link href="/login">
              Start chat
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-16 w-full max-w-3xl"
      >
        <p className="mb-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          How it works
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              custom={5 + index}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-left ring-1 ring-foreground/5 backdrop-blur-sm transition-colors hover:bg-card/80"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <step.icon className="size-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-medium text-foreground">{step.title}</h2>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        custom={9}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-12 w-full max-w-xl"
      >
        <div className="rounded-xl border border-primary/40 bg-primary/5 px-5 py-5 text-center ring-1 ring-primary/15">
          <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            The point:{" "}
            <span className="text-primary">clarity you can act on</span>, in a private workspace.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Fewer tabs, less jargon just a counselor-style dialogue that respects your context and
            your boundaries.
          </p>
        </div>
      </motion.div>

      <motion.div
        custom={10}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-12 h-px w-16 bg-border"
      />

      <motion.p
        custom={11}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-8 max-w-md text-center text-xs leading-relaxed text-muted-foreground"
      >
        Optional: connect your own provider keys in chat (Anthropic, OpenAI, Gemini, and more) 
        stored only in this device&apos;s localStorage when you save them.
      </motion.p>
    </section>
  );
}

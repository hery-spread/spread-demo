"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm backdrop-blur">
              <span>✨ Nouveau</span>
              <span className="text-gray-400">Plateforme d&apos;influence marketing</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Trouvez, analysez et activez des influenceurs qui convertissent
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Spread vous aide à découvrir les bons créateurs sur Instagram, YouTube et TikTok, à analyser leur audience et à lancer vos campagnes en quelques minutes.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/onboarding">
                <Button className="h-12 px-6 text-base">
                  Commencer l&apos;essai gratuit
                </Button>
              </Link>
              <Link href="/pricing" className="inline-block">
                <Button variant="secondary" className="h-12 px-6 text-base">
                  Voir les offres
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Essai sans carte bancaire • Annulation en 1 clic • Accès immédiat
            </p>

            {/* Social proof */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-600">★ ★ ★ ★ ★</span>
                <span>Noté 4.9/5 par les équipes marketing</span>
              </div>
              <div className="hidden h-3 w-px bg-gray-300 sm:block" />
              <div>+15 000 rapports générés</div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-surface rounded-2xl border border-purple-200/50 p-4 shadow-xl">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  <FeatureCard title="Ciblage précis" desc="Filtres avancés: audience, ER, localisation" icon="🔎" />
                  <FeatureCard title="Rapports audience" desc="Âge, genre, pays, intérêts" icon="📊" />
                  <FeatureCard title="Campagnes" desc="Gérez vos flux d&apos;activation" icon="🚀" />
                  <FeatureCard title="Emails intégrés" desc="Centralisez les échanges" icon="✉️" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <p className="mb-4 text-center text-sm font-medium text-gray-500">
          Confié par des équipes ambitieuses
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
          <Image src="/vercel.svg" alt="Brand" width={90} height={24} />
          <Image src="/next.svg" alt="Brand" width={90} height={24} />
          <Image src="/globe.svg" alt="Brand" width={90} height={24} />
          <Image src="/window.svg" alt="Brand" width={90} height={24} />
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <BenefitCard title="Gagnez du temps" desc="Passez de la recherche au lancement en quelques minutes grâce à nos presets et filtres intelligents." />
          <BenefitCard title="Meilleure précision" desc="Des rapports d&apos;audience riches pour cibler des communautés réellement pertinentes." />
          <BenefitCard title="ROI mesurable" desc="Suivez l&apos;impact et optimisez vos investissements d&apos;une campagne à l&apos;autre." />
        </div>
      </section>

      {/* CTA bottom */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <div className="glass-surface-dark rounded-3xl border border-white/10 p-8 text-center text-white shadow-2xl" style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}>
          <h2 className="text-2xl font-bold">Essayez Spread gratuitement dès aujourd&apos;hui</h2>
          <p className="mt-2 text-white/90">
            7 jours pour découvrir la plateforme. Sans carte bancaire.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/onboarding">
              <Button className="h-12 px-6 text-base">Démarrer mon essai</Button>
            </Link>
            <Link href="/search">
              <Button variant="secondary" className="h-12 px-6 text-base">
                Voir les profils
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg">
      <div className="mb-2 text-2xl">{icon}</div>
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
  );
}

function BenefitCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="text-lg font-bold text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{desc}</div>
    </div>
  );
}


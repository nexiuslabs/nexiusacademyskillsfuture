import React, { useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import SEO from "../components/SEO";
import WorkplaceGapTest from "../components/career/WorkplaceGapTest";
import { trackEvent } from "../services/analytics";
import { submitLeadCapture } from "../services/leadCaptureService";
import { getVisitorContext } from "../services/visitorSession";

const capabilities = [
  "Problem framing",
  "Workflow design",
  "AI collaboration",
  "Verification and governance",
  "Evidence of application",
];
const bookingUrl =
  "https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb@nexiuslabs.com/meetingtype/rQlRqMpqtECRRRNfXW-T9A2?anonymous&ismsaljsauthenabled&ep=mlink";
const validPhone = (value: string) =>
  /^\+65[0-9]{8}$/.test(value.replace(/[\s().-]/g, ""));
const validEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

const AICareerFairPage: React.FC = () => {
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingBusy, setBookingBusy] = useState(false);
  const [bookingSaved, setBookingSaved] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const bookingReady =
    bookingName.trim().length >= 2 &&
    validEmail(bookingEmail) &&
    validPhone(bookingPhone);
  const submitBookingLead = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!bookingReady || bookingBusy) return;
    if (bookingSaved) { window.location.assign(bookingUrl); return; }
    setBookingBusy(true);
    setBookingError("");
    try {
      const context = getVisitorContext();
      await submitLeadCapture({
        fullName: bookingName.trim(), email: bookingEmail.trim().toLowerCase(), phone: bookingPhone.replace(/[\s().-]/g, ""),
        role: "Not provided", companyName: "", departmentOrDesignation: "", leadFlow: "advisory_call", ageBand: "not_provided",
        preferredIntake: "15-minute AI career consultation", cohortCode: "not_applicable", courseSlug: "ai-career", intent: "advisory_call",
        payerType: "self", sponsorContactName: "", sponsorContactEmail: "", sponsorStatus: "not_applicable",
        sourceTag: "ai-career-consultation", pagePath: "/ai-career/", visitorId: context?.visitorId, sessionId: context?.sessionId,
        landingPath: context?.landingPath, referrer: context?.referrer, leadSource: context?.leadSource || "ai-career-consultation",
        utmSource: context?.utmSource, utmMedium: context?.utmMedium, utmCampaign: context?.utmCampaign, utmContent: context?.utmContent,
        deviceType: context?.deviceType,
      });
      setBookingSaved(true);
      trackEvent("consultation_lead_captured", { campaign: "career_fair_2026", source: "booth_qr" });
      window.location.assign(bookingUrl);
    } catch {
      setBookingError("We could not save your details. Please try again before opening the booking calendar.");
    } finally { setBookingBusy(false); }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-gray-800">
      <SEO
        title="AI Career Readiness Action Kit | Nexius Academy"
        description="Assess your AI career readiness, build a practical 90-day action plan and book a 15-minute consultation."
        canonical="/ai-career"
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#001827] pt-28 text-white lg:pt-0">
          <div
            className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(90deg,#001827_0%,rgba(0,24,39,0.9)_26%,rgba(0,24,39,0.28)_44%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <div className="container-page relative z-10 py-12 lg:flex lg:min-h-[620px] lg:items-center lg:py-24">
            <div className="lg:max-w-[48%]">
              <p className="mb-5 text-xs font-bold tracking-[.18em] text-teal-200">
                TECH &amp; ACCOUNTANCY CAREER FAIR 2026 · AI CAREER READINESS
                ACTION KIT
              </p>
              <h1 className="text-balance text-4xl font-black leading-[1.05] md:text-6xl">
                AI changes tasks before it changes job titles.
              </h1>
              <p className="mt-6 text-lg leading-8 text-purple-50">
                Understand the shift, assess your work and build a practical
                30/60/90-day plan for Tech or Accountancy.
              </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href="#self-check"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white shadow-lg hover:bg-accent/90"
                  >
                    Start gap test <ArrowRight size={18} />
                  </a>
                  <a
                    href="#consultation"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/50 px-6 py-3 font-bold hover:bg-white/10"
                  >
                    Book consultation
                  </a>
                </div>
                <p className="mt-5 text-sm text-purple-100">
                  Your diagnostic answers stay in your browser and are not stored.
                </p>
            </div>
          </div>
          <img
            src="/images/career/ai-career-readiness-hero.jpg"
            alt="Three early-career professionals walking towards connected Tech and Accountancy opportunities"
            width="1280"
            height="720"
            loading="eager"
            className="relative z-0 block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-contain lg:object-right"
          />
        </section>

        <section className="container-page py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Practical role examples",
              "3-minute gap test",
              "30-day action plan",
              "Human-led, privacy-aware guidance",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-purple-100 bg-white p-4 shadow-sm"
              >
                <Check className="text-secondary" size={20} />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-page">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              Transferable skills
            </p>
            <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">
              Five AI capabilities employers can use
            </h2>
            <p className="mt-3 text-gray-600">
              Tools will change. These capabilities travel with you.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {capabilities.map((item, i) => (
                <div key={item} className="rounded-xl bg-purple-50 p-5">
                  <span className="text-sm font-black text-secondary">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-bold text-primary">{item}</h3>
                </div>
              ))}
            </div>
            <blockquote className="mt-8 rounded-xl border-l-4 border-accent bg-orange-50 p-6 font-semibold text-primary">
              “I used AI” is weak evidence. “I mapped the process, limited the
              data, designed review gates, tested exceptions and documented the
              result” is credible.
            </blockquote>
          </div>
        </section>

        <WorkplaceGapTest />

        <section className="container-page py-20" id="consultation">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-secondary">
                Founder guidance
              </p>
              <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">
                Book a 15-minute AI career consultation
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Receive one personalised AI-career recommendation and one
                practical next step for your target role.
              </p>
              <div className="mt-6 rounded-xl bg-purple-50 p-5 text-sm leading-6 text-primary">
                <ShieldCheck className="mb-2 text-secondary" />
                <strong>
                  Choose a suitable time directly in the booking calendar.
                </strong>{" "}
                Your meeting is confirmed only after you complete the Outlook
                booking process.
              </div>
            </div>
            <form
              onSubmit={submitBookingLead}
              className="rounded-2xl bg-white p-6 shadow-xl md:p-8"
            >
              <div className="grid gap-5">
                <Field
                  label="Name"
                  value={bookingName}
                  onChange={setBookingName}
                  autoComplete="name"
                />
                <Field
                  label="Email address"
                  type="email"
                  value={bookingEmail}
                  onChange={setBookingEmail}
                  autoComplete="email"
                  invalid={bookingEmail.length > 0 && !validEmail(bookingEmail)}
                  hint="Enter a valid email address, for example name@example.com"
                />
                <Field
                  label="Phone number"
                  type="tel"
                  value={bookingPhone}
                  onChange={setBookingPhone}
                  autoComplete="tel"
                  invalid={bookingPhone.length > 0 && !validPhone(bookingPhone)}
                  hint="Use +65 followed by exactly 8 digits, for example +65 8123 4567"
                />
              </div>
              <p className="mt-5 text-sm text-gray-600" aria-live="polite">
                {bookingReady
                  ? "You can now open the booking calendar."
                  : "Enter your name, a valid email address and a +65 phone number with 8 digits to enable booking."}
              </p>
              {bookingError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">{bookingError}</p>}
              <button
                type="submit"
                disabled={!bookingReady || bookingBusy}
                className={`mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg px-6 py-3 font-bold text-white shadow-lg ${bookingReady && !bookingBusy ? "bg-accent hover:bg-accent/90" : "cursor-not-allowed bg-gray-400"}`}
              >
                {bookingBusy ? "Saving details…" : "Book this meeting"}
              </button>
            </form>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-page">
            <h2 className="text-3xl font-black text-primary">
              Want guided practice after the career fair?
            </h2>
            <p className="mt-3 max-w-3xl text-gray-600">
              Agentic AI Foundations for Non-Technical Professionals is a
              practical, no-code, 2-day course for turning everyday work into
              governed AI-assisted workflows with human review built in.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                ["September cohort", "18 & 25 September 2026", "9:00am–6:00pm"],
                ["October cohort", "9 & 16 October 2026", "9:00am–5:00pm"],
              ].map((cohort) => (
                <article
                  className="rounded-2xl border border-purple-100 p-6"
                  key={cohort[0]}
                >
                  <h3 className="text-xl font-black text-primary">
                    Agentic AI Foundations — {cohort[0]}
                  </h3>
                  <p className="mt-3 font-semibold">
                    {cohort[1]} · {cohort[2]}
                  </p>
                  <p className="mt-2 text-gray-600">
                    In person · Singapore Institute of Management, 461 Clementi
                    Road
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    SkillsFuture-eligible. Final payable amount and live seat
                    availability depend on learner eligibility and the
                    registration channel.
                  </p>
                  <a
                    href="/courses/agentic-ai/?lead=join-next-cohort&lead_source=career_fair_2026"
                    className="mt-5 inline-flex items-center gap-2 font-bold text-secondary"
                  >
                    View registration <ArrowRight size={17} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const fieldClass =
  "mt-2 min-h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10";
function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  hint,
  invalid = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  hint?: string;
  invalid?: boolean;
}) {
  return (
    <label className="block font-semibold text-primary">
      {label}
      <input
        className={fieldClass}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          required
      />
      {hint && (
        <span className="mt-1 block text-xs font-normal text-gray-500">
          {hint}
        </span>
      )}
    </label>
  );
}

export default AICareerFairPage;

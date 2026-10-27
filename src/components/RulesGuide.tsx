"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { SECTIONS, type ContentBlock, type RuleSection } from "@/lib/rules";

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="content-blocks">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="lead">
                {block.text}
              </p>
            );
          case "paragraph":
            return (
              <p key={i} className="body">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="rule-list">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="rule-steps">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <span className="step-num">{String(j + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="rule-quote">
                {block.text}
              </blockquote>
            );
          case "callout":
            return (
              <aside key={i} className="rule-callout">
                {block.title ? <strong>{block.title}</strong> : null}
                <p>{block.text}</p>
              </aside>
            );
          case "roles":
            return (
              <div key={i} className="role-grid">
                {block.items.map((role) => (
                  <div key={role.name} className={`role-card role-${role.team}`}>
                    <span className="role-name">{role.name}</span>
                    <span className="role-desc">{role.description}</span>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function SectionView({
  section,
  direction,
}: {
  section: RuleSection;
  direction: "next" | "prev" | "jump";
}) {
  const isBg = section.imagePosition === "background";
  const isTop = section.imagePosition === "top";
  const imageLeft = section.imagePosition === "left";

  return (
    <article
      key={section.id}
      className={`section-panel section-${section.imagePosition ?? "right"} anim-${direction}`}
    >
      {isBg ? (
        <div className="section-hero">
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            priority
            className="section-hero-img"
            sizes="100vw"
          />
          <div className="section-hero-scrim" />
          <div className="section-hero-copy">
            {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
            <h1>{section.title}</h1>
            <ContentBlocks blocks={section.blocks} />
          </div>
        </div>
      ) : (
        <div
          className={`section-split ${imageLeft ? "image-left" : ""} ${
            section.mediaWide ? "media-wide" : ""
          }`}
        >
          <div className="section-copy">
            {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
            <h1>{section.title}</h1>
            <ContentBlocks blocks={section.blocks} />
          </div>
          <div
            className={`section-media ${isTop ? "media-top" : ""} ${
              section.images?.length ? "media-collage" : ""
            }`}
          >
            {section.images?.length ? (
              <>
                <div className="collage-frame collage-primary">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="section-media-img"
                    sizes="(max-width: 900px) 100vw, 48vw"
                  />
                </div>
                {section.images.map((img) => (
                  <div key={img.src} className="collage-frame collage-secondary">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="section-media-img"
                      sizes="(max-width: 900px) 50vw, 24vw"
                    />
                  </div>
                ))}
              </>
            ) : (
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                className="section-media-img"
                sizes="(max-width: 900px) 100vw, 48vw"
                style={
                  section.imageFocus
                    ? { objectPosition: section.imageFocus }
                    : undefined
                }
              />
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function RulesGuide() {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | "jump">("next");
  const [canScrollMore, setCanScrollMore] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const section = SECTIONS[index];
  const isFirst = index === 0;
  const isLast = index === SECTIONS.length - 1;
  const progress = ((index + 1) / SECTIONS.length) * 100;
  const showScrollHint = Boolean(section.scrollHint && canScrollMore);

  const updateScrollHint = useEffectEvent(() => {
    const main = mainRef.current;
    if (!main) {
      setCanScrollMore(false);
      return;
    }
    const remaining = main.scrollHeight - main.scrollTop - main.clientHeight;
    setCanScrollMore(remaining > 24);
  });

  const goTo = useEffectEvent((next: number, dir: "next" | "prev" | "jump") => {
    if (next < 0 || next >= SECTIONS.length) return;
    setDirection(dir);
    setIndex(next);
    setMenuOpen(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen && e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1, "next");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1, "prev");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    updateScrollHint();

    const onScroll = () => updateScrollHint();
    main.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateScrollHint());
    resizeObserver.observe(main);
    if (main.firstElementChild) resizeObserver.observe(main.firstElementChild);

    return () => {
      main.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, [index]);

  return (
    <div className="guide">
      <header className="guide-header">
        <a href="https://www.secretmafiaclub.com" className="brand" aria-label="Mafia Club home">
          <Image src="/images/logo.png" alt="Mafia Club" width={48} height={48} className="brand-logo" />
          <span className="brand-text">
            <span className="brand-mafia">MAFIA</span>
            <em>club</em>
          </span>
        </a>

        <div className="header-actions">
          <span className="section-count">
            {String(index + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="section-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className="progress-track" aria-hidden>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="guide-main-wrap">
        <main ref={mainRef} className="guide-main">
          <SectionView section={section} direction={direction} />
        </main>
        <button
          type="button"
          className={`scroll-hint ${showScrollHint ? "visible" : ""}`}
          aria-label="Scroll for more"
          tabIndex={showScrollHint ? 0 : -1}
          onClick={() => {
            mainRef.current?.scrollBy({ top: Math.min(320, mainRef.current.clientHeight * 0.7), behavior: "smooth" });
          }}
        >
          <span className="scroll-hint-label">Scroll</span>
          <svg className="scroll-hint-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      <footer className="guide-footer">
        <button
          type="button"
          className="nav-btn ghost"
          onClick={() => goTo(index - 1, "prev")}
          disabled={isFirst}
        >
          Back
        </button>
        <button
          type="button"
          className="nav-btn primary"
          onClick={() => (isLast ? goTo(0, "jump") : goTo(index + 1, "next"))}
        >
          {isLast ? "Start over" : isFirst ? "Begin" : "Next"}
        </button>
      </footer>

      <div
        id="section-menu"
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sections"
        hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="menu-panel">
          <p className="menu-heading">Sections</p>
          <nav className="menu-nav">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`menu-item ${i === index ? "active" : ""}`}
                onClick={() => goTo(i, "jump")}
              >
                <span className="menu-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="menu-label">{s.menuLabel}</span>
              </button>
            ))}
          </nav>
          <a className="menu-home" href="https://www.secretmafiaclub.com">
            Back to home page
          </a>
        </div>
      </div>
    </div>
  );
}

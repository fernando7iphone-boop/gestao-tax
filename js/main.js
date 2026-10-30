(() => {
  "use strict";

  /* ---------- WhatsApp ---------- */
  const WA_NUMBER = "5515996671115";
  const intro = "Olá! Vim pelo site da Gestão Tax e quero falar com um especialista";
  const WA_MESSAGES = {
    geral: `${intro} sobre o meu caso para agendarmos uma reunião.`,
    divida: `${intro} sobre a dívida ativa da minha empresa para agendarmos uma reunião.`,
    creditos: `${intro} sobre recuperação de créditos tributários para agendarmos uma reunião.`,
    planejamento: `${intro} sobre planejamento tributário para agendarmos uma reunião.`,
    juridico: `${intro} do jurídico empresarial para agendarmos uma reunião.`,
    holding: `${intro} sobre holding e proteção patrimonial para agendarmos uma reunião.`,
    energia: `${intro} sobre redução de custos com energia para agendarmos uma reunião.`
  };
  const waUrl = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  const quizAnswers = {};
  const quizMessage = () =>
    `${intro} para agendarmos uma reunião. Fiz o pré-diagnóstico:\n` +
    `• Tipo de débito: ${quizAnswers.tipo}\n` +
    `• Valor aproximado: ${quizAnswers.valor}\n` +
    `• Regime tributário: ${quizAnswers.regime}\n` +
    `• Segmento: ${quizAnswers.segmento}`;

  document.querySelectorAll("[data-wa]").forEach((a) => {
    const key = a.dataset.wa;
    if (key !== "quiz") a.href = waUrl(WA_MESSAGES[key] || WA_MESSAGES.geral);
    a.target = "_blank";
    a.rel = "noopener";
    if (key === "quiz") {
      a.addEventListener("click", () => { a.href = waUrl(quizMessage()); });
    }
  });

  /* ---------- Navegação e botão flutuante ---------- */
  const nav = document.querySelector("[data-nav]");
  const waFloat = document.querySelector(".wa-float");
  const hero = document.querySelector(".hero");
  new IntersectionObserver(([entry]) => {
    nav.classList.toggle("is-scrolled", !entry.isIntersecting);
    waFloat.classList.toggle("is-visible", !entry.isIntersecting);
  }, { rootMargin: "-80px 0px 0px 0px" }).observe(hero);

  /* ---------- Abas de soluções ---------- */
  const tabs = [...document.querySelectorAll("[data-tabs] [role=tab]")];
  const selectTab = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
      if (on && window.gsap && motionOK) {
        gsap.fromTo(panel, { opacity: 0, y: 18, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: .6, ease: "power3.out", clearProps: "filter" });
        gsap.fromTo(panel.querySelector("img"), { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power3.out" });
      }
    });
    if (focus) tab.focus();
    if (window.matchMedia("(max-width:1020px)").matches) tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (e) => {
      const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (next) { e.preventDefault(); selectTab(tabs[(i + next + tabs.length) % tabs.length], true); }
    });
  });

  /* ---------- Pré-diagnóstico ---------- */
  const quiz = document.querySelector("[data-quiz]");
  const qs = [...quiz.querySelectorAll("[data-q]")];
  const bar = quiz.querySelector("[data-quiz-bar]");
  const stepEl = quiz.querySelector("[data-quiz-step]");
  const back = quiz.querySelector("[data-quiz-back]");
  const next = quiz.querySelector("[data-quiz-next]");
  const nav2 = quiz.querySelector("[data-quiz-nav]");
  const err = quiz.querySelector("[data-quiz-error]");
  const done = quiz.querySelector("[data-quiz-done]");
  const count = quiz.querySelector(".quiz__count");
  let step = 0;

  const show = (i) => {
    qs.forEach((q, n) => { q.hidden = n !== i; q.classList.toggle("is-active", n === i); });
    step = i;
    stepEl.textContent = i + 1;
    bar.style.width = `${((i + 1) / qs.length) * 100}%`;
    back.disabled = i === 0;
    next.firstChild.textContent = i === qs.length - 1 ? "Ver resultado " : "Continuar ";
    err.hidden = true;
    if (window.gsap && motionOK) gsap.from(qs[i], { opacity: 0, x: 24, duration: .45, ease: "power3.out" });
  };
  const answer = () => {
    const checked = qs[step].querySelector("input:checked");
    return checked ? checked.value : null;
  };
  next.addEventListener("click", () => {
    const value = answer();
    if (!value) { err.hidden = false; return; }
    quizAnswers[qs[step].dataset.q] = value;
    if (step < qs.length - 1) return show(step + 1);
    qs.forEach((q) => (q.hidden = true));
    nav2.hidden = true;
    count.hidden = true;
    bar.style.width = "100%";
    bar.style.background = "var(--green)";
    done.hidden = false;
    if (window.gsap && motionOK) {
      gsap.from(done.children, { opacity: 0, y: 16, filter: "blur(6px)", stagger: .08, duration: .6, ease: "power3.out", clearProps: "filter" });
      gsap.from(done.querySelector(".quiz__check"), { scale: 0, rotate: -40, duration: .7, ease: "back.out(2)" });
    }
  });
  back.addEventListener("click", () => step > 0 && show(step - 1));
  quiz.addEventListener("change", () => (err.hidden = true));
  quiz.addEventListener("submit", (e) => e.preventDefault());

  /* ---------- Motion (GSAP) ---------- */
  const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const notifs = [...document.querySelectorAll("[data-notif]")];
  const toggle = document.querySelector(".phone__toggle");

  if (!window.gsap || !window.ScrollTrigger || !motionOK) {
    toggle.classList.add("is-on");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("js-motion");

  // Títulos do hero: cada linha sobe de dentro da máscara
  document.querySelectorAll("[data-line]").forEach((line) => {
    line.innerHTML = `<span class="line__in" style="display:inline-block">${line.innerHTML}</span>`;
  });

  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
  heroTl
    .from(".nav", { y: -30, opacity: 0, duration: .8 })
    .from(".line__in", { yPercent: 110, duration: 1.1, stagger: .12 }, "-=.5")
    .fromTo(".hero [data-reveal]", { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: .9, stagger: .1, clearProps: "filter" }, "-=.7")
    .from(".phone", { opacity: 0, y: 60, rotate: 10, duration: 1.2 }, "-=1")
    .from(notifs, { opacity: 0, y: 26, scale: .94, filter: "blur(8px)", duration: .6, stagger: .55, ease: "back.out(1.6)", clearProps: "filter" }, "-=.3")
    .add(() => toggle.classList.add("is-on"), "-=.1");

  // Revelação por desfoque para o resto da página
  ScrollTrigger.batch("main section:not(.hero) [data-reveal]", {
    start: "top 86%",
    once: true,
    onEnter: (els) => gsap.fromTo(els,
      { opacity: 0, y: 28, scale: .97, filter: "blur(12px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1, stagger: .09, ease: "power3.out", clearProps: "filter,transform" })
  });

  // Contadores
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = +el.dataset.count;
    const obj = { v: 0 };
    el.textContent = "0";
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => gsap.to(obj, { v: target, duration: 1.8, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(obj.v)) })
    });
  });

  // Linhas que se desenham
  document.querySelectorAll("[data-draw]").forEach((line) => {
    gsap.from(line, {
      scaleX: 0, transformOrigin: "left center", duration: 1.6, ease: "power3.inOut",
      scrollTrigger: { trigger: line, start: "top 85%", once: true }
    });
  });

  // Profundidade discreta
  gsap.to(".blob--a", { yPercent: 40, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__phone", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.fromTo(".final__bg img", { scale: 1.15, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.utils.toArray(".tax-bg").forEach((t) =>
    gsap.fromTo(t, { xPercent: 8 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: t.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
})();

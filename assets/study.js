/* ============================================================
   study.js — interactive study tools shared by every topic page:
     • flashcards (flip, self-grade "Got it/Review", drill-missed, count)
     • definition hide/show self-quiz (one eye button per table)
     • mobile stacked-table labels
   Runs against the whole page, so each topic page just includes
   this file — no per-page wiring needed.
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ---- Flashcards: flip, self-grade, and "review missed" ----
     Each card can be graded "Got it" / "Review" from its back. The
     status is saved (per card, keyed by a hash of its question) so it
     survives reloads, and a "Review missed" toggle drills just the
     cards still marked for review. Falls back to in-memory state if
     the browser blocks localStorage (e.g. some file:// contexts). */
  const FC_KEY = (window.STORE_PREFIX || "study") + "-fc";
  const fcMem = {};
  const fcLoad = () => { try { return JSON.parse(localStorage.getItem(FC_KEY)) || {}; } catch (e) { return fcMem; } };
  const fcSave = m => { try { localStorage.setItem(FC_KEY, JSON.stringify(m)); } catch (e) { Object.assign(fcMem, m); } };
  const fcStatus = fcLoad();
  const pageId = (location.pathname.split("/").pop() || "index.html");
  function fcHash(text) {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
    return pageId + ":" + h;
  }

  document.querySelectorAll(".flash-grid").forEach(grid => {
    const cards = Array.from(grid.querySelectorAll(".flash-card"));

    function paint(card) {
      const st = fcStatus[card.dataset.fckey];
      card.classList.toggle("fc-known", st === "known");
      card.classList.toggle("fc-review", st === "review");
    }
    function remaining() { return cards.filter(c => fcStatus[c.dataset.fckey] === "review").length; }

    // Wire each card: stable key, status marker, and grade buttons.
    cards.forEach(card => {
      const front = card.querySelector(".flash-front");
      const back = card.querySelector(".flash-back");
      card.dataset.fckey = fcHash((front ? front.textContent : "").trim());
      if (front && !front.querySelector(".fc-mark")) {
        front.insertAdjacentHTML("beforeend", '<span class="fc-mark" aria-hidden="true"></span>');
      }
      if (back && !back.querySelector(".fc-grade")) {
        const grade = document.createElement("div");
        grade.className = "fc-grade";
        grade.innerHTML =
          '<button type="button" class="fc-g fc-g-known" data-g="known">✓ Got it</button>' +
          '<button type="button" class="fc-g fc-g-review" data-g="review">↻ Review</button>';
        back.appendChild(grade);
        grade.querySelectorAll(".fc-g").forEach(b => {
          b.addEventListener("click", e => {
            e.stopPropagation();
            fcStatus[card.dataset.fckey] = b.dataset.g;
            fcSave(fcStatus);
            paint(card);
            card.classList.remove("flipped");
            card.setAttribute("aria-pressed", "false");
            refreshToolbar();
            if (grid.classList.contains("fc-drilling")) applyDrill(true);
          });
        });
      }
      paint(card);
      // Reachable by keyboard as well as tap/click: Enter or Space flips.
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Flashcard — activate to reveal the answer");
      card.setAttribute("aria-pressed", "false");
      const flip = () => {
        const on = card.classList.toggle("flipped");
        card.setAttribute("aria-pressed", on ? "true" : "false");
      };
      card.addEventListener("click", e => {
        if (e.target.closest(".fc-grade")) return;
        flip();
      });
      card.addEventListener("keydown", e => {
        if (e.target.closest(".fc-grade")) return;
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
    });

    function applyDrill(on) {
      grid.classList.toggle("fc-drilling", on);
      cards.forEach(c => c.classList.toggle("fc-hide", on && fcStatus[c.dataset.fckey] !== "review"));
    }

    // Toolbar: existing shuffle / flip-all-back live in the HTML; we add
    // an All / Missed toggle switch (placed first), the count, and a reset.
    const toolbar = grid.previousElementSibling && grid.previousElementSibling.classList.contains("flash-toolbar")
      ? grid.previousElementSibling
      : document.querySelector(`.flash-toolbar[data-for="${grid.id}"]`);
    let allBtn = null, missBtn = null, remainEl = null, resetBtn = null, countEl = null;

    function setMode(mode) {
      const missed = mode === "missed";
      applyDrill(missed);
      if (allBtn) allBtn.classList.toggle("active", !missed);
      if (missBtn) missBtn.classList.toggle("active", missed);
    }
    function refreshToolbar() {
      const rem = remaining();
      if (countEl) countEl.textContent = cards.length + " cards";
      if (remainEl) remainEl.textContent = rem;
      if (missBtn) missBtn.disabled = rem === 0 && !grid.classList.contains("fc-drilling");
      if (rem === 0 && grid.classList.contains("fc-drilling")) setMode("all");
      if (resetBtn) resetBtn.hidden = !cards.some(c => fcStatus[c.dataset.fckey]);
    }

    if (toolbar) {
      countEl = toolbar.querySelector(".flash-count");
      const sw = document.createElement("div");
      sw.className = "fc-switch";
      sw.setAttribute("role", "group");
      sw.setAttribute("aria-label", "Show all cards or only the ones marked for review");
      sw.innerHTML =
        '<button type="button" class="active" data-mode="all">Show all</button>' +
        '<button type="button" data-mode="missed">Show missed <span class="fc-remain">0</span></button>';
      allBtn = sw.querySelector('[data-mode="all"]');
      missBtn = sw.querySelector('[data-mode="missed"]');
      remainEl = sw.querySelector(".fc-remain");
      sw.addEventListener("click", e => {
        const b = e.target.closest("button");
        if (!b || b.disabled) return;
        e.stopPropagation();
        setMode(b.dataset.mode);
      });
      resetBtn = document.createElement("button");
      resetBtn.type = "button";
      resetBtn.className = "flash-btn alt fc-reset-btn";
      resetBtn.textContent = "Reset progress";
      resetBtn.hidden = true;
      resetBtn.addEventListener("click", e => {
        e.stopPropagation();
        cards.forEach(c => { delete fcStatus[c.dataset.fckey]; paint(c); c.classList.remove("fc-hide"); });
        fcSave(fcStatus);
        setMode("all");
        refreshToolbar();
      });
      // switch goes first (before shuffle); reset goes just after the count
      toolbar.insertBefore(sw, toolbar.firstChild);
      if (countEl) toolbar.insertBefore(resetBtn, countEl.nextSibling); else toolbar.appendChild(resetBtn);
    }
    refreshToolbar();

    // Shuffle / flip-all-back buttons (declared in the page HTML).
    toolbar && toolbar.querySelectorAll(".flash-btn[data-action]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const unflip = c => { c.classList.remove("flipped"); c.setAttribute("aria-pressed", "false"); };
        if (btn.dataset.action === "reset") {
          cards.forEach(unflip);
        } else if (btn.dataset.action === "shuffle") {
          const order = Array.from(grid.children);
          for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
          }
          order.forEach(c => { unflip(c); grid.appendChild(c); });
        }
      });
    });
  });

  /* ---- Mobile stacked-table labels ----
     Copy each column header onto its cells (data-label) so the
     mobile CSS can render each row as a labeled card. Cells marked
     .term act as the card title and are skipped. */
  document.querySelectorAll(".table-wrap table").forEach(table => {
    const headerCells = table.querySelectorAll("thead th");
    if (!headerCells.length) return;
    const headerTexts = Array.from(headerCells).map(th => {
      const clone = th.cloneNode(true);
      clone.querySelectorAll(".badge").forEach(b => b.remove());
      return clone.textContent.trim();
    });
    table.querySelectorAll("tbody tr").forEach(row => {
      const cells = Array.from(row.children).filter(c => c.tagName === "TD");
      cells.forEach((td, i) => {
        if (td.classList.contains("term")) return;
        if (headerTexts[i]) td.setAttribute("data-label", headerTexts[i]);
      });
    });
  });

  /* ---- Definition hide/show self-quiz ----
     Each table gets ONE eye button, in the top-right of its header
     row, that hides/reveals the whole table's answers at once.
       - Default ("glossary" tables — a named term in column 1 with
         its definition/description in the rest of the row): column 1
         stays visible, columns 2+ are hidden together.
       - data-hide-mode="all" ("checklist" tables — the row is a single
         fact that only makes sense recalled as a whole, e.g. a step +
         its rationale): the entire row, including column 1, is hidden.
     A table can opt out entirely with data-nohide. Tables using the
     separate per-column toggle (data-hide-cols) are handled below and
     skipped here. */
  function applyDefRow(row, hidden) {
    row.targets.forEach(td => td.classList.toggle("def-hidden", hidden));
    row.btn.querySelector(".icon-show-w").style.display = hidden ? "none" : "inline-block";
    row.btn.querySelector(".icon-hide-w").style.display = hidden ? "inline-block" : "none";
    row.hidden = hidden;
  }

  document.querySelectorAll(".table-wrap table").forEach(table => {
    if (table.hasAttribute("data-nohide") || table.hasAttribute("data-hide-cols")) return;
    const hideAll = table.getAttribute("data-hide-mode") === "all";
    const headRow = table.querySelector("thead tr");
    const lastTh = headRow && headRow.lastElementChild;
    if (!lastTh) return;

    const targets = [];
    table.querySelectorAll("tbody tr").forEach(tr => {
      const cells = Array.from(tr.children).filter(c => c.tagName === "TD");
      const rowTargets = hideAll ? cells : cells.slice(1);
      rowTargets.forEach(td => {
        td.classList.add("def-cell");
        td.innerHTML = '<span class="def-text">' + td.innerHTML + "</span>";
        targets.push(td);
      });
    });
    if (!targets.length) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "th-eye";
    btn.setAttribute("aria-label", "Show or hide this table's answers");
    btn.innerHTML = '<span class="icon-eye icon-show-w"></span><span class="icon-eye icon-hide-w"></span>';
    lastTh.classList.add("th-eye-cell");
    lastTh.appendChild(btn);

    const row = { targets, btn, hidden: false };
    btn.addEventListener("click", () => applyDefRow(row, !row.hidden));
  });

  /* ---- Column-based hide/show (e.g. Signs of Pregnancy) ----
     Tables marked data-hide-cols get one eye button per column
     header instead of per row; clicking it hides/reveals just
     that column's cells. */
  document.querySelectorAll(".table-wrap table[data-hide-cols]").forEach(table => {
    table.querySelectorAll("thead th").forEach((th, colIndex) => {
      const cells = Array.from(table.querySelectorAll("tbody tr"))
        .map(tr => tr.children[colIndex])
        .filter(Boolean);
      if (!cells.length) return;

      cells.forEach(td => {
        td.classList.add("def-cell");
        td.innerHTML = '<span class="def-text">' + td.innerHTML + "</span>";
      });

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "th-eye";
      btn.setAttribute("aria-label", "Show or hide this column");
      btn.innerHTML = '<span class="icon-eye icon-show-w"></span><span class="icon-eye icon-hide-w"></span>';
      th.classList.add("th-eye-cell");
      th.appendChild(btn);

      let hidden = false;
      btn.addEventListener("click", () => {
        hidden = !hidden;
        cells.forEach(td => td.classList.toggle("def-hidden", hidden));
        btn.querySelector(".icon-show-w").style.display = hidden ? "none" : "inline-block";
        btn.querySelector(".icon-hide-w").style.display = hidden ? "inline-block" : "none";
      });
    });
  });

  /* ---- Lightbox: opens a table/section's stored diagram(s) ----
     A .fig-trigger button reveals the matching hidden .fig-store
     element (by id) inside a centered overlay, so lecture diagrams
     don't take up page space until the reader wants to see them.

     MUST run after the two hide/show passes above. Those rewrite
     td.innerHTML to wrap each cell in a .def-text span, which replaces
     every child node in that cell — silently dropping any listener
     already bound to it. Wiring the triggers afterwards means a
     .fig-trigger placed inside a table cell still works. */
  const figTriggers = document.querySelectorAll(".fig-trigger");
  if (figTriggers.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox-overlay";
    lightbox.innerHTML =
      '<div class="lightbox-box" role="dialog" aria-modal="true">' +
      '<button type="button" class="lightbox-close" aria-label="Close">✕</button>' +
      '<div class="lightbox-body"></div></div>';
    document.body.appendChild(lightbox);
    const lbBody = lightbox.querySelector(".lightbox-body");

    function closeLightbox() {
      lightbox.classList.remove("show");
      lbBody.innerHTML = "";
    }
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

    figTriggers.forEach(btn => {
      btn.addEventListener("click", () => {
        const source = document.getElementById(btn.dataset.lightboxTarget);
        if (!source) return;
        lbBody.innerHTML = source.innerHTML;
        lightbox.classList.add("show");
      });
    });
  }

  /* ---- Freeze table column widths so masking never reflows ----
     Runs after the eye buttons above are wired in, so the frozen
     widths already account for the button + its padding in the
     header row. Skipped when the header row measures 0 (e.g. the
     page first loads at mobile width, where the stacked-card layout
     hides the header) so we never lock columns to a collapsed width.

     Re-runs on resize, and this is load-bearing: the frozen widths are
     pixels, and under table-layout:fixed a table that later grows wider
     than the sum of its columns hands the surplus to EVERY column in
     proportion — including the term column, which then drifts far past
     the width its text needs. Releasing the freeze and re-measuring lets
     `td.term { width:1%; white-space:nowrap }` shrink it back to exactly
     one line of text at whatever the new viewport is.

     Un-masking before measuring matters too: `.def-hidden .def-text` is
     display:none, so a table measured while masked would collapse to the
     wrong widths. Removing and restoring the class inside one task means
     nothing repaints in between. */
  function freezeTableColumns() {
    document.querySelectorAll(".table-wrap table").forEach(table => {
      const ths = table.querySelectorAll("thead th");
      if (!ths.length) return;

      const masked = Array.from(table.querySelectorAll("td.def-hidden"));
      masked.forEach(td => td.classList.remove("def-hidden"));
      table.style.tableLayout = "";
      ths.forEach(th => { th.style.width = ""; });

      const widths = Array.from(ths).map(th => th.getBoundingClientRect().width);
      masked.forEach(td => td.classList.add("def-hidden"));
      if (widths.some(w => w === 0)) return;

      table.style.tableLayout = "fixed";
      ths.forEach((th, i) => { th.style.width = widths[i] + "px"; });
    });
  }

  freezeTableColumns();

  /* A table inside a hidden tab panel measures 0 and is skipped above, so it
     is still unfrozen when its tab is first opened. site.js fires "tabchange"
     on every tab switch; re-measure whatever just became visible. */
  document.addEventListener("tabchange", () => freezeTableColumns());

  let freezeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(freezeTimer);
    freezeTimer = setTimeout(freezeTableColumns, 120);
  });
});

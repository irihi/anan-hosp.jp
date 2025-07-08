function scrollToHashTarget(): void {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash) as HTMLElement | null;
  const header = document.querySelector(".blk-Header") as HTMLElement | null;

  if (target) {
    const headerHeight = header ? header.clientHeight * 2 : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetTop - headerHeight,
      behavior: "smooth"
    });
  }
}

// ページロード時にブラウザの自動スクロールを防ぐ
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  setTimeout(scrollToHashTarget, 100); // ここは調整可能
});

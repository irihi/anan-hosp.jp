window.addEventListener("DOMContentLoaded", () => {
  // 現在のURLからハッシュを取得
  const hash = window.location.hash;

  if (hash) {
    // 該当要素を取得（例：#section1）
    const target = document.querySelector(hash) as HTMLElement | null;
    const header = document.querySelector(".wp-block-template-part:has(.blk-Header)") as HTMLElement | null;

    if (target) {
      const headerHeight = header ? header.clientHeight * 1.5 : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      // スムーススクロール
      window.scrollTo({
        top: targetTop - headerHeight,
        behavior: "smooth"
      });
    }
  }
});

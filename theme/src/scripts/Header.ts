/**
 * 阿南病院サイト用ヘッダースクロール処理
 * 実際の構造に基づいた最適化版
 */

interface HeaderScrollOptions {
  headerSelector: string;
  templatePartSelector: string;
  scrolledClass: string;
  threshold: number;
  throttleDelay: number;
}

class AnanHospitalHeaderScroll {
  private headerElement: HTMLElement | null = null;
  private templatePartElement: HTMLElement | null = null;
  private options: HeaderScrollOptions;
  private isScrolled: boolean = false;
  private throttleTimer: number | null = null;

  constructor(options: Partial<HeaderScrollOptions> = {}) {
    this.options = {
      headerSelector: '.blk-Header',
      templatePartSelector: '.wp-block-template-part:has(.blk-Header)',
      scrolledClass: 'is-style-scrolled',
      threshold: 50,
      throttleDelay: 16,
      ...options
    };

    this.initializeElements();
    this.init();
  }

  private initializeElements(): void {
    this.headerElement = document.querySelector(this.options.headerSelector);
    this.templatePartElement = document.querySelector(this.options.templatePartSelector);
    
    // フォールバック：:has()をサポートしていない場合
    if (!this.templatePartElement) {
      this.templatePartElement = this.headerElement?.closest('.wp-block-template-part') || null;
    }
  }

  private init(): void {
    if (!this.headerElement) {
      console.warn(`Header element "${this.options.headerSelector}" not found`);
      return;
    }

    if (!this.templatePartElement) {
      console.warn('Template part element not found');
      return;
    }

    // バインドされたメソッドを保存
    this.handleScroll = this.handleScroll.bind(this);
    
    // パッシブリスナーでパフォーマンス向上
    window.addEventListener('scroll', this.handleScroll, { 
      passive: true 
    });
    
    // 初期状態をチェック
    this.checkScrollPosition();
  }

  private handleScroll(): void {
    if (this.throttleTimer) {
      return;
    }

    this.throttleTimer = window.setTimeout(() => {
      this.checkScrollPosition();
      this.throttleTimer = null;
    }, this.options.throttleDelay);
  }

  private checkScrollPosition(): void {
    if (!this.headerElement || !this.templatePartElement) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldAddClass = scrollTop > this.options.threshold;

    // 状態が変わった場合のみDOMを操作
    if (shouldAddClass !== this.isScrolled) {
      this.isScrolled = shouldAddClass;
      this.updateHeaderClass();
    }
  }

  private updateHeaderClass(): void {
    if (!this.headerElement || !this.templatePartElement) return;

    if (this.isScrolled) {
      // 両方の要素にクラスを追加
      this.headerElement.classList.add(this.options.scrolledClass);
      this.templatePartElement.classList.add(this.options.scrolledClass);
    } else {
      // 両方の要素からクラスを削除
      this.headerElement.classList.remove(this.options.scrolledClass);
      this.templatePartElement.classList.remove(this.options.scrolledClass);
    }
  }

  /**
   * イベントリスナーを削除（メモリリーク防止）
   */
  public destroy(): void {
    if (this.throttleTimer) {
      window.clearTimeout(this.throttleTimer);
    }
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * 手動でスクロール状態をチェック
   */
  public refresh(): void {
    this.checkScrollPosition();
  }

  /**
   * 現在のスクロール状態を取得
   */
  public getScrollState(): boolean {
    return this.isScrolled;
  }
}

// より軽量な関数型アプローチ（代替案）
const createAnanHospitalHeaderScroll = (
  threshold: number = 50
): (() => void) => {
  const headerElement = document.querySelector<HTMLElement>('.blk-Header');
  const templatePartElement = document.querySelector<HTMLElement>('.wp-block-template-part:has(.blk-Header)') ||
                              headerElement?.closest('.wp-block-template-part');
  
  if (!headerElement || !templatePartElement) {
    console.warn('Required header elements not found');
    return () => {};
  }

  let isScrolled = false;
  let ticking = false;

  const updateHeader = (): void => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldAddClass = scrollTop > threshold;

    if (shouldAddClass !== isScrolled) {
      isScrolled = shouldAddClass;
      
      const method = isScrolled ? 'add' : 'remove';
      headerElement.classList[method]('is-style-scrolled');
      templatePartElement.classList[method]('is-style-scrolled');
    }
    ticking = false;
  };

  const requestTick = (): void => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  // イベントリスナー追加
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // 初期チェック
  updateHeader();

  // クリーンアップ関数を返す
  return () => {
    window.removeEventListener('scroll', requestTick);
  };
};

// 標準的なDOM環境での初期化
const initAnanHospitalHeader = (): void => {
  const init = () => {
    const headerHandler = new AnanHospitalHeaderScroll({
      threshold: 30, // 30px スクロールで発動
      throttleDelay: 10 // よりスムーズな動作
    });

    // ページ離脱時のクリーンアップ
    window.addEventListener('beforeunload', () => {
      headerHandler.destroy();
    });
  };

  // DOMの準備状態をチェック
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOMが既に読み込まれている場合は即座に実行
    init();
  }
};

// 初期化実行
initAnanHospitalHeader();

export { AnanHospitalHeaderScroll, createAnanHospitalHeaderScroll };
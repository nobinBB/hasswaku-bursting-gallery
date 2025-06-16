
// タブ切り替え
const tabs = document.querySelectorAll('.tab');
const imageWrappers = document.querySelectorAll('.image-wrapper');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // アクティブタブの切り替え
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        // 画像の表示/非表示
        imageWrappers.forEach(wrapper => {
            if (filter === 'all' || wrapper.getAttribute('data-category') === filter) {
                wrapper.classList.remove('hidden');
            } else {
                wrapper.classList.add('hidden');
            }
        });
    });
});

// ライトボックス
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

// 画像クリックで拡大
document.addEventListener('click', (e) => {
    if (e.target.matches('.image-wrapper img')) {
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

// 閉じる機能
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ESCキーで閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// パララックス効果（オプション）
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    document.body.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px)`;
});

// タブのスクロール追従
const tabsContainer = document.querySelector('.tabs');
const tabsOffset = tabsContainer.offsetTop;
const tabsHeight = tabsContainer.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > tabsOffset) {
        // スクロール時にタブを固定
        if (!tabsContainer.classList.contains('fixed')) {
            tabsContainer.classList.add('fixed');
            tabsContainer.style.position = 'fixed';
            tabsContainer.style.top = '0';
            tabsContainer.style.left = '0';
            tabsContainer.style.right = '0';
            tabsContainer.style.background = 'rgba(255, 255, 255, 0.95)';
            tabsContainer.style.backdropFilter = 'blur(10px)';
            tabsContainer.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            tabsContainer.style.padding = '20px';
            tabsContainer.style.zIndex = '100';

            // スペーサーを追加してレイアウトのずれを防ぐ
            const spacer = document.createElement('div');
            spacer.style.height = tabsHeight + 'px';
            spacer.classList.add('tabs-spacer');
            tabsContainer.parentNode.insertBefore(spacer, tabsContainer.nextSibling);
        }
    } else {
        // 元の位置に戻す
        if (tabsContainer.classList.contains('fixed')) {
            tabsContainer.classList.remove('fixed');
            tabsContainer.style.position = '';
            tabsContainer.style.top = '';
            tabsContainer.style.left = '';
            tabsContainer.style.right = '';
            tabsContainer.style.background = '';
            tabsContainer.style.backdropFilter = '';
            tabsContainer.style.boxShadow = '';
            tabsContainer.style.padding = '';
            tabsContainer.style.zIndex = '';

            // スペーサーを削除
            const spacer = document.querySelector('.tabs-spacer');
            if (spacer) {
                spacer.remove();
            }
        }
    }
});
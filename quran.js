// تطبيق القرآن الكريم - زاد المؤمن
console.log('🚀 بدء تحميل تطبيق القرآن...');

class QuranApp {
    constructor() {
        this.currentSurah = 1;
        console.log('✅ تم إنشاء تطبيق القرآن');
    }

    init() {
        console.log('🎯 تهيئة تطبيق القرآن...');
        this.showMainPage();
        return true;
    }

    showMainPage() {
        const app = document.getElementById('app');
        if (!app) {
            console.error('❌ عنصر app غير موجود');
            return;
        }

        app.innerHTML = `
            <div class="quran-main">
                <header class="quran-header">
                    <h1>🌙 القرآن الكريم</h1>
                    <p>مصحف زاد المؤمن - النسخة المبسطة</p>
                </header>

                <div class="main-menu">
                    <div class="menu-section" onclick="quranApp.showSurahList()">
                        <i class="fas fa-book"></i>
                        <h3>تصفح السور</h3>
                        <p>استعرض واقرأ سور القرآن</p>
                    </div>

                    <div class="menu-section" onclick="quranApp.showAudioPage()">
                        <i class="fas fa-play-circle"></i>
                        <h3>التلاوات</h3>
                        <p>استمع لتلاوات متنوعة</p>
                    </div>

                    <div class="menu-section" onclick="quranApp.showAbout()">
                        <i class="fas fa-info-circle"></i>
                        <h3>حول التطبيق</h3>
                        <p>معلومات عن مصحف زاد المؤمن</p>
                    </div>
                </div>

                <footer class="quran-footer">
                    <a href="index.html" class="back-home">
                        <i class="fas fa-home"></i>
                        العودة للصفحة الرئيسية
                    </a>
                </footer>
            </div>
        `;

        console.log('✅ تم عرض الصفحة الرئيسية');
    }

    showSurahList() {
        const app = document.getElementById('app');
        let html = `
            <div class="surah-list-page">
                <div class="page-header">
                    <button onclick="quranApp.showMainPage()" class="back-btn">
                        <i class="fas fa-arrow-right"></i>
                        رجوع
                    </button>
                    <h2>📚 سور القرآن الكريم</h2>
                </div>
                <div class="surahs-container">
        `;

        if (window.quranData && window.quranData.surahs) {
            window.quranData.surahs.forEach(surah => {
                html += `
                    <div class="surah-item" onclick="quranApp.showSurah(${surah.number})">
                        <div class="surah-number">${surah.number}</div>
                        <div class="surah-info">
                            <h4>${surah.name}</h4>
                            <p>${surah.englishName} - ${surah.numberOfAyahs} آية</p>
                        </div>
                        <div class="surah-action">
                            <i class="fas fa-play" onclick="event.stopPropagation(); quranApp.playSurah(${surah.number})"></i>
                        </div>
                    </div>
                `;
            });
        } else {
            html += '<p>❌ تعذر تحميل قائمة السور</p>';
        }

        html += `</div></div>`;
        app.innerHTML = html;
    }

    showSurah(surahNumber) {
        const app = document.getElementById('app');
        const surah = window.quranData.surahs.find(s => s.number === surahNumber);
        
        if (!surah) {
            app.innerHTML = '<p>❌ السورة غير موجودة</p>';
            return;
        }

        let versesHtml = '';
        surah.ayahs.forEach(ayah => {
            versesHtml += `
                <div class="verse-item">
                    <div class="verse-text">${ayah.text}</div>
                    <div class="verse-number">${ayah.numberInSurah}</div>
                </div>
            `;
        });

        app.innerHTML = `
            <div class="surah-page">
                <div class="page-header">
                    <button onclick="quranApp.showSurahList()" class="back-btn">
                        <i class="fas fa-arrow-right"></i>
                        رجوع
                    </button>
                    <h2>سورة ${surah.name}</h2>
                    <p>${surah.englishNameTranslation} - ${surah.numberOfAyahs} آية</p>
                </div>
                
                <div class="verses-container">
                    ${versesHtml}
                </div>
                
                <div class="surah-actions">
                    <button onclick="quranApp.playSurah(${surah.number})" class="action-btn">
                        <i class="fas fa-play"></i>
                        استماع للتلاوة
                    </button>
                </div>
            </div>
        `;
    }

    playSurah(surahNumber) {
        if (window.audioSystem) {
            window.audioSystem.playSurah(surahNumber);
        } else {
            alert('🎵 خاصية التلاوات قيد التطوير');
        }
    }

    showAudioPage() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="audio-page">
                <div class="page-header">
                    <button onclick="quranApp.showMainPage()" class="back-btn">
                        <i class="fas fa-arrow-right"></i>
                        رجوع
                    </button>
                    <h2>🎵 التلاوات</h2>
                </div>
                <div class="audio-content">
                    <p>🚧 خاصية التلاوات قيد التطوير</p>
                    <p>سيتم إضافة تلاوات كاملة لجميع القراء قريباً إن شاء الله</p>
                </div>
            </div>
        `;
    }

    showAbout() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="about-page">
                <div class="page-header">
                    <button onclick="quranApp.showMainPage()" class="back-btn">
                        <i class="fas fa-arrow-right"></i>
                        رجوع
                    </button>
                    <h2>ℹ️ حول التطبيق</h2>
                </div>
                <div class="about-content">
                    <h3>مصحف زاد المؤمن</h3>
                    <p>نسخة مبسطة من المصحف الإلكتروني</p>
                    <p>تم التطوير باستخدام HTML5, CSS3, JavaScript</p>
                    <div class="features">
                        <div class="feature">📖 تصفح السور</div>
                        <div class="feature">🎵 التلاوات (قيد التطوير)</div>
                        <div class="feature">📱 متجاوز مع جميع الأجهزة</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// إنشاء التطبيق بعد تحميل الصفحة
setTimeout(() => {
    window.quranApp = new QuranApp();
    console.log('✅ تم تهيئة تطبيق القرآن');
}, 500);

// Quran Masterpiece - JavaScript الرئيسي
class QuranApp {
    constructor() {
        this.currentSurah = 1;
        this.currentVerse = 1;
        this.currentReciter = 'alafasy';
        this.currentStyle = 'hafs';
        this.audioPlayer = null;
        this.isPlaying = false;
        
        this.init();
    }

    init() {
        this.createStars();
        this.updateClock();
        this.updateHijriDate();
        this.loadSurahList();
        this.setupEventListeners();
        
        // تحديث الساعة كل ثانية
        setInterval(() => this.updateClock(), 1000);
        // تحديث التاريخ كل دقيقة
        setInterval(() => this.updateHijriDate(), 60000);
    }

    // إنشاء النجوم المتلألئة
    createStars() {
        const starsContainer = document.getElementById('stars');
        const starsCount = 150;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // تحديث الساعة الرقمية
    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const clockElement = document.getElementById('mainClock');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }

    // تحديث التاريخ الهجري
    updateHijriDate() {
        const today = new Date();
        const hijriDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(today);
        
        const hijriElement = document.getElementById('hijriDate');
        if (hijriElement) {
            hijriElement.textContent = hijriDate;
        }
    }

    // تحميل قائمة السور
    loadSurahList() {
        const surahListElement = document.getElementById('surahList');
        if (!surahListElement) return;

        let html = '';
        quranData.surahs.forEach((surah, index) => {
            html += `
                <div class="surah-card floating" style="animation-delay: ${index * 0.1}s">
                    <div class="surah-number">${surah.number}</div>
                    <div class="surah-info">
                        <h3>${surah.name} (${surah.englishName})</h3>
                        <p>${surah.englishNameTranslation} - ${surah.numberOfAyahs} آية</p>
                        <p class="revelation-type">${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
                    </div>
                    <button class="play-surah-btn" onclick="quranApp.playSurah(${surah.number})">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            `;
        });

        surahListElement.innerHTML = html;
    }

    // تشغيل سورة
    playSurah(surahNumber) {
        this.currentSurah = surahNumber;
        const surah = quranData.surahs.find(s => s.number === surahNumber);
        
        if (surah) {
            this.showSurahPage(surah);
            this.highlightCurrentSurah(surahNumber);
        }
    }

    // عرض صفحة السورة
    showSurahPage(surah) {
        const appElement = document.getElementById('app');
        if (!appElement) return;

        let versesHtml = '';
        surah.ayahs.forEach(ayah => {
            versesHtml += `
                <div class="verse" id="verse-${ayah.number}">
                    <span class="verse-text">${ayah.text}</span>
                    <span class="verse-number">${ayah.numberInSurah}</span>
                </div>
            `;
        });

        const html = `
            <div class="quran-page">
                <div class="surah-header">
                    <button class="back-btn" onclick="quranApp.showMainPage()">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <h2>سورة ${surah.name} (${surah.englishName})</h2>
                    <p>${surah.englishNameTranslation} - ${surah.numberOfAyahs} آية</p>
                </div>
                
                <div class="verses-container">
                    ${versesHtml}
                </div>
                
                <div class="audio-player">
                    <div class="player-controls">
                        <button class="control-btn" onclick="quranApp.previousVerse()">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button class="control-btn play-pause-btn" onclick="quranApp.togglePlay()">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="control-btn" onclick="quranApp.nextVerse()">
                            <i class="fas fa-step-forward"></i>
                        </button>
                    </div>
                    
                    <div class="reciter-selection">
                        <select onchange="quranApp.changeReciter(this.value)">
                            <option value="alafasy">مشاري العفاسي</option>
                            <option value="husary">محمود خليل الحصري</option>
                            <option value="minshawi">محمد صديق المنشاوي</option>
                            <option value="ajamy">أحمد العجمي</option>
                            <option value="sudais">عبدالرحمن السديس</option>
                        </select>
                    </div>
                    
                    <div class="wave-container" id="waveContainer">
                        <!-- الموجات الصوتية ستضاف هنا -->
                    </div>
                </div>
            </div>
        `;

        appElement.innerHTML = html;
        this.createWaveBars();
    }

    // العودة للصفحة الرئيسية
    showMainPage() {
        const appElement = document.getElementById('app');
        if (!appElement) return;

        appElement.innerHTML = `
            <div class="container">
                <header class="header">
                    <div class="logo">🌙 زاد المؤمن</div>
                    <h1>القرآن الكريم - التحفة الرقمية</h1>
                    <p>مصحف إلكتروني متكامل بتقنيات حديثة</p>
                </header>
                
                <section class="time-section">
                    <div class="main-clock" id="mainClock">--:--:--</div>
                    <div class="hijri-date" id="hijriDate">--/--/----</div>
                </section>
                
                <div class="sections-grid">
                    <div class="section-card" onclick="quranApp.showSurahList()">
                        <div class="section-icon">📖</div>
                        <h3>تصفح السور</h3>
                        <p>استعرض جميع سور القرآن الكريم</p>
                    </div>
                    
                    <div class="section-card" onclick="quranApp.showReciters()">
                        <div class="section-icon">🎵</div>
                        <h3>التلاوات</h3>
                        <p>استمع لأشهر القراء</p>
                    </div>
                    
                    <div class="section-card" onclick="quranApp.showSearch()">
                        <div class="section-icon">🔍</div>
                        <h3>البحث المتقدم</h3>
                        <p>ابحث في القرآن بالكلمات والمعاني</p>
                    </div>
                </div>
                
                <div id="dynamicContent"></div>
            </div>
        `;

        this.updateClock();
        this.updateHijriDate();
    }

    // عرض قائمة السور
    showSurahList() {
        const dynamicContent = document.getElementById('dynamicContent');
        if (!dynamicContent) return;

        dynamicContent.innerHTML = `
            <div class="surah-list-container">
                <h2>سور القرآن الكريم</h2>
                <div class="surah-list" id="surahList"></div>
            </div>
        `;

        this.loadSurahList();
    }

    // إنشاء الموجات الصوتية
    createWaveBars() {
        const waveContainer = document.getElementById('waveContainer');
        if (!waveContainer) return;

        waveContainer.innerHTML = '';
        const barCount = 50;

        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'wave-bar';
            bar.style.left = `${(i / barCount) * 100}%`;
            bar.style.animationDelay = `${i * 0.05}s`;
            waveContainer.appendChild(bar);
        }
    }

    // تبديل التشغيل/الإيقاف
    togglePlay() {
        const playPauseBtn = document.querySelector('.play-pause-btn');
        if (!playPauseBtn) return;

        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.highlightCurrentVerse(this.currentVerse);
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // تسليط الضوء على الآية الحالية
    highlightCurrentVerse(verseNumber) {
        // إزالة التمييز من جميع الآيات
        document.querySelectorAll('.verse').forEach(verse => {
            verse.classList.remove('active');
        });

        // إضافة التمييز للآية الحالية
        const currentVerse = document.getElementById(`verse-${verseNumber}`);
        if (currentVerse) {
            currentVerse.classList.add('active');
            currentVerse.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // تغيير القارئ
    changeReciter(reciter) {
        this.currentReciter = reciter;
        // إعادة تشغيل التلاوة بالقارئ الجديد
        if (this.isPlaying) {
            this.togglePlay();
            setTimeout(() => this.togglePlay(), 100);
        }
    }

    // الآية التالية
    nextVerse() {
        if (this.currentVerse < this.getCurrentSurahAyahsCount()) {
            this.currentVerse++;
            this.highlightCurrentVerse(this.currentVerse);
        }
    }

    // الآية السابقة
    previousVerse() {
        if (this.currentVerse > 1) {
            this.currentVerse--;
            this.highlightCurrentVerse(this.currentVerse);
        }
    }

    // الحصول على عدد آيات السورة الحالية
    getCurrentSurahAyahsCount() {
        const surah = quranData.surahs.find(s => s.number === this.currentSurah);
        return surah ? surah.ayahs.length : 0;
    }

    // تمييز السورة الحالية
    highlightCurrentSurah(surahNumber) {
        document.querySelectorAll('.surah-card').forEach(card => {
            card.classList.remove('active');
        });

        const currentCard = document.querySelector(`[onclick="quranApp.playSurah(${surahNumber})"]`);
        if (currentCard) {
            currentCard.closest('.surah-card').classList.add('active');
        }
    }
}

// تهيئة التطبيق عند تحميل الصفحة
let quranApp;
document.addEventListener('DOMContentLoaded', function() {
    quranApp = new QuranApp();
});

// وظائف مساعدة للبحث
function searchInQuran(keyword) {
    if (!keyword.trim()) return [];

    const results = [];
    const searchTerm = keyword.toLowerCase();

    quranData.surahs.forEach(surah => {
        surah.ayahs.forEach(ayah => {
            if (ayah.text.includes(searchTerm)) {
                results.push({
                    surah: surah,
                    ayah: ayah,
                    match: ayah.text
                });
            }
        });
    });

    return results;
}

// عرض نتائج البحث
function displaySearchResults(results) {
    const dynamicContent = document.getElementById('dynamicContent');
    if (!dynamicContent) return;

    if (results.length === 0) {
        dynamicContent.innerHTML = '<p class="no-results">لم يتم العثور على نتائج</p>';
        return;
    }

    let html = '<div class="search-results"><h2>نتائج البحث</h2>';
    
    results.forEach(result => {
        html += `
            <div class="search-result-card" onclick="quranApp.playSurah(${result.surah.number})">
                <h4>سورة ${result.surah.name} - الآية ${result.ayah.numberInSurah}</h4>
                <p class="verse-text">${result.ayah.text}</p>
            </div>
        `;
    });

    html += '</div>';
    dynamicContent.innerHTML = html;
  }

// Quran Audio System - زاد المؤمن
// نظام متكامل لإدارة التلاوات والتأثيرات الصوتية

class QuranAudioSystem {
    constructor() {
        this.audioContext = null;
        this.audioElement = null;
        this.analyser = null;
        this.source = null;
        this.isPlaying = false;
        this.currentAudioUrl = null;
        this.audioBuffers = new Map();
        
        this.initAudioSystem();
    }

    // تهيئة نظام الصوت
    initAudioSystem() {
        try {
            // إنشاء سياق الصوت
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createAudioElement();
            this.setupAudioAnalyser();
            console.log("✅ نظام الصوت جاهز");
        } catch (error) {
            console.error("❌ خطأ في تهيئة نظام الصوت:", error);
            this.showAudioError();
        }
    }

    // إنشاء عنصر الصوت
    createAudioElement() {
        this.audioElement = new Audio();
        this.audioElement.crossOrigin = "anonymous";
        this.audioElement.preload = "auto";
        
        // إعداد مستمعات الأحداث
        this.audioElement.addEventListener('loadeddata', () => this.onAudioLoaded());
        this.audioElement.addEventListener('play', () => this.onAudioPlay());
        this.audioElement.addEventListener('pause', () => this.onAudioPause());
        this.audioElement.addEventListener('ended', () => this.onAudioEnded());
        this.audioElement.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.audioElement.addEventListener('error', (e) => this.onAudioError(e));
    }

    // إعداد محلل الصوت للموجات البصرية
    setupAudioAnalyser() {
        if (!this.audioContext) return;

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.8;
        
        this.source = this.audioContext.createMediaElementSource(this.audioElement);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
    }

    // تحميل وتشغيل تلاوة
    async playRecitation(surahNumber, reciter = 'alafasy') {
        try {
            const audioUrl = this.getAudioUrl(surahNumber, reciter);
            
            if (!audioUrl) {
                throw new Error("رابط التلاوة غير متوفر");
            }

            this.currentAudioUrl = audioUrl;
            this.audioElement.src = audioUrl;
            
            // إظهار حالة التحميل
            this.showLoadingState();
            
            // محاولة التشغيل
            await this.audioElement.play();
            this.isPlaying = true;
            this.updatePlayButton();
            this.startVisualization();
            
        } catch (error) {
            console.error("❌ خطأ في تشغيل التلاوة:", error);
            this.handlePlayError(error);
        }
    }

    // إيقاف التلاوة
    pauseRecitation() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updatePlayButton();
            this.stopVisualization();
        }
    }

    // استئناف التلاوة
    resumeRecitation() {
        if (this.audioElement && !this.isPlaying) {
            this.audioElement.play().then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
                this.startVisualization();
            });
        }
    }

    // إعادة التشغيل
    restartRecitation() {
        if (this.audioElement) {
            this.audioElement.currentTime = 0;
            if (!this.isPlaying) {
                this.resumeRecitation();
            }
        }
    }

    // تخطي إلى وقت محدد
    seekTo(timeInSeconds) {
        if (this.audioElement) {
            this.audioElement.currentTime = timeInSeconds;
        }
    }

    // تغيير مستوى الصوت
    setVolume(volume) {
        if (this.audioElement) {
            this.audioElement.volume = Math.max(0, Math.min(1, volume));
        }
    }

    // تغيير السرعة
    setPlaybackRate(rate) {
        if (this.audioElement) {
            this.audioElement.playbackRate = Math.max(0.5, Math.min(2, rate));
        }
    }

    // الحصول على رابط التلاوة
    getAudioUrl(surahNumber, reciter) {
        const reciterInfo = recitersData[reciter];
        if (!reciterInfo) return null;

        // تنسيق رقم السورة (001, 002, ...)
        const formattedSurahNumber = surahNumber.toString().padStart(3, '0');
        return `${reciterInfo.audioBaseUrl}${formattedSurahNumber}.mp3`;
    }

    // بدء التصور البصري للموجات
    startVisualization() {
        if (!this.analyser) return;

        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const drawWaveform = () => {
            if (!this.isPlaying) return;

            requestAnimationFrame(drawWaveform);
            this.analyser.getByteFrequencyData(dataArray);
            this.updateWaveBars(dataArray);
            this.updateProgress();
        };

        drawWaveform();
    }

    // تحديث أشرطة الموجات
    updateWaveBars(dataArray) {
        const waveContainer = document.getElementById('waveContainer');
        if (!waveContainer) return;

        // إنشاء الأشرطة إذا لم تكن موجودة
        if (waveContainer.children.length === 0) {
            this.createWaveBars();
        }

        const bars = waveContainer.children;
        for (let i = 0; i < bars.length; i++) {
            const bar = bars[i];
            const value = dataArray[i] || 0;
            const height = Math.max(5, (value / 255) * 100);
            
            bar.style.height = `${height}%`;
            bar.style.background = this.getGradientColor(value);
        }
    }

    // إنشاء أشرطة الموجات
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

    // الحصول على لون التدرج حسب شدة الصوت
    getGradientColor(value) {
        const intensity = value / 255;
        
        if (intensity < 0.3) {
            return 'linear-gradient(to top, #0b6b4a, #0d8c5f)';
        } else if (intensity < 0.6) {
            return 'linear-gradient(to top, #d4af37, #f7ef8a)';
        } else {
            return 'linear-gradient(to top, #ff6b6b, #ff8e8e)';
        }
    }

    // إيقاف التصور البصري
    stopVisualization() {
        const waveContainer = document.getElementById('waveContainer');
        if (waveContainer) {
            const bars = waveContainer.children;
            for (let bar of bars) {
                bar.style.height = '5%';
                bar.style.background = 'linear-gradient(to top, #0b6b4a, #0d8c5f)';
            }
        }
    }

    // تحديث شريط التقدم
    updateProgress() {
        if (!this.audioElement) return;

        const progressBar = document.querySelector('.progress-bar');
        const currentTimeEl = document.querySelector('.current-time');
        const durationEl = document.querySelector('.duration');

        if (progressBar) {
            const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100 || 0;
            progressBar.style.width = `${progress}%`;
        }

        if (currentTimeEl) {
            currentTimeEl.textContent = this.formatTime(this.audioElement.currentTime);
        }

        if (durationEl && this.audioElement.duration) {
            durationEl.textContent = this.formatTime(this.audioElement.duration);
        }
    }

    // تنسيق الوقت (ثواني إلى دقائق:ثواني)
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // تحديث زر التشغيل/الإيقاف
    updatePlayButton() {
        const playButton = document.querySelector('.play-pause-btn');
        if (playButton) {
            const icon = playButton.querySelector('i');
            if (icon) {
                icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
            }
        }
    }

    // إظهار حالة التحميل
    showLoadingState() {
        const playButton = document.querySelector('.play-pause-btn');
        if (playButton) {
            const icon = playButton.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-spinner fa-spin';
            }
            playButton.disabled = true;
        }
    }

    // إخفاء حالة التحميل
    hideLoadingState() {
        const playButton = document.querySelector('.play-pause-btn');
        if (playButton) {
            playButton.disabled = false;
            this.updatePlayButton();
        }
    }

    // معالجة الأحداث
    onAudioLoaded() {
        console.log("✅ التلاوة محملة وجاهزة");
        this.hideLoadingState();
        this.updateProgress();
    }

    onAudioPlay() {
        this.isPlaying = true;
        this.updatePlayButton();
        this.startVisualization();
    }

    onAudioPause() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopVisualization();
    }

    onAudioEnded() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopVisualization();
        this.audioElement.currentTime = 0;
        
        // إشعار انتهاء التلاوة
        this.showCompletionMessage();
    }

    onTimeUpdate() {
        this.updateProgress();
        
        // تسليط الضوء على الآية الحالية (بناء على الوقت)
        this.highlightCurrentAyah();
    }

    onAudioError(event) {
        console.error("❌ خطأ في الصوت:", event);
        this.hideLoadingState();
        this.showAudioError();
    }

    // تسليط الضوء على الآية الحالية
    highlightCurrentAyah() {
        if (!this.audioElement) return;

        const currentTime = this.audioElement.currentTime;
        const duration = this.audioElement.duration;
        
        // هذه دالة افتراضية - تحتاج لتكامل مع توقيتات الآيات
        const estimatedAyah = Math.floor((currentTime / duration) * 10) + 1;
        
        document.querySelectorAll('.verse').forEach(verse => {
            verse.classList.remove('active');
        });

        const currentVerse = document.getElementById(`verse-${estimatedAyah}`);
        if (currentVerse) {
            currentVerse.classList.add('active');
            
            // تمرير سلسل للآية الحالية
            if (this.isPlaying) {
                currentVerse.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }

    // معالجة أخطاء التشغيل
    handlePlayError(error) {
        this.hideLoadingState();
        
        let message = "تعذر تشغيل التلاوة";
        
        if (error.name === 'NotAllowedError') {
            message = "يجب السماح بتشغيل الصوت في المتصفح";
        } else if (error.name === 'NotSupportedError') {
            message = "التلاوة غير مدعومة في هذا المتصفح";
        } else if (error.message.includes('network')) {
            message = "خطأ في الشبكة. تحقق من اتصال الإنترنت";
        }
        
        this.showErrorModal(message);
    }

    // إظهار رسالة الخطأ
    showErrorModal(message) {
        // إنشاء نموذج خطأ
        const modal = document.createElement('div');
        modal.className = 'error-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>⚠️ خطأ في التشغيل</h3>
                <p>${message}</p>
                <button onclick="this.closest('.error-modal').remove()">حسناً</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // إظهار رسالة انتهاء التلاوة
    showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message floating';
        message.innerHTML = `
            <div class="message-content">
                <i class="fas fa-check-circle"></i>
                <p>تمت التلاوة بنجاح</p>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // إزالة الرسالة بعد 3 ثوان
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    // إظهار خطأ الصوت
    showAudioError() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'audio-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-volume-mute"></i>
                <h4>نظام الصوت غير متاح</h4>
                <p>قد يكون المتصفح لا يدعم تشغيل الصوت أو هناك مشكلة في الإذن</p>
                <button onclick="location.reload()">إعادة المحاولة</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }

    // تنظيف الموارد
    destroy() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        this.stopVisualization();
    }
}

// إنشاء نسخة عالمية من نظام الصوت
window.audioSystem = new QuranAudioSystem();

// وظائف مساعدة للتحكم في الصوت
window.QuranAudio = {
    play: (surah, reciter) => audioSystem.playRecitation(surah, reciter),
    pause: () => audioSystem.pauseRecitation(),
    resume: () => audioSystem.resumeRecitation(),
    restart: () => audioSystem.restartRecitation(),
    setVolume: (volume) => audioSystem.setVolume(volume),
    setSpeed: (speed) => audioSystem.setPlaybackRate(speed),
    seek: (time) => audioSystem.seekTo(time)
};

console.log("✅ نظام التلاوات المتقدم جاهز للاستخدام!");

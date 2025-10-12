// نظام الصوت المبسط - زاد المؤمن
console.log('🎵 تحميل نظام الصوت...');

class SimpleAudioSystem {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
    }

    playSurah(surahNumber, reciter = 'alafasy') {
        console.log(`تشغيل سورة ${surahNumber} بـ ${reciter}`);
        
        // رسالة توضيحية بدلاً من التشغيل الفعلي
        alert(`🎵 سيتم تشغيل سورة ${this.getSurahName(surahNumber)} بقارئ ${reciter}\n\nخاصية التشغيل الكاملة قيد التطوير`);
        
        return true;
    }

    getSurahName(number) {
        const surahs = {
            1: 'الفاتحة', 2: 'البقرة', 112: 'الإخلاص', 
            113: 'الفلق', 114: 'الناس'
        };
        return surahs[number] || `سورة ${number}`;
    }

    pause() {
        console.log('إيقاف الصوت');
        this.isPlaying = false;
    }

    stop() {
        console.log('إيقاف الصوت');
        this.isPlaying = false;
    }
}

// إنشاء النظام
window.audioSystem = new SimpleAudioSystem();
console.log('✅ نظام الصوت جاهز');

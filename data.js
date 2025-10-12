// بيانات القرآن - زاد المؤمن
console.log('📖 تحميل بيانات القرآن...');

const quranData = {
    surahs: [
        {
            number: 1,
            name: "الفاتحة",
            englishName: "Al-Fatiha",
            englishNameTranslation: "The Opening",
            numberOfAyahs: 7,
            revelationType: "Meccan",
            ayahs: [
                { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 1 },
                { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", numberInSurah: 2 },
                { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 3 },
                { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", numberInSurah: 4 },
                { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", numberInSurah: 5 },
                { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", numberInSurah: 6 },
                { number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", numberInSurah: 7 }
            ]
        },
        {
            number: 2,
            name: "البقرة",
            englishName: "Al-Baqara",
            englishNameTranslation: "The Cow",
            numberOfAyahs: 286,
            revelationType: "Medinan",
            ayahs: [
                { number: 8, text: "الم", numberInSurah: 1 },
                { number: 9, text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", numberInSurah: 2 }
            ]
        },
        {
            number: 112,
            name: "الإخلاص",
            englishName: "Al-Ikhlas",
            englishNameTranslation: "The Purity",
            numberOfAyahs: 4,
            revelationType: "Meccan",
            ayahs: [
                { number: 6222, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", numberInSurah: 1 },
                { number: 6223, text: "اللَّهُ الصَّمَدُ", numberInSurah: 2 },
                { number: 6224, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", numberInSurah: 3 },
                { number: 6225, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", numberInSurah: 4 }
            ]
        },
        {
            number: 113,
            name: "الفلق",
            englishName: "Al-Falaq",
            englishNameTranslation: "The Dawn",
            numberOfAyahs: 5,
            revelationType: "Meccan",
            ayahs: [
                { number: 6226, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", numberInSurah: 1 },
                { number: 6227, text: "مِن شَرِّ مَا خَلَقَ", numberInSurah: 2 },
                { number: 6228, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", numberInSurah: 3 },
                { number: 6229, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", numberInSurah: 4 },
                { number: 6230, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", numberInSurah: 5 }
            ]
        },
        {
            number: 114,
            name: "الناس",
            englishName: "An-Nas",
            englishNameTranslation: "Mankind",
            numberOfAyahs: 6,
            revelationType: "Meccan",
            ayahs: [
                { number: 6231, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", numberInSurah: 1 },
                { number: 6232, text: "مَلِكِ النَّاسِ", numberInSurah: 2 },
                { number: 6233, text: "إِلَٰهِ النَّاسِ", numberInSurah: 3 },
                { number: 6234, text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", numberInSurah: 4 },
                { number: 6235, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", numberInSurah: 5 },
                { number: 6236, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", numberInSurah: 6 }
            ]
        }
    ]
};

// بيانات القراء
const recitersData = {
    alafasy: { name: "مشاري العفاسي" },
    sudais: { name: "عبدالرحمن السديس" }
};

console.log('✅ تم تحميل بيانات القرآن بنجاح');
window.quranData = quranData;
window.recitersData = recitersData;

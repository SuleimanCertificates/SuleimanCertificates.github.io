# SuleimanCertificates — Rəsmi Vitrin Portfeli

[![GitHub Pages](https://img.shields.io/badge/Live%20Website-suleimancertificates.github.io-2ea44f?style=flat&logo=googlechrome)](https://suleimancertificates.github.io/)
[![Organization](https://img.shields.io/badge/GitHub%20Org-SuleimanCertificates-181717?style=flat&logo=github)](https://github.com/SuleimanCertificates)
[![Data Vault](https://img.shields.io/badge/Data%20Vault-SuleimanCertificates-blue?style=flat&logo=databricks)](https://github.com/SuleimanCertificates/SuleimanCertificates)
[![Total Certificates](https://img.shields.io/badge/Certificates-34%20Verified-0070f3?style=flat&logo=codewars)](https://suleimancertificates.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](LICENSE)

Bu veb layihə [SuleimanCertificates](https://github.com/SuleimanCertificates) təşkilatının rəsmi GitHub Pages platformasıdır. Portal Süleyman Hacızadənin Süni İntellekt, Bioinformatika, Kompüter Elmləri, Məlumat Analitikası və Sahibkarlıq sahələrində əldə etdiyi 34 rəsmi beynəlxalq sertifikatını yüksək performanslı, axtarış sistemlərinə tam uyğunlaşdırılmış və interaktiv vitrin formatında nümayiş etdirir.

Veb sayt: [https://suleimancertificates.github.io/](https://suleimancertificates.github.io/)

---

## Əsas Xüsusiyyətlər və Texniki İcazələr

- **Bento Grid və Compact List Baxış Rejimləri**:
  - CSS Grid və müasir tərtibat əsasında dinamik kart düzülüşü
  - Sürətli təhlil üçün yığcam cədvəl/siyahı rejimi

- **Qaranlıq və İşıqlı Mövzu (Dark / Light Theme)**:
  - Əməliyyat sisteminin parametrini (`prefers-color-scheme`) avtomatik tətbiq edir
  - İstifadəçinin seçimini yaddaşda saxlayır

- **Canlı Axtarış və Klaviatura Naviqasiyası (Ctrl+K / Cmd+K)**:
  - Başlıqlar, təşkilatlar, texniki etiketlər və sertifikat identifikasiya nömrələri üzrə real-vaxt axtarış
  - Klaviatura qısayolu ilə sürətli naviqasiya

- **Sahələr üzrə İxtisaslaşma Kateqoriyaları**:
  - Süni İntellekt & ML (6 sertifikat)
  - Bioinformatika & Səhiyyə (8 sertifikat)
  - Kompüter Elmləri & İT (5 sertifikat)
  - Məlumat Elmləri & Riyaziyyat (3 sertifikat)
  - Startap, Hakaton & Biznes (7 sertifikat)
  - Fəxri Nailiyyətlər & İctimai Fəaliyyət (5 sertifikat)

- **Doğma Lightbox Dialoqu (HTML5 Dialog)**:
  - Standart HTML5 `<dialog>` elementi əsasında modal pəncərə
  - Şəkilləri böyütmə/kiçiltmə (Zoom), tam ekran (Fullscreen) və klaviatura ilə idarəetmə

- **Dərin Keçidlər və Sənəd Doğrulama**:
  - Hər bir sertifikat üçün xüsusi URL ünvanı və müstəqil statik səhifə (SSG)
  - Sertifikat nömrəsini (Credential ID) bir kliklə buferə kopyalama
  - Rəsmi PDF sənədlərini birbaşa nəzərdən keçirmə və yükləmə imkanı

- **Performans və Core Web Vitals (CWV)**:
  - Ekranın yuxarı hissəsindəki (above-the-fold) şəkillər üçün `fetchpriority="high"` prioriteti
  - Digər resurslar üçün doğma təxirəsalınmış yükləmə (`loading="lazy"`)
  - Axtarış sistemləri üçün Schema.org JSON-LD, XML Sitemap və RSS 2.0 / Atom yayımı

---

## Layihə Strukturu

```plaintext
SuleimanCertificates.github.io/
├── index.html       # Əsas vitrin səhifəsi və axtarış motoru metadatası
├── styles.css       # Müasir dizayn sistemi və mövzu dəyişənləri
├── app.js          # İnteraktiv müştəri məntiqi (Axtarış, filtrləmə, modal pəncərə)
├── data.js         # 34 sertifikatın strukturlaşdırılmış məlumat bazası (ES Module)
├── categories/     # Sahələr üzrə 6 fərdi indeks səhifəsi
├── certificates/   # Hər sertifikat üçün 34 fərdi statik URL səhifəsi
├── sitemap.xml     # Google Image dəstəkli 41 URL-lik axtarış xəritəsi
├── robots.txt      # Axtarış botları üçün icazə qaydaları
├── feed.xml        # RSS 2.0 / Atom yayım axını
├── site.webmanifest# PWA tətbiq manifesti
├── favicon.svg     # Vektor loqo
├── *.jpg / *.png   # Sertifikatların yüksək keyfiyyətli vizual təsvirləri
├── *.pdf           # Orijinal rəsmi sertifikat sənədləri
├── .nojekyll       # GitHub Pages-in Jekyll emalından yayınması üçün
├── LICENSE         # MIT Lisenziyası
└── README.md       # Bu sənəd
```

---

## Yerli İşəsalma

```bash
cd SuleimanCertificates.github.io
python3 -m http.server 8000
```

Brauzerdə açın: `http://localhost:8000`

---

## Əlaqəli Resurslar

- **Təşkilat**: [https://github.com/SuleimanCertificates](https://github.com/SuleimanCertificates)
- **Data Vault & Backend API**: [https://github.com/SuleimanCertificates/SuleimanCertificates](https://github.com/SuleimanCertificates/SuleimanCertificates)
- **Müəllif**: [Süleyman Hacızadə (Suleiman Hajizadeh)](https://github.com/SuleimanHajizadeh)

---

## Lisenziya

Bu layihə [MIT Lisenziyası](LICENSE) altında təqdim olunur.

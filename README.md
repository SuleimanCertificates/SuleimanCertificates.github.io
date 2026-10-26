# 🎓 SuleimanCertificates — Rəsmi Vitrin Portfeli (Official Showcase)

[![GitHub Pages](https://img.shields.io/badge/Live%20Website-suleimancertificates.github.io-2ea44f?style=for-the-badge&logo=googlechrome)](https://suleimancertificates.github.io/)
[![Organization](https://img.shields.io/badge/GitHub%20Org-SuleimanCertificates-181717?style=for-the-badge&logo=github)](https://github.com/SuleimanCertificates)
[![Data Vault](https://img.shields.io/badge/Data%20Vault-SuleimanCertificates-blue?style=for-the-badge&logo=databricks)](https://github.com/SuleimanCertificates/SuleimanCertificates)
[![Total Certificates](https://img.shields.io/badge/Sertifikatlar-32%20Ədəd-0070f3?style=for-the-badge&logo=codewars)](https://suleimancertificates.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> Bu veb sayt **[SuleimanCertificates](https://github.com/SuleimanCertificates)** təşkilatının rəsmi GitHub Pages platformasıdır (`https://suleimancertificates.github.io/`). Sayt **Süleyman Hacızadə**nin Süni İntellekt (AI), Bioinformatika, Kompüter Elmləri, Məlumat Analitikası və Sahibkarlıq sahələrində qazandığı **32 rəsmi beynəlxalq sertifikatını** yüksək performanslı, interaktiv və estetik vitrin formatında nümayiş etdirir.

🌐 **Canlı Veb Sayt**: [https://suleimancertificates.github.io/](https://suleimancertificates.github.io/)

---

## 🌟 Əsas Xüsusiyyətlər və Texnologiyalar

- **📱 Bento Grid & Compact List Rejimləri**:
  - CSS Subgrid və Flexbox əsasında dinamik və vizual Bento Grid kart düzülüşü.
  - Sürətli təhlil üçün yığcam Siyahı (Compact List) rejimi.

- **🌓 Qaranlıq və İşıqlı Mövzu (Dark / Light Mode)**:
  - Əməliyyat sisteminin parametrini (`prefers-color-scheme`) avtomatik aşkar edir.
  - İstifadəçinin seçimini `localStorage`-də saxlayır.

- **⚡ Real-vaxt Canlı Axtarış və Qaynar Düymə (`⌘K` / `Ctrl+K`)**:
  - Başlıqlar, verən təşkilatlar, açar sözlər (teqlər) və sertifikat nömrələri üzrə real-vaxt debounced axtarışı.
  - Klaviatura qaynar düyməsi vasitəsilə sürətli fokuslanma.

- **🏷️ Sahələr üzrə Kateqoriyalar və Canlı Sayğaclar**:
  - 🤖 *Süni İntellekt & ML* (6 sertifikat)
  - 🧬 *Bioinformatika & Səhiyyə* (8 sertifikat)
  - 💻 *Kompüter Elmləri & İT* (5 sertifikat)
  - 📊 *Məlumat Elmləri & Riyaziyyat* (3 sertifikat)
  - 🚀 *Startap, Hakaton & Biznes* (6 sertifikat)
  - 🏅 *Fəxri Nailiyyətlər & Digər* (4 sertifikat)

- **🔍 Doğma Lightbox Modal (`<dialog closedby="any">`)**:
  - Ən son Veb Standartlarına uyğun HTML5 `<dialog closedby="any">` elementi.
  - Arxa fona kliklə bağlama (Light-dismiss dəstəyi və brauzer uyğunluq qoruması).
  - Şəkilləri böyütmə / kiçiltmə (Zoom `+`, `-`, `0`).
  - Tam ekran (Fullscreen) və klaviatura ilə idarəetmə (`←`, `→`, `Esc`).

- **🔗 Dərin Keçidlər (Deep Linking) & 1-Kliklə Kopyalama**:
  - Hər sertifikatın xüsusi URL haşı (`#cert-id`) mövcuddur; birbaşa həmin sertifikatı açır.
  - Sertifikat nömrəsini (Credential ID) bir kliklə buferə kopyalama və dinamik bildiriş (Toast).
  - Yüksək keyfiyyətli orijinal PDF sənədlərini yükləmə imkanı.

- **🚀 Core Web Vitals (CWV) Optimizasiyaları**:
  - Ekranın yuxarı hissəsindəki (above-the-fold) ilk 4 kartda LCP sürətləndirilməsi üçün `fetchpriority="high"`.
  - Digər bütün şəkillər üçün doğma təxirəsalınmış yükləmə (`loading="lazy"`).
  - Şüşə effekti (Glassmorphism), CSS Custom Properties və `@media print` stilləri.

---

## 🗂️ Layihə Strukturu

```plaintext
SuleimanCertificates.github.io/
├── index.html       # Semantik HTML5 əsas səhifə (SEO, Open Graph, Aria, Dialog)
├── styles.css       # Müasir dizayn sistemi (CSS variables, Grid, Dark/Light, Modal)
├── app.js          # İnteraktiv müştəri məntiqi (Axtarış, filtr, modal, hotkey-lər)
├── data.js         # 32 sertifikatın strukturlaşdırılmış tam metadata bazası (ES Module)
├── favicon.svg      # Vektor sertifikat və medal loqosu
├── *.jpg / *.png   # Sertifikatların yüksək keyfiyyətli vizual təsvirləri
├── *.pdf           # Orijinal rəsmi sertifikat sənədləri
├── .nojekyll       # GitHub Pages-in Jekyll emalından yayınması üçün
├── LICENSE         # MIT Lisenziyası
└── README.md       # Bu sənəd
```

---

## 💻 Yerli İnkişaf (Local Development)

```bash
cd SuleimanCertificates.github.io
python3 -m http.server 8000
```
Brauzerdə açın: `http://localhost:8000`

---

## 🏛️ Əlaqəli Resurslar

- **Təşkilat (Organization)**: [https://github.com/SuleimanCertificates](https://github.com/SuleimanCertificates)
- **Data Vault & Backend API**: [https://github.com/SuleimanCertificates/SuleimanCertificates](https://github.com/SuleimanCertificates/SuleimanCertificates)
- **Müəllif**: [Süleyman Hacızadə (Suleiman Hajizadeh)](https://github.com/SuleimanHajizadeh)

---

## 📜 Lisenziya

Bu layihə [MIT Lisenziyası](LICENSE) altında təqdim olunur.

# Rekomendasi Halaman Mobile Home - Smart Parking System

## 📱 Overview
Dokumen ini berisi rekomendasi desain dan konten untuk halaman **Mobile Home** pada aplikasi Smart Parking System. Halaman ini adalah titik sentral interaksi user setelah login.

---

## 🎯 Tujuan Halaman Home

Halaman home harus memberikan:
1. **Quick Overview** - Status parkir user saat ini
2. **Quick Actions** - Akses cepat ke fitur utama
3. **Real-time Information** - Status slot parkir terkini
4. **Contextual Guidance** - Panduan berdasarkan kondisi user

---

## 📋 Komponen yang Direkomendasikan

### 1. **Header Section** ⭐ Priority: HIGH
**Konten:**
- **User Greeting** dengan foto profil atau avatar
  - Tampilkan nama user
  - Waktu: "Selamat Pagi/Siang/Sore" (dinamis)
- **Quick Stats**
  - Total parkir bulan ini
  - Poin/reward jika ada sistem gamifikasi
- **Notification Bell Icon**
  - Badge count untuk notifikasi belum dibaca

**Contoh Copy:**
```
🌅 Selamat Pagi, Budi!
🚗 Honda Civic AB 1234 CD
⭐ 250 Poin Parkir
```

**Manfaat:**
- Personalisasi pengalaman user
- Membangun engagement dengan greeting
- Quick access ke notifikasi penting

---

### 2. **Active Parking Status Card** ⭐ Priority: CRITICAL
**Tampilkan HANYA jika user sedang parkir aktif:**

**Konten:**
- Status sesi parkir saat ini
- Lokasi slot (Lantai, Zona, Nomor Slot)
- Timer durasi parkir (real-time)
- Estimasi biaya saat ini
- Visual indikator (progress bar/circle)

**Quick Actions:**
- **Tombol "Lihat Sesi"** → Navigate ke MobileSession.jsx
- **Tombol "Arahkan ke Kendaraan"** → Show navigation guide
- **Tombol "Akhiri Parkir"** → Proses check-out

**Contoh Layout:**
```
┌──────────────────────────────────┐
│ 🅿️ Parkir Aktif                  │
│                                   │
│ 📍 Lantai 2 - Zona A - Slot #23  │
│ ⏱️ 01:23:45                       │
│ 💰 Rp 8.000                       │
│                                   │
│ [Lihat Detail] [Akhiri Parkir]   │
└──────────────────────────────────┘
```

**Manfaat:**
- User langsung tahu status parkir mereka
- Akses cepat ke kontrol sesi aktif
- Transparansi biaya real-time

---

### 3. **Upcoming Booking Card** ⭐ Priority: HIGH
**Tampilkan jika user punya booking yang belum diaktifkan:**

**Konten:**
- Detail booking (Slot ID, waktu booking)
- Countdown timer ke batas waktu aktivasi (jika ada)
- Status "Menunggu Aktivasi"

**Quick Actions:**
- **Tombol "Aktivkan Sekarang"** → Langsung activate session
- **Tombol "Lihat Arah"** → Show navigation guide
- **Tombol "Batalkan Booking"** → Cancel booking

**Contoh Layout:**
```
┌──────────────────────────────────┐
│ 📌 Booking Menunggu Aktivasi     │
│                                   │
│ Slot #A-15 (Lantai 1)            │
│ Dipesan: 13:45                   │
│ ⏰ Aktivasi dalam: 15 menit       │
│                                   │
│ [Aktivkan] [Arah] [Batalkan]     │
└──────────────────────────────────┘
```

**Alert:**
- Jika booking hampir expired, tampilkan warning berwarna orange/red
- Notifikasi: "Segera aktivasi booking Anda!"

---

### 4. **Quick Action Buttons** ⭐ Priority: HIGH
**Grid 2x2 atau horizontal scroll untuk aksi cepat:**

**Actions:**
1. **🔍 Cari Slot** 
   - Quick filter: Available saja / Terdekat
   - Navigate ke section Available Slots
   
2. **📷 Scan QR/Barcode**
   - Direct camera untuk scan tiket parkir
   - Navigate ke /mobile/scan

3. **📜 Riwayat Parkir**
   - Lihat history transaksi
   - Navigate ke /mobile/history

4. **📊 Statistik Saya**
   - Total parkir, waktu rata-rata, pengeluaran
   - Navigate ke /mobile/profile atau dashboard statistik

**Contoh Layout:**
```
┌─────────────┬─────────────┐
│ 🔍 Cari     │ 📷 Scan     │
│   Slot      │   QR        │
├─────────────┼─────────────┤
│ 📜 Riwayat  │ 📊 Statistik│
│             │             │
└─────────────┴─────────────┘
```

---

### 5. **Parking Availability Summary** ⭐ Priority: MEDIUM
**Real-time status ketersediaan parkir:**

**Konten:**
- Total slot tersedia vs occupied
- Breakdown per lantai/zona (jika multi-level)
- Visual progress bar atau donut chart
- Filter cepat berdasarkan lokasi

**Contoh:**
```
🅿️ Status Parkir Real-time
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Tersedia:   45 slot
🚗 Terisi:     35 slot
🔧 Maintenance: 5 slot
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lantai 1:  ████████░░  20/25 ✅
Lantai 2:  ██████░░░░  15/25 ✅
Lantai 3:  ██░░░░░░░░   5/15 ⚠️
```

**Manfaat:**
- User bisa cek ketersediaan sebelum datang
- Mempercepat keputusan memilih lokasi
- Meningkatkan efisiensi parkir

---

### 6. **Slot Grid / List View** ⭐ Priority: HIGH
**Tampilan utama untuk memilih slot:**

**Opsi Tampilan:**
- **Grid View** - Card compact dengan visual slot
- **List View** - Detail lebih lengkap per slot
- **Map View** - Denah parkir interaktif (future enhancement)

**Filter & Sort:**
- Status: Available / All
- Lokasi: Lantai 1, 2, 3, dll
- Jarak: Terdekat dari entrance
- Tipe: Regular / Disabled / EV Charging

**Konten Per Slot Card:**
- Slot ID (A-01, B-15, dll)
- Lokasi (Lantai, Zona)
- Status badge (Available/Occupied/Maintenance)
- Jarak dari entrance
- Ikon tipe slot (♿ Disabled, ⚡ EV)
- Tombol "Book" (jika available)

**Contoh Card:**
```
┌──────────────────────┐
│  [A-01]      ✅      │
│  Lantai 1 - Zona A   │
│  📍 25m dari pintu   │
│  [  Book Sekarang ]  │
└──────────────────────┘
```

---

### 7. **Recommended Slots** ⭐ Priority: MEDIUM
**Smart recommendation berdasarkan AI/algoritma:**

**Kriteria:**
- **Most Convenient** - Terdekat dari entrance
- **Recommended for You** - Berdasarkan history user (sering parkir di zona tertentu)
- **Best Value** - Jika ada variasi harga
- **Quick Exit** - Dekat dengan exit untuk user yang terburu-buru

**Contoh:**
```
💡 Rekomendasi untuk Anda
┌─────────────────────────┐
│ ⭐ Slot B-08            │
│ • 15m dari pintu masuk  │
│ • Anda sering parkir    │
│   di zona ini           │
│ [Book Slot Ini]         │
└─────────────────────────┘
```

---

### 8. **Recent Activity / History Preview** ⭐ Priority: LOW
**Tampilkan 2-3 sesi parkir terakhir:**

**Konten:**
- Tanggal & waktu parkir
- Lokasi slot
- Durasi
- Total biaya

**Quick Action:**
- **Tombol "Lihat Semua"** → Navigate ke /mobile/history

**Contoh:**
```
📜 Aktivitas Terakhir

10 Mar - Slot A-12  (2j 15m)  Rp 15.000
09 Mar - Slot B-03  (1j 45m)  Rp 12.000

[Lihat Semua Riwayat]
```

---

### 9. **Promo/Announcement Banner** ⭐ Priority: LOW
**Opsional: Tampilkan promo atau pengumuman penting:**

**Konten:**
- Promo parkir (diskon, cashback)
- Pengumuman maintenance terjadwal
- Tips parkir aman
- Event khusus

**Contoh:**
```
┌────────────────────────────────┐
│ 🎉 Promo Hari Ini!             │
│ Parkir >3 jam, cashback 20%    │
│ Gunakan kode: PARK20           │
└────────────────────────────────┘
```

---

### 10. **Emergency Contact / Help Button** ⭐ Priority: MEDIUM
**Fixed/Floating action button:**

**Konten:**
- **Tombol "Butuh Bantuan?"**
  - Contact security
  - Report masalah (kendaraan terkunci, dll)
  - Emergency call

**Posisi:**
- Floating action button di bottom-right
- Atau di footer section

---

## 🎨 Layout Recommendation

### Layout Hierarchy (Top to Bottom):

```
┌─────────────────────────────────────┐
│  [Header: User Greeting + Stats]    │ ← Always visible
├─────────────────────────────────────┤
│  [Active Parking Status Card]       │ ← Conditional (jika ada sesi aktif)
├─────────────────────────────────────┤
│  [Upcoming Booking Card]             │ ← Conditional (jika ada booking)
├─────────────────────────────────────┤
│  [Quick Action Buttons - Grid 2x2]  │ ← Always visible
├─────────────────────────────────────┤
│  [Parking Availability Summary]     │ ← Always visible
├─────────────────────────────────────┤
│  [Recommended Slots]                 │ ← Optional
├─────────────────────────────────────┤
│  [Filter & Sort Controls]            │ ← Always visible
├─────────────────────────────────────┤
│  [Available Slots - Grid/List]       │ ← Main content (scrollable)
│  • Slot Card                         │
│  • Slot Card                         │
│  • Slot Card                         │
│  • ...                               │
├─────────────────────────────────────┤
│  [Recent Activity Preview]           │ ← Optional
├─────────────────────────────────────┤
│  [Promo Banner]                      │ ← Optional
└─────────────────────────────────────┘

  [🆘 Help FAB]  ← Floating (fixed position)
```

---

## 🔄 Dynamic Content Logic

### Skenario 1: User Tidak Punya Sesi/Booking Aktif
**Tampilkan:**
- Header
- Quick Actions
- Parkir Availability Summary
- Recommended Slots
- Available Slots Grid (PRIORITAS UTAMA)
- Recent Activity
- Promo Banner

**Focus:** Memudahkan user untuk booking slot baru

---

### Skenario 2: User Punya Booking (Belum Aktivasi)
**Tampilkan:**
- Header
- **Upcoming Booking Card** (HIGHLIGHT dengan warna mencolok)
- Quick Actions
- Available Slots (untuk ganti booking)

**Focus:** Mengingatkan user untuk aktivasi booking

---

### Skenario 3: User Sedang Parkir Aktif
**Tampilkan:**
- Header
- **Active Parking Status Card** (PRIORITAS TERTINGGI)
- Quick Actions (terbatas: Scan, History, Profile)
- Parking Availability Summary (untuk info saja)

**Focus:** Monitor sesi aktif, akses cepat ke kontrol parkir

---

### Skenario 4: Parkir Penuh / Maintenance
**Tampilkan:**
- Header
- **Alert Banner** "Parkir Penuh / Sedang Maintenance"
- Alternative options:
  - Waitlist notification
  - Nearby parking locations
  - Estimated availability time
- Recent Activity

---

## 🎯 Key Features untuk UX Terbaik

### 1. **Pull-to-Refresh**
- User bisa drag dari atas untuk refresh data real-time
- Animasi loading saat refresh

### 2. **Live Updates**
- WebSocket/polling untuk update status slot otomatis
- Status badge berubah real-time tanpa reload

### 3. **Smart Notifications**
- In-app toast notification saat:
  - Slot favorite tersedia
  - Booking hampir expired
  - Sesi parkir mencapai durasi tertentu

### 4. **Search & Filter**
- Quick search box untuk cari slot by ID/lokasi
- Filter multi-kriteria (lantai, status, tipe)
- Sort (terdekat, termurah, quick exit)

### 5. **Skeleton Loading**
- Tampilkan skeleton screen saat loading data
- Avoid blank screen atau loading spinner saja

### 6. **Error States**
- Graceful handling jika API error
- Retry button
- Offline mode message

---

## 📊 Metrics to Track

Untuk evaluasi halaman home:

1. **Engagement:**
   - Time on home page
   - Scroll depth
   - Button click rate (CTR) per action

2. **Conversion:**
   - Booking success rate dari home
   - Time to first booking
   - Slot selection accuracy

3. **User Flow:**
   - Most used quick actions
   - Filter/sort usage rate
   - Navigation patterns

---

## ✅ Implementation Priority

### Phase 1: Must-Have (MVP)
1. ✅ Header with user greeting
2. ✅ Active parking status card (jika ada sesi)
3. ✅ Upcoming booking card (jika ada booking)
4. ✅ Quick actions (minimal: Scan, Cari Slot, History)
5. ✅ Available slots grid/list
6. ✅ Basic filter (Available only)

### Phase 2: Should-Have
1. Parking availability summary dengan stats
2. Recommended slots (AI-based)
3. Advanced filter & sort
4. Recent activity preview
5. Pull-to-refresh
6. Skeleton loading

### Phase 3: Nice-to-Have
1. Promo/announcement banner
2. Map view untuk slot
3. Gamifikasi (poin, badges)
4. Waitlist system
5. Social features (share parking)

---

## 🎨 Design Guidelines

### Colors
- **Primary Action:** Biru (#007AFF) - Book, Activate
- **Success:** Hijau (#34C759) - Available, Completed
- **Warning:** Orange (#FF9500) - Booking expiring, Almost full
- **Danger:** Merah (#FF3B30) - Occupied, Error, Cancel
- **Neutral:** Abu-abu (#8E8E93) - Maintenance, Disabled

### Typography
- **Heading:** Bold, 18-24px
- **Body:** Regular, 14-16px
- **Caption:** 12px untuk meta info

### Spacing
- Section gap: 16-24px
- Card padding: 16px
- Button height: 44-48px (touch-friendly)

### Icons
- Consistent icon set (Feather Icons, Heroicons, dll)
- Icon + label untuk clarity

---

## 💡 Best Practices

1. **Mobile-First Design**
   - Thumb-friendly zones
   - Bottom navigation untuk aksi penting
   - Minimal text input

2. **Performance**
   - Lazy load images
   - Paginate slot list jika >50 items
   - Cache data untuk offline mode

3. **Accessibility**
   - High contrast ratio
   - Large touch targets (min 44x44px)
   - Screen reader support

4. **Progressive Disclosure**
   - Show essential info first
   - Detail di halaman terpisah
   - Collapse section untuk info sekunder

---

## 🔗 Navigation Flow

```
MobileHome.jsx
  ├── Book Slot ──────────→ MobileScan.jsx (Activate)
  ├── Active Session ─────→ MobileSession.jsx  
  ├── History ────────────→ MobileHistory.jsx
  ├── Profile ────────────→ MobileProfile.jsx
  └── Settings ───────────→ MobileSettings.jsx
```

---

## 📚 References

- Material Design Guidelines (Mobile)
- Apple Human Interface Guidelines
- Nielsen Norman Group - Mobile UX
- Parking App Best Practices (SpotHero, ParkMobile)

---

## 📝 Notes

- Prioritaskan clarity over complexity
- Setiap komponen harus punya purpose jelas
- Test dengan real user untuk feedback
- Iterasi based on analytics & user behavior

---

**Dibuat:** 12 Maret 2026  
**Untuk:** Smart Parking System - Mobile Home Page  
**Status:** Recommendation Document

---

## 🚀 Next Steps

1. Review rekomendasi ini dengan tim UX/Product
2. Create wireframe/mockup berdasarkan layout di atas
3. Prioritize features untuk sprint pertama
4. Implement MVP (Phase 1)
5. User testing & iterate
6. Roll out Phase 2 & 3 features

---

_Dokumen ini living document - update seiring development progress dan user feedback._

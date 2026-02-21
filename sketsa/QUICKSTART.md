# 🚀 Quick Start Guide - Smart Parking System

## Langkah Cepat Memulai

### 1. Jalankan Development Server

```bash
cd sketsa
npm run dev
```

Server akan berjalan di: `http://localhost:5173`

### 2. Akses Aplikasi

Buka browser dan akses `http://localhost:5173`

Anda akan melihat halaman **Role Selection** dengan 3 pilihan:

---

## 📱 Testing Flow Complete

### Flow 1: Normal Booking (Mobile User)

1. **Klik "Buka Mobile View"**
2. Di dropdown "Pilih User", pilih: **Ahmad Yusuf - B 1234 XYZ**
3. Scroll ke bawah, lihat **Slot Tersedia**
4. **Klik salah satu slot hijau** (misalnya A1) → Slot akan berubah kuning (BOOKED)
5. Muncul card "Booking Saya" di atas
6. **Klik tombol "Aktifkan"** → Redirect ke halaman Session
7. Lihat detail sesi aktif (Slot, User, Kendaraan)
8. **Klik "Selesaikan Parking"** → Sesi selesai, kembali ke home

**Result:** ✅ Normal flow booking berhasil

---

### Flow 2: Simulasi Intrusion (Critical!)

**Buka 2 tab browser:**
- Tab 1: Mobile User
- Tab 2: Admin Dashboard

**Di Tab 1 (Mobile):**
1. Pilih user: **Siti Nurhaliza - B 5678 ABC**
2. Book slot **B2** (klik slot hijau)
3. **JANGAN aktifkan** (biarkan status BOOKED)

**Di Tab 2 (Admin):**
1. Kembali ke home (`http://localhost:5173`)
2. Klik **"Buka Admin Panel"**
3. Klik tombol **"🚨 Simulate Intrusion"** (merah)
4. Lihat notifikasi muncul di kanan atas
5. Scroll ke bawah, lihat **slot B2 berkedip merah** (INTRUSION)
6. Banner merah muncul: "⚠️ PERHATIAN: 1 masalah kritis..."

**Di Tab 1 (Mobile):**
1. Refresh page
2. Lihat **banner merah berkedip**: "🚨 PERHATIAN: Intrusi terdeteksi..."

**Result:** ✅ Intrusion detection working!

---

### Flow 3: Ghost Swap Detection

**Persiapan:**
1. Mobile: Book slot **C1** → Aktivasi
2. Pastikan ada sesi aktif di C1

**Di Admin Dashboard:**
1. Klik **"🔄 Simulate Ghost Swap"** (kuning)
2. Sistem akan random pilih slot ACTIVE (C1)
3. Slot C1 berubah **merah** (OCCUPIED_UNAUTHORIZED)
4. Notifikasi: "🔄 GHOST SWAP terdeteksi..."

**Result:** ✅ Ghost swap detection working!

---

### Flow 4: Parkir Liar (Unauthorized Parking)

**Di Quick Access View:**
1. Home → **"Buka Quick Access"**
2. Lihat dashboard dengan statistics

**Di Admin (tab lain):**
1. Klik **"⚠️ Simulate Parkir Liar"** (merah)
2. Random slot available akan langsung **merah**

**Di Quick Access:**
1. Refresh
2. Lihat **banner kuning**: "⚠️ PARKIR LIAR: 1 slot"
3. Slot berubah merah dengan status "Parkir Liar"

**Result:** ✅ Unauthorized parking detection working!

---

### Flow 5: Maintenance Mode

**Di Admin Dashboard:**

**Set Maintenance:**
1. Dropdown "Pilih Slot" → Pilih **D1**
2. (Optional) Isi "Alasan Maintenance": `Sensor rusak`
3. Klik **"🔧 Set Maintenance"**
4. Slot D1 berubah **abu-abu**

**Test di Mobile:**
1. Buka Mobile view
2. Slot D1 tampil abu-abu, **tidak bisa diklik** (disabled)

**Clear Maintenance:**
1. Kembali ke Admin
2. Pilih slot **D1** lagi
3. Klik **"✅ Clear Maintenance"**
4. Slot D1 kembali **hijau** (AVAILABLE)

**Result:** ✅ Maintenance mode working!

---

### Flow 6: Force Complete (Admin Override)

**Persiapan:**
1. Mobile: Book slot A3 → Activate (ACTIVE)

**Di Admin:**
1. Dropdown "Pilih Slot" → **A3**
2. Info muncul: "Slot dipilih: A3 - ACTIVE"
3. Klik **"⚡ Force Complete"** (merah)
4. Konfirmasi popup → Klik OK
5. Slot A3 langsung **hijau** (AVAILABLE)

**Result:** ✅ Force complete working!

---

### Flow 7: Clear Unauthorized

**Persiapan:**
1. Simulate parkir liar atau intrusion (slot merah)

**Di Admin:**
1. Pilih slot yang merah (OCCUPIED_UNAUTHORIZED atau INTRUSION)
2. Klik **"🧹 Clear Unauthorized"**
3. Slot kembali normal:
   - Jika dari OCCUPIED_UNAUTHORIZED → AVAILABLE
   - Jika dari INTRUSION → BOOKED

**Result:** ✅ Clear unauthorized working!

---

## 🎨 Visual Testing Matrix

| Status | Warna | Test |
|--------|-------|------|
| AVAILABLE | Hijau | Book slot → Hijau → Kuning |
| BOOKED | Kuning | Setelah booking, before activate |
| ACTIVE | Biru | Setelah activate |
| INTRUSION | Merah Berkedip | Simulate intrusion |
| OCCUPIED_UNAUTHORIZED | Merah | Simulate parkir liar / ghost swap |
| MAINTENANCE | Abu-abu | Set maintenance |
| COMPLETED | Ungu → Hijau | Complete parking (auto 2s) |

---

## 📊 Dashboard Statistics Testing

### Quick Access Dashboard

**Check:**
- [ ] Stat card "Tersedia" update saat book
- [ ] Stat card "Terisi" naik saat activate
- [ ] Occupancy bar bergerak sesuai persentase
- [ ] Banner alert muncul saat intrusion/parkir liar
- [ ] Legend warna sesuai

### Admin Dashboard

**Check:**
- [ ] 6 stat cards update real-time
- [ ] Critical alert banner muncul saat ada intrusion
- [ ] Control panel buttons working
- [ ] Slot grid update real-time
- [ ] Notifikasi di kanan atas muncul & hilang otomatis (5s)

---

## 🔄 Real-time Notifications Testing

**Test auto-notification:**
1. Lakukan action apapun (book, intrusion, etc)
2. **Notifikasi muncul** di kanan atas
3. Tunggu **5 detik** → Notifikasi hilang otomatis

**Check:**
- [ ] Notification muncul dengan slide animation
- [ ] Color sesuai type (success=hijau, error=merah, warning=kuning, info=biru)
- [ ] Auto-dismiss setelah 5s

---

## 🎯 Multi-User Simulation

**Test concurrent users:**

**Tab 1: User Ahmad**
- Book slot A1

**Tab 2: User Siti**
- Book slot A2

**Tab 3: User Budi**
- Book slot A3

**Tab 4: Admin**
- Monitor semua booking real-time
- Simulate events untuk test conflict

**Result:** Semua user independent, state management solid!

---

## ⚡ Performance Testing

**Test:**
1. Book 5 slot secara cepat
2. Simulate 3 intrusion berturut-turut
3. Force complete semua
4. Check console → **No errors**
5. Check re-renders → **Efficient**

---

## 🐛 Known Behaviors (Bukan Bug!)

1. **Refresh = state hilang** → By design, tidak ada backend
2. **Notification max 5s** → Auto cleanup untuk UX
3. **Completed slot → 2s auto clear** → State machine rule
4. **Simulate event = random slot** → By design untuk demo
5. **Multiple notifications stack** → Multiple actions = multiple alerts

---

## 🎓 Code Quality Check

**Buka Developer Tools Console:**

```javascript
// Should see no errors
// Clean console = good state management
```

**Check:**
- [ ] No prop drilling warnings
- [ ] No useState in components (semua via Context)
- [ ] Clean state transitions
- [ ] Pure functions in state machine

---

## 📝 Tips & Tricks

### Reset State
- Refresh browser untuk reset semua ke initial state

### Multiple Simultaneous Events
- Buka 4 tabs: 3 mobile (different users) + 1 admin
- Test concurrent actions

### Visual Debugging
- Perhatikan animation untuk critical states:
  - Intrusion = blink merah
  - Alert banner = pulse
  - Status badge = smooth transition

### State Machine Validation
- Coba click disabled slot → Should not work
- Coba book slot maintenance → Should not work  
- Coba activate slot yang bukan milikmu → Context prevent invalid actions

---

## ✅ Final Checklist

Sebelum demo/presentasi:

- [ ] `npm run dev` success
- [ ] Home page tampil dengan 3 cards
- [ ] Mobile view booking flow working
- [ ] Quick Access dashboard tampil statistics
- [ ] Admin control panel semua button working
- [ ] Intrusion simulation working
- [ ] Ghost swap simulation working
- [ ] Notifications appearing & auto-dismiss
- [ ] No console errors
- [ ] Responsive di mobile/tablet/desktop

---

**Ready to demo! 🎉**

Jika ada issues, check:
1. Console errors
2. Network tab (should be empty, no backend calls)
3. React DevTools → Context state

**Good luck! 🚀**

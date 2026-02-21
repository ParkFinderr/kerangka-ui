# Smart Parking System - Frontend Preview UI

Project frontend React JS berbasis Vite untuk preview sistem Smart Parking dengan arsitektur scalable dan production-ready.

## 🎯 Fitur Utama

### 3 Role / Interface:
1. **Mobile User** - Booking, aktivasi sesi, monitoring real-time
2. **Web Quick Access** - Dashboard publik dengan status slot real-time
3. **Web Admin Dashboard** - Control panel untuk simulasi dan management

### Fitur State Management Kompleks:
- ✅ **Intrusion Detection** - Sensor occupied tanpa booking valid
- 🔄 **Ghost Swap Detection** - Kendaraan berbeda terdeteksi di slot aktif
- ⚠️ **Unauthorized Parking** - Parkir liar di slot available
- 🔧 **Maintenance Mode** - Set/clear maintenance untuk slot
- ⚡ **Force Complete** - Admin override untuk reset slot
- 📊 **Real-time Notifications** - Auto-notification system

## 🏗️ Arsitektur

### Production-Ready Structure:

```
src/
│
├── main.jsx                    # Entry point
├── App.jsx                     # Main app component
├── router.jsx                  # Route configuration
│
├── core/                       # Core business logic
│   ├── store/
│   │   ├── ParkingContext.jsx  # Global state provider
│   │   ├── useParkingStore.js  # Custom hook untuk akses state
│   │   └── parkingReducer.js   # Reducer dengan action types
│   │
│   ├── stateMachine/
│   │   └── slotStateMachine.js # Pure function state transitions
│   │
│   └── constants/
│       └── slotStatus.js       # Status constants & configs
│
├── features/                   # Feature-based modules
│   ├── mobile/
│   │   ├── pages/
│   │   │   ├── MobileHome.jsx
│   │   │   └── MobileSession.jsx
│   │   └── MobileLayout.jsx
│   │
│   ├── quickAccess/
│   │   ├── pages/
│   │   │   └── QuickDashboard.jsx
│   │   └── QuickLayout.jsx
│   │
│   └── admin/
│       ├── pages/
│       │   └── AdminDashboard.jsx
│       ├── components/
│       │   └── ControlPanel.jsx
│       └── AdminLayout.jsx
│
├── shared/                     # Shared components & hooks
│   ├── components/
│   │   ├── Button/
│   │   ├── SlotCard/
│   │   ├── SlotGrid/
│   │   ├── StatusBadge/
│   │   └── NotificationBanner/
│   │
│   └── hooks/
│       └── useRealtimeSimulation.js
│
├── mock/
│   └── dummySlots.js          # Dummy data generator
│
└── pages/
    └── HomePage.jsx            # Role selection page
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm atau yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Cara Menggunakan

### 1. Halaman Utama (Role Selection)
- Pilih role yang ingin diakses:
  - Mobile User
  - Quick Access
  - Admin Dashboard

### 2. Mobile User Interface
**Fitur:**
- Pilih user dari dropdown (simulasi multi-user)
- Lihat slot available
- Book slot dengan klik card
- Aktivasi sesi parking
- Complete parking session
- Notifikasi real-time untuk intrusion/issues

**Flow:**
1. Pilih user
2. Klik slot available → Booking
3. Klik "Aktifkan" → Sesi aktif
4. Klik "Selesaikan Parking" → Complete

### 3. Quick Access Interface
**Fitur:**
- Dashboard publik, read-only
- Real-time slot status
- Statistics (Tersedia, Terisi, Maintenance)
- Occupancy bar chart
- Alert untuk intrusion/parkir liar
- Legend status warna

**Use Case:**
Display di pintu masuk/area publik untuk info real-time

### 4. Admin Dashboard
**Fitur:**
- Comprehensive statistics
- Control Panel:
  - **Simulate Intrusion** - Random slot BOOKED → INTRUSION
  - **Simulate Ghost Swap** - Random slot ACTIVE → OCCUPIED_UNAUTHORIZED
  - **Simulate Parkir Liar** - Random slot AVAILABLE → OCCUPIED_UNAUTHORIZED
  - **Set Maintenance** - Set slot ke mode maintenance
  - **Clear Maintenance** - Kembalikan slot dari maintenance
  - **Force Complete** - Reset slot ke AVAILABLE
  - **Clear Unauthorized** - Clear parkir liar/intrusion
- Real-time monitoring semua slot
- Critical alerts banner

**Simulasi Event:**
1. **Intrusion**: Admin → "Simulate Intrusion" → Slot BOOKED akan detect intrusi
2. **Ghost Swap**: Buat sesi aktif dulu → "Simulate Ghost Swap" → Kendaraan berbeda terdeteksi
3. **Parkir Liar**: "Simulate Parkir Liar" → Slot available langsung terisi tanpa booking

## 🧠 State Management Details

### Context API + useReducer
- **Global State**: ParkingContext
- **All changes via dispatch**: No direct setState
- **Single source of truth**

### State Machine Rules
File: `core/stateMachine/slotStateMachine.js`

**Transition Matrix:**

```
AVAILABLE → BOOK → BOOKED
AVAILABLE → UNAUTHORIZED_OCCUPY → OCCUPIED_UNAUTHORIZED
AVAILABLE → SET_MAINTENANCE → MAINTENANCE

BOOKED → ACTIVATE → ACTIVE
BOOKED → SENSOR_OCCUPIED_WITHOUT_ARRIVE → INTRUSION
BOOKED → FORCE_COMPLETE → AVAILABLE

ACTIVE → COMPLETE → COMPLETED → (auto) → AVAILABLE
ACTIVE → GHOST_SWAP → OCCUPIED_UNAUTHORIZED
ACTIVE → FORCE_COMPLETE → AVAILABLE

OCCUPIED_UNAUTHORIZED → CLEAR_UNAUTHORIZED → AVAILABLE
INTRUSION → CLEAR_UNAUTHORIZED → BOOKED
MAINTENANCE → CLEAR_MAINTENANCE → AVAILABLE
```

### Action Types (Reducer)
```javascript
- SET_SLOTS
- BOOK_SLOT
- ACTIVATE_SESSION
- COMPLETE_SESSION
- FORCE_COMPLETE
- SET_MAINTENANCE
- CLEAR_MAINTENANCE
- INTRUSION_DETECTED
- UNAUTHORIZED_OCCUPIED
- GHOST_SWAP
- CLEAR_UNAUTHORIZED
- ADD_NOTIFICATION
- REMOVE_NOTIFICATION
```

## 🎨 Visual States

| Status | Warna | Animasi | Keterangan |
|--------|-------|---------|------------|
| AVAILABLE | Hijau 🟢 | - | Slot tersedia untuk booking |
| BOOKED | Kuning 🟡 | - | Slot dipesan, belum aktif |
| ACTIVE | Biru 🔵 | - | Sesi parking aktif |
| OCCUPIED_UNAUTHORIZED | Merah 🔴 | - | Parkir liar / ghost swap |
| INTRUSION | Merah Gelap 🔴 | Blink | Intrusi terdeteksi |
| MAINTENANCE | Abu-abu ⚫ | - | Dalam perbaikan |
| COMPLETED | Ungu 🟣 | Auto-clear 2s | Sesi selesai |

## 🔄 Realtime Simulation

Hook: `useRealtimeSimulation.js`

Optional auto-simulation (disabled by default):

```javascript
useRealtimeSimulation({
  enableIntrusionSimulation: true,  // Auto random intrusion
  enableGhostSwapSimulation: true,  // Auto random ghost swap
  enableUnauthorizedSimulation: true, // Auto random parkir liar
  simulationInterval: 15000,        // 15 seconds
});
```

**Enabled di:**
- Admin Dashboard (optional)

## 📦 Technology Stack

- **React** 19.2.0
- **Vite** 7.3.1
- **React Router** 6.x
- **Context API + useReducer** (State Management)
- **Pure CSS** (No framework, custom styling)

## 🏆 Best Practices Applied

### ✅ Code Quality
- ❌ **No prop drilling**: Global state via Context
- ✅ **Business logic separated**: State machine layer
- ✅ **Reusable components**: Shared components folder
- ✅ **Feature-based architecture**: Modular, scalable
- ✅ **No string literals**: Constants for status
- ✅ **Pure functions**: State machine functions
- ✅ **Type-safe actions**: Action type constants

### ✅ Performance
- Auto-cleanup notifications (5s)
- Auto-clear completed slots (2s)
- Efficient re-renders with Context

### ✅ UX
- Real-time visual feedback
- Color-coded status
- Animation for critical states
- Responsive design
- Toast notifications
- Clear CTAs

## 📱 Responsive Design

- **Mobile-first approach**
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## 🧪 Testing Scenarios

### Scenario 1: Normal Booking Flow
1. Mobile → Select user → Book slot → Activate → Complete

### Scenario 2: Intrusion Detection
1. Mobile → Book slot (jangan activate)
2. Admin → Pilih slot yang sama → "Simulate Intrusion"
3. Mobile → Lihat alert merah

### Scenario 3: Ghost Swap
1. Mobile → Book → Activate slot
2. Admin → "Simulate Ghost Swap" untuk slot yang sama
3. Status berubah → OCCUPIED_UNAUTHORIZED

### Scenario 4: Parkir Liar
1. Quick Access → Lihat slot available
2. Admin → "Simulate Parkir Liar"
3. Quick Access → Lihat slot merah + alert

### Scenario 5: Maintenance
1. Admin → Pilih slot → "Set Maintenance"
2. Mobile → Slot disabled, tidak bisa dibook
3. Quick Access → Slot abu-abu
4. Admin → "Clear Maintenance"

### Scenario 6: Force Complete
1. Buat sesi aktif/booked
2. Admin → Pilih slot → "Force Complete"
3. Slot langsung AVAILABLE

## 🎓 Learning Points

### State Management Pattern
- Context API for global state
- useReducer for complex state logic
- Custom hooks for reusability
- Separation of concerns

### State Machine Design
- Pure functions for transitions
- Validation of transitions
- Centralized business rules
- Testable logic

### Feature-Based Architecture
- Scalable folder structure
- Feature independence
- Shared component library
- Clear boundaries

## 🔧 Customization

### Menambah Slot
File: `mock/dummySlots.js`
```javascript
const slots = generateDummySlots(50); // Ubah jumlah
```

### Menambah Status Baru
1. Tambah di `core/constants/slotStatus.js`
2. Update state machine di `core/stateMachine/slotStateMachine.js`
3. Tambah action di `core/store/parkingReducer.js`

### Enable Auto-Simulation
File: `features/admin/pages/AdminDashboard.jsx`
```javascript
useRealtimeSimulation({
  enableIntrusionSimulation: true, // Aktifkan
  // ...
});
```

## 📝 Notes

- **Tidak ada backend**: Semua simulasi menggunakan state management
- **Data hilang saat refresh**: State tidak persisted
- **Production-ready structure**: Siap dikembangkan dengan backend real

## 🚧 Future Enhancements (Jika ada backend)

- [ ] WebSocket untuk real-time updates
- [ ] REST API integration
- [ ] Persistent state (database)
- [ ] Authentication & authorization
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Email/SMS notifications
- [ ] Historical data & reporting

## 📄 License

MIT License - Feel free to use for educational purposes

## 👨‍💻 Author

Created for Smart Parking System demonstration
React + Vite + Context API + State Machine Pattern

---

**Happy Coding! 🚀**


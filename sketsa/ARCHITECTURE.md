# 🏗️ Architecture Overview - Smart Parking System

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          BROWSER / CLIENT                                │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                        React App                                │    │
│  │                      (main.jsx → App.jsx)                       │    │
│  │                                                                  │    │
│  │  ┌──────────────────────────────────────────────────────────┐ │    │
│  │  │              ParkingContext Provider                      │ │    │
│  │  │         (Global State Management Layer)                   │ │    │
│  │  │                                                            │ │    │
│  │  │   State: {                                                 │ │    │
│  │  │     slots: [],                                             │ │    │
│  │  │     activeSession: null,                                   │ │    │
│  │  │     notifications: []                                      │ │    │
│  │  │   }                                                         │ │    │
│  │  │                                                            │ │    │
│  │  │   Dispatch Actions ──────────────────────────────────────┐│ │    │
│  │  └──────────────────────────────────────────────────────────┘│ │    │
│  │                                                                │ │    │
│  │  ┌──────────────────────────────────────────────────────────┐│ │    │
│  │  │                    Router Layer                           ││ │    │
│  │  │                  (React Router)                           ││ │    │
│  │  │                                                            ││ │    │
│  │  │   / ──────────────> HomePage (Role Selection)             ││ │    │
│  │  │   /mobile ────────> MobileLayout + MobileRoutes           ││ │    │
│  │  │   /quick ─────────> QuickLayout + QuickRoutes             ││ │    │
│  │  │   /admin ─────────> AdminLayout + AdminRoutes             ││ │    │
│  │  └──────────────────────────────────────────────────────────┘│ │    │
│  │                                                                │ │    │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐│ │    │
│  │  │  Mobile Feature  │  │ Quick Access     │  │   Admin     ││ │    │
│  │  │                  │  │   Feature        │  │  Feature    ││ │    │
│  │  │  - MobileHome    │  │ - QuickDashboard │  │ - Admin     ││ │    │
│  │  │  - MobileSession │  │ - Slot Grid      │  │   Dashboard ││ │    │
│  │  │  - Booking UI    │  │ - Statistics     │  │ - Control   ││ │    │
│  │  │  - Active Slot   │  │ - Real-time      │  │   Panel     ││ │    │
│  │  │    Display       │  │   Updates        │  │ - Simulation││ │    │
│  │  └────────┬─────────┘  └────────┬─────────┘  └──────┬──────┘│ │    │
│  │           │                     │                    │        │ │    │
│  │           └─────────────────────┼────────────────────┘        │ │    │
│  │                                 │                              │ │    │
│  │  ┌──────────────────────────────▼───────────────────────────┐│ │    │
│  │  │              Shared Components Layer                      ││ │    │
│  │  │                                                            ││ │    │
│  │  │   - Button         - StatusBadge                          ││ │    │
│  │  │   - SlotCard       - NotificationBanner                   ││ │    │
│  │  │   - SlotGrid       - (Reusable across features)           ││ │    │
│  │  └──────────────────────────────────────────────────────────┘│ │    │
│  │                                                                │ │    │
│  │  ┌──────────────────────────────────────────────────────────┐│ │    │
│  │  │                 Core Business Logic                       ││ │    │
│  │  │                                                            ││ │    │
│  │  │  ┌────────────────────────────────────────────────────┐  ││ │    │
│  │  │  │         State Machine (Pure Functions)             │  ││ │    │
│  │  │  │                                                     │  ││ │    │
│  │  │  │   getNextSlotState(currentState, eventType)        │  ││ │    │
│  │  │  │                                                     │  ││ │    │
│  │  │  │   AVAILABLE ──BOOK──> BOOKED                       │  ││ │    │
│  │  │  │   BOOKED ──ACTIVATE──> ACTIVE                      │  ││ │    │
│  │  │  │   BOOKED ──INTRUSION──> INTRUSION                  │  ││ │    │
│  │  │  │   ACTIVE ──GHOST_SWAP──> OCCUPIED_UNAUTHORIZED     │  ││ │    │
│  │  │  │   ACTIVE ──COMPLETE──> COMPLETED ──> AVAILABLE     │  ││ │    │
│  │  │  │   ANY ──MAINTENANCE──> MAINTENANCE                 │  ││ │    │
│  │  │  └────────────────────────────────────────────────────┘  ││ │    │
│  │  │                                                            ││ │    │
│  │  │  ┌────────────────────────────────────────────────────┐  ││ │    │
│  │  │  │              Reducer Layer                          │  ││ │    │
│  │  │  │                                                     │  ││ │    │
│  │  │  │   parkingReducer(state, action)                    │  ││ │    │
│  │  │  │                                                     │  ││ │    │
│  │  │  │   Actions:                                          │  ││ │    │
│  │  │  │   - BOOK_SLOT                                       │  ││ │    │
│  │  │  │   - ACTIVATE_SESSION                                │  ││ │    │
│  │  │  │   - COMPLETE_SESSION                                │  ││ │    │
│  │  │  │   - INTRUSION_DETECTED                              │  ││ │    │
│  │  │  │   - GHOST_SWAP                                      │  ││ │    │
│  │  │  │   - UNAUTHORIZED_OCCUPIED                           │  ││ │    │
│  │  │  │   - SET_MAINTENANCE                                 │  ││ │    │
│  │  │  │   - FORCE_COMPLETE                                  │  ││ │    │
│  │  │  │   - CLEAR_UNAUTHORIZED                              │  ││ │    │
│  │  │  └────────────────────────────────────────────────────┘  ││ │    │
│  │  │                                                            ││ │    │
│  │  │  ┌────────────────────────────────────────────────────┐  ││ │    │
│  │  │  │            Constants & Config                       │  ││ │    │
│  │  │  │                                                     │  ││ │    │
│  │  │  │   SLOT_STATUS = {                                   │  ││ │    │
│  │  │  │     AVAILABLE, BOOKED, ACTIVE,                     │  ││ │    │
│  │  │  │     OCCUPIED_UNAUTHORIZED, INTRUSION,              │  ││ │    │
│  │  │  │     MAINTENANCE, COMPLETED                         │  ││ │    │
│  │  │  │   }                                                 │  ││ │    │
│  │  │  │                                                     │  ││ │    │
│  │  │  │   STATUS_COLORS, STATUS_LABELS                     │  ││ │    │
│  │  │  └────────────────────────────────────────────────────┘  ││ │    │
│  │  └──────────────────────────────────────────────────────────┘│ │    │
│  │                                                                │ │    │
│  │  ┌──────────────────────────────────────────────────────────┐│ │    │
│  │  │                 Hooks Layer                               ││ │    │
│  │  │                                                            ││ │    │
│  │  │   - useParkingStore()   → Access global state            ││ │    │
│  │  │   - useRealtimeSimulation() → Auto event simulation      ││ │    │
│  │  └──────────────────────────────────────────────────────────┘│ │    │
│  │                                                                │ │    │
│  │  ┌──────────────────────────────────────────────────────────┐│ │    │
│  │  │                   Mock Data Layer                         ││ │    │
│  │  │                                                            ││ │    │
│  │  │   generateDummySlots(count) → Slot[]                     ││ │    │
│  │  │   DUMMY_USERS → User[]                                    ││ │    │
│  │  └──────────────────────────────────────────────────────────┘│ │    │
│  └──────────────────────────────────────────────────────────────┘ │    │
└───────────────────────────────────────────────────────────────────┘    │
```

## Data Flow Diagram

```
USER ACTION
    │
    ▼
┌────────────────────┐
│   UI Component     │  (Button click, form submit, etc.)
└─────────┬──────────┘
          │
          │ dispatch(action)
          ▼
┌────────────────────┐
│    Dispatcher      │  (Context API dispatch)
└─────────┬──────────┘
          │
          │ action + currentState
          ▼
┌────────────────────┐
│     Reducer        │  1. Receives action
│  (parkingReducer)  │  2. Calls State Machine
└─────────┬──────────┘  3. Creates new state
          │
          │ eventType
          ▼
┌────────────────────┐
│  State Machine     │  getNextSlotState()
│ (Pure Function)    │  → Returns next status
└─────────┬──────────┘
          │
          │ nextState
          ▼
┌────────────────────┐
│   New State        │  State updated in Context
└─────────┬──────────┘
          │
          │ Context re-renders consumers
          ▼
┌────────────────────┐
│  UI Update         │  Components refresh with new state
└────────────────────┘
```

## State Transition Flow

```
USER BOOKS SLOT:

1. Mobile User clicks SlotCard (A1)
   │
2. onClick → dispatch(BOOK_SLOT, { slotId: 'A1', userId, ... })
   │
3. Reducer receives BOOK_SLOT action
   │
4. Reducer calls: getNextSlotState('AVAILABLE', 'BOOK')
   │
5. State Machine returns: 'BOOKED'
   │
6. Reducer updates state:
   slots[A1].status = 'BOOKED'
   slots[A1].bookedBy = userId
   slots[A1].userName = name
   notifications.push({ message: 'Slot A1 booked' })
   │
7. Context broadcasts new state
   │
8. All components using useParkingStore() re-render
   │
9. SlotCard shows yellow color (BOOKED)
   SlotGrid updates
   NotificationBanner shows success toast
```

## Critical Event Flow: INTRUSION

```
INTRUSION DETECTION:

1. Slot B2 is BOOKED (user booked but hasn't arrived)
   │
2. Sensor detects car in B2 (simulated by Admin)
   │
3. Admin clicks "Simulate Intrusion"
   │
4. Randomly picks BOOKED slot → B2
   │
5. dispatch(INTRUSION_DETECTED, { slotId: 'B2' })
   │
6. Reducer → State Machine: getNextSlotState('BOOKED', 'SENSOR_OCCUPIED_WITHOUT_ARRIVE')
   │
7. State Machine returns: 'INTRUSION'
   │
8. Reducer updates:
   slots[B2].status = 'INTRUSION'
   slots[B2].intrusionDetectedAt = now()
   notifications.push({ type: 'error', message: '🚨 INTRUSI di B2!' })
   │
9. UI Updates:
   - SlotCard B2 → Red blinking
   - Admin Dashboard → Critical alert banner
   - Mobile → Alert banner (if user has booking)
   - Quick Access → Alert banner
   - Notification toast appears
   │
10. Auto-cleanup notification after 5 seconds
```

## Component Communication

```
┌─────────────────────────────────────────────────────────────┐
│                    No Direct Communication                   │
│              All via ParkingContext (Global State)           │
└─────────────────────────────────────────────────────────────┘

MobileHome Component:
  │
  ├─ useParkingStore() → Gets { state, dispatch }
  │
  ├─ Reads: state.slots, state.notifications
  │
  └─ Dispatches: BOOK_SLOT, ACTIVATE_SESSION

AdminDashboard Component:
  │
  ├─ useParkingStore() → Gets { state, dispatch }
  │
  ├─ Reads: state.slots, state.notifications
  │
  └─ Dispatches: INTRUSION_DETECTED, FORCE_COMPLETE, etc.

QuickDashboard Component:
  │
  ├─ useParkingStore() → Gets { state, dispatch }
  │
  ├─ Reads: state.slots (read-only)
  │
  └─ No dispatches (read-only view)

Result: ZERO prop drilling!
```

## File Dependencies

```
main.jsx
  └─ App.jsx
      └─ ParkingProvider (wraps entire app)
          └─ RouterProvider
              ├─ HomePage
              ├─ MobileLayout
              │   ├─ MobileHome
              │   │   ├─ useParkingStore()
              │   │   ├─ SlotGrid
              │   │   │   └─ SlotCard
              │   │   │       └─ StatusBadge
              │   │   └─ NotificationBanner
              │   └─ MobileSession
              │       ├─ useParkingStore()
              │       └─ StatusBadge
              │
              ├─ QuickLayout
              │   └─ QuickDashboard
              │       ├─ useParkingStore()
              │       ├─ SlotGrid
              │       └─ NotificationBanner
              │
              └─ AdminLayout
                  └─ AdminDashboard
                      ├─ useParkingStore()
                      ├─ useRealtimeSimulation()
                      ├─ ControlPanel
                      │   ├─ useParkingStore()
                      │   └─ Button
                      ├─ SlotGrid
                      └─ NotificationBanner
```

## Core Layer Isolation

```
┌──────────────────────────────────────────────────┐
│              Core Layer (Pure Logic)              │
│                                                   │
│  ✅ No React imports                             │
│  ✅ Pure functions only                          │
│  ✅ No side effects                              │
│  ✅ 100% testable                                │
│  ✅ No UI concerns                               │
│                                                   │
│  Files:                                           │
│  - slotStateMachine.js   (Pure functions)        │
│  - slotStatus.js         (Constants)             │
│  - parkingReducer.js     (Pure reducer)          │
│                                                   │
└──────────────────────────────────────────────────┘
         ▲
         │ imported by
         │
┌────────┴──────────────────────────────────────────┐
│         Store Layer (Context API)                  │
│                                                    │
│  - ParkingContext.jsx    (Provider)               │
│  - useParkingStore.js    (Hook)                   │
│                                                    │
└────────────────────────────────────────────────────┘
         ▲
         │ used by
         │
┌────────┴──────────────────────────────────────────┐
│         Feature Layer (UI Components)              │
│                                                    │
│  - Mobile Feature                                 │
│  - Quick Access Feature                           │
│  - Admin Feature                                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

## Scalability Points

### ✅ Easy to Add New Status
```javascript
// 1. Add to slotStatus.js
SLOT_STATUS.NEW_STATUS = 'NEW_STATUS';

// 2. Add transition in stateMachine.js
[SLOT_STATUS.ACTIVE]: {
  [EVENT_TYPES.NEW_EVENT]: SLOT_STATUS.NEW_STATUS
}

// 3. Add action in reducer.js
case ACTION_TYPES.NEW_ACTION: {
  // Handle new action
}

// 4. Add color in slotStatus.js
STATUS_COLORS[SLOT_STATUS.NEW_STATUS] = '#color';
```

### ✅ Easy to Add New Feature (Role)
```
features/
  └─ newRole/
      ├─ NewRoleLayout.jsx
      ├─ pages/
      │   └─ NewRolePage.jsx
      └─ components/
          └─ NewRoleComponent.jsx

+ Update router.jsx
```

### ✅ Easy to Add Backend Integration
```javascript
// In reducer, replace mock with API call
dispatch(BOOK_SLOT) → API.post('/slots/book')
```

## Performance Optimizations

```
1. Context Split (if needed):
   - SlotsContext (slots data)
   - NotificationsContext (notifications)
   - SessionContext (active session)

2. Memoization:
   - useMemo for filtered slots
   - useCallback for event handlers

3. Code Splitting:
   - React.lazy for feature modules
   - Suspense for loading states

4. State Updates:
   - Reducer ensures immutability
   - Only changed slices trigger re-renders
```

## Security Considerations (For Future Backend)

```
Current: LOCAL ONLY (No security needed)

With Backend:
  1. Authentication → JWT tokens
  2. Authorization → Role-based (mobile, admin)
  3. API Security → HTTPS, rate limiting
  4. Input Validation → Server-side validation
  5. Slot Locking → Prevent concurrent booking
  6. Audit Log → Track admin actions
```

---

**This architecture is:**
- ✅ Scalable
- ✅ Maintainable
- ✅ Testable
- ✅ Production-ready
- ✅ Easy to understand
- ✅ Easy to extend

**Perfect for demonstration and future development! 🚀**

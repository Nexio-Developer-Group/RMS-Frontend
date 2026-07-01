# RMS Frontend — Implementation Plan

> **Branch:** `claude/api-analysis-project-status-w4b0lp`  
> **Date:** July 1, 2026  
> **Phases:** 3 · **Frontend agents:** 7 (C, D, F, G, H, I, J)

---

## Current State

| View | Service File | Backend | Status |
|------|-------------|---------|--------|
| menu_management | ✓ 21 functions | ✓ built | Integrated — needs e2e verify |
| table_management | ✓ 6 functions | ✓ built | Integrated — needs e2e verify |
| staff_management | ✗ missing | ✓ 12 endpoints built | UI is 212-byte placeholder |
| pos/cart | Stub only | ✗ not built | Phase 1 backend then Phase 2 FE |
| orders | ✗ missing | ✗ not built | Phase 1 backend then Phase 2 FE |
| dashboard | — | Partially (stats from orders) | Uses mock data |
| expense_tracker | ✗ missing | ✗ not built | Phase 3 |
| customers | ✗ missing | ✗ not built | Phase 3 |

---

## Phase 1 — Frontend Agents (Parallel)

### Agent C: API Verification & Fixes

**Goal:** Confirm all existing service functions work against the live backend. Fix any broken wiring.

**Files to inspect and potentially fix:**
```
src/services/tenant_admin/menu_management/index.ts
src/views/tenant_admin/menu_management/index.tsx
src/services/tenant_admin/table_management/index.ts
src/views/tenant_admin/table_management/index.tsx
```

**Checklist:**
- [ ] `apiCreateMenu` — POST /menus with floor_id query param
- [ ] `apiUpdateMenu` — PATCH /menus/:id
- [ ] `apiDeleteMenu` — DELETE /menus/:id
- [ ] `apiCreateCategory` — POST /categories with menu_id + category_type
- [ ] `apiUpdateCategory`, `apiDeleteCategory`
- [ ] `apiCreateItem` — POST /items with menu_id + category_id + type
- [ ] `apiUpdateItem`, `apiDeleteItem`
- [ ] `apiCreateCombo` — POST /combos with menu_id
- [ ] `apiUpdateCombo`, `apiDeleteCombo`
- [ ] Floor create/update/delete flows in table_management
- [ ] Table create/update/delete flows

**Common issues to check:**
- Auth token included in all Axios requests (check `ApiService.fetchDataWithAxios` headers)
- Query params passed correctly (menu_id, floor_id, category_id, type) — these are query params, not body fields
- Error states handled: 401, 403, 404, 422
- Loading states during mutations (disable buttons, show spinner)
- Optimistic UI vs. refetch-on-success pattern (use React Query `invalidateQueries`)

---

### Agent D: Staff Management UI

**Goal:** Full staff management UI wired to the 12 existing user/staff API endpoints.

**New files to create:**
```
src/services/tenant_admin/staff/index.ts   ← typed API wrappers
src/views/tenant_admin/staff_management/index.tsx  ← main view (replace 212-byte placeholder)
src/views/tenant_admin/staff_management/StaffList.tsx
src/views/tenant_admin/staff_management/StaffDetail.tsx
src/views/tenant_admin/staff_management/StaffForm.tsx
src/views/tenant_admin/staff_management/PermissionToggles.tsx
src/views/tenant_admin/staff_management/DocumentsPanel.tsx
```

**Service functions to implement in `src/services/tenant_admin/staff/index.ts`:**
```typescript
apiGetRoles()                          // GET /users/roles
apiGetStaff()                          // GET /users/staff
apiGetStaffById(id)                    // GET /users/:id
apiCreateStaff(data)                   // POST /users
apiUpdateStaff(id, data)               // PATCH /users/:id
apiDeleteStaff(id)                     // DELETE /users/:id
apiTogglePermission(id, permissionId)  // POST /users/:id/permissions/:permissionId
apiGetStaffActivity(id)                // GET /users/:id/activity
apiGetStaffDocuments(id)               // GET /users/:id/documents
apiUploadDocument(id, file)            // POST /users/:id/documents
apiDeleteDocument(docId)               // DELETE /users/documents/:docId
```

**UI requirements:**
- Staff list: table with name, role, status, last active, salary summary — all from `GET /users/staff`
- Staff detail drawer/page: profile info + permission toggles + documents + activity log
- Create staff: form → POST → auto-sends temp password email (backend handles)
- Permission toggles: each permission as a toggle switch; PATCH calls `apiTogglePermission`
- Documents: upload button (multipart form) + list with delete

---

## Phase 2 — Frontend Agents (Parallel, after Phase 1 backend)

### Agent F: POS / Cart UI

> **Depends on:** Phase 1 Agent A (cart API live)

**Files to expand:**
```
src/services/tenant_admin/pos/index.ts   ← currently stub, expand fully
src/views/tenant_admin/pos/index.tsx     ← main POS view
src/views/tenant_admin/pos/CartPanel.tsx
src/views/tenant_admin/pos/CartItem.tsx
src/views/tenant_admin/pos/MenuBrowser.tsx
src/views/tenant_admin/pos/TableSelector.tsx
```

**Service functions to implement:**
```typescript
apiCreateCart(data: { table_id, waiter_id, notes? })   // POST /carts
apiGetCarts()                                           // GET /carts
apiGetCartById(id)                                      // GET /carts/:id
apiUpdateCart(id, data)                                 // PATCH /carts/:id
apiDeleteCart(id)                                       // DELETE /carts/:id
apiAddCartItem(cartId, data)                            // POST /carts/:id/items
apiUpdateCartItem(cartId, itemId, data)                 // PATCH /carts/:id/items/:itemId
apiRemoveCartItem(cartId, itemId)                       // DELETE /carts/:id/items/:itemId
apiConvertCart(cartId)                                  // POST /carts/:id/convert
```

**UI layout:**
- Left panel: Active carts list (one per table) with item count + total
- Center: Cart detail — items list with inline qty editor and remove button
- Right panel: Menu browser — search items/combos, tap to add to selected cart
- Top: Table selector to assign/reassign cart
- Bottom action: "Send to Kitchen" button → calls `apiConvertCart`

**State management:** Use React Query for cart data; optimistic updates on add/remove item for fast UX.

---

### Agent G: Orders UI + Kitchen Display + Dashboard Stats

> **Depends on:** Phase 1 Agent B (orders API) + Phase 2 Agent E (WebSocket)

**New files:**
```
src/services/tenant_admin/orders/index.ts
src/views/tenant_admin/orders/index.tsx          ← orders list
src/views/tenant_admin/orders/OrderDetail.tsx    ← detail drawer
src/views/tenant_admin/orders/KitchenView.tsx    ← kitchen display
src/views/tenant_admin/orders/OrderStatusBadge.tsx
```

**Service functions:**
```typescript
apiGetOrders(filters?)         // GET /orders?status=&date_from=&date_to=
apiGetOrderStats()             // GET /orders/stats
apiGetOrderById(id)            // GET /orders/:id
apiUpdateOrderStatus(id, status)                    // PATCH /orders/:id/status
apiUpdateOrderItemStatus(orderId, itemId, status)   // PATCH /orders/:id/items/:itemId/status
apiCancelOrder(id)             // DELETE /orders/:id
```

**WebSocket client setup:**
```typescript
// src/hooks/useOrderSocket.ts
// Connect to WS gateway with JWT
// Subscribe to: order:new, order:status:updated, order:item:ready, order:ready
// On event: invalidate React Query cache for /orders
```

**Orders list view:** Filter tabs (All / Pending / Preparing / Ready / Served). Each row shows order number, table, waiter, item count, status badge, time elapsed.

**Order detail drawer:** Full item list with per-item status controls (kitchen view) + order-level status update.

**Kitchen display (`KitchenView.tsx`):** Card grid of active orders grouped by status. Kitchen staff mark items as 'preparing' → 'ready'. Auto-updates via WebSocket (no manual refresh).

**Dashboard stats:** Wire `GET /orders/stats` to the existing dashboard view — replace mock numbers with real revenue and order counts.

---

## Phase 3 — Extended Features

### Agent H: Expense Tracker
```
src/services/tenant_admin/expense/index.ts
src/views/tenant_admin/expense_tracker/index.tsx
```
- List view with category filter + month picker
- Add/edit expense modal
- Category breakdown chart (use a lightweight canvas chart)

### Agent I: Customer Module
```
src/services/tenant_admin/customers/index.ts
src/views/tenant_admin/customers/index.tsx       ← expand existing skeleton
src/views/tenant_admin/customers/CustomerProfile.tsx
```
- List with search by name/phone
- Profile page: metadata + previous orders (paginated)

### Agent J: Table QR Mapping
```
// Extend src/views/tenant_admin/table_management/index.tsx
// Add QR panel per table: display QR, regenerate button, print action
```

---

## Shared Conventions

**API calls:** Always use `ApiService.fetchDataWithAxios` from `src/services/ApiService.ts`. Do not use raw `fetch` or `axios` directly.

**Data fetching:** Use `useQuery` from TanStack React Query. Key convention: `['resource', id, filters]`.

**Mutations:** Use `useMutation` + `queryClient.invalidateQueries` on success.

**Error handling:** Display errors via the existing toast/notification system. Never swallow API errors silently.

**Loading states:** All mutation buttons must be disabled and show a spinner while the request is in-flight.

**Types:** Define all request/response types in the service file alongside the API functions. No `any`.

/**
 * Shared Menu Management Type Definitions
 * These types match the API responses from the Menu Management services.
 */

import { FloorTableNodeDto } from '../../table_management/types';
import {
  BaseMenuItem as UI_BaseMenuItem,
  MenuCategory as SharedMenuCategory,
  Modifier as SharedModifier,
  ModifierOption
} from '../../types';

export type { ModifierOption };
export type EntityType = 'ITEM' | 'MODIFIER';

export interface BaseEntity {
  tenant_id: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

/**
 * Menu interface (API)
 */
export interface Menu extends BaseEntity {
  menu_id: string;
  floor_id: string;
  name: string;
  is_active: boolean;
  floor?: FloorTableNodeDto; // Using the existing type from table_management
}

/**
 * Category interface (used for both ITEM and MODIFIER categories) (API)
 */
export interface Category extends BaseEntity {
  category_id: string;
  menu_id: string;
  category_type: EntityType;
  name: string;
  description: string;
  is_active: boolean;
  sortOrder?: number;
  menu?: Menu; // Included in GET all and GET by ID
  items?: MenuItemAPI[]; // Included in 'get All Categories with items'
}

/**
 * MenuItem interface (covers both Items and Modifiers) (API)
 */
export interface MenuItemAPI extends BaseEntity {
  item_id: string;
  menu_id: string;
  category_id: string;
  name: string;
  price: string | number;
  description: string;
  parent_ids: string[] | null;
  type: EntityType;
  is_required: boolean;
  under_offer: boolean;
  is_active: boolean;
  is_available: boolean;
  menu?: Menu;
  category?: Category;
}

/**
 * Combo interface (API)
 */
export interface ComboAPI extends BaseEntity {
  combo_id: string;
  menu_id: string;
  name: string;
  price: string | number;
  description: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  items: MenuItemAPI[];
  menu?: Menu;
}

// ============================================================================
// Request Types for Mutations
// ============================================================================

export interface CreateMenuRequest {
  floor_id: number;
  name: string;
  is_active: boolean;
}

export interface UpdateMenuRequest extends Partial<CreateMenuRequest> {
  menu_id: string;
}

export interface CreateCategoryRequest {
  menu_id: number;
  category_type: EntityType;
  name: string;
  description: string;
  is_active: boolean;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  category_id: string;
}

export interface CreateItemRequest {
  menu_id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  parent_ids: string[] | null;
  type: EntityType;
  is_required: boolean;
  under_offer: boolean;
  is_active: boolean;
  is_available: boolean;
}

export interface UpdateItemRequest extends Partial<CreateItemRequest> {
  item_id: string;
}

export interface CreateComboRequest {
  menu_id: number;
  name: string;
  price: number;
  description: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  list_of_item_ids: number[]; // Sending array of item IDs as numbers
}

export interface UpdateComboRequest extends Partial<CreateComboRequest> {
  combo_id: string;
}

/**
 * Common Response Types
 */

export interface SuccessMessageResponse {
  message: string;
}

/**
 * Composite data structure for the entire menu (API Response)
 */
export interface MenuDataResponse {
  menus: Menu[];
  categories: Category[];
  items: MenuItemAPI[];
  combos: ComboAPI[];
}

// ============================================================================
// UI Specific Types
// ============================================================================

export interface MenuItem extends UI_BaseMenuItem {
  categoryId: string;
  categoryName: string;
  available: boolean;
  menuId?: string;
  parentIds?: string[] | null;
}

export interface ComboItem {
  itemId: string;
  itemName: string;
  quantity: number;
  size?: string;
}

export interface Combo {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  available: boolean;
  items: ComboItem[];
  menuId: string;
  schedule?: {
    specificMonth?: string;
    specificDay?: string;
    fromTime?: string;
    toTime?: string;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder?: number;
}

export interface Modifier extends SharedModifier {
  categoryName?: string;
  menuId?: string;
  categoryId?: string;
  parentIds?: string[] | null;
}

/**
 * Menu data structure used by the UI
 */
export interface MenuData {
  categories: MenuCategory[];
  modifierCategories: MenuCategory[];
  items: MenuItem[];
  modifiers: Modifier[];
  combos: Combo[];
}

/**
 * Menu view tabs Helper
 */
export type MenuTab = 'items' | 'modifiers' | 'combos';

// Explicit re-exports for clarity
export type { MenuItemAPI as ApiMenuItem, ComboAPI as ApiCombo };

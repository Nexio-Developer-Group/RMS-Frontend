export interface MenuItem {
  id: string;
  name: string;
  url: string;
  icon?: string;
  parentId?: string;
  order?: number;
  isActive: boolean;
}
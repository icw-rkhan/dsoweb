export interface NavLinkModel {
  id?: number;
  label: string;
  icon?: string;
  iconActive?: string;
  route?: string;
  categoryId?: number;
  subMenu?: any[];
  state?: string;
}

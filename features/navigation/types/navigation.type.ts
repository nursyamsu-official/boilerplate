export type NavigationMenuItem = {
  id: string;
  code: string;
  label: string;
  path: string | null;
  icon: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type NavigationMenuTreeNode = NavigationMenuItem & {
  children: NavigationMenuTreeNode[];
};

export type NavigationUser = {
  name: string;
  email: string;
  image?: string | null;
};

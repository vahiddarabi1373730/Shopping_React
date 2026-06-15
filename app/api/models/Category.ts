export interface Category {
  title: string;
  urlTitle: string;
  parentId: number | null;
  id: string;
  isDelete: boolean;
  createDate: string;
  lastUpdateDate: string; // یا
}

export interface CategoryArg {
  request: {
    title: string;
    urlTitle: string;
  };
  id?: string;
}

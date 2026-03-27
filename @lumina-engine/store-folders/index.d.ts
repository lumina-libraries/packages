export interface StoreFolderAdapter {
  id: string;
  name: string;
  parentId?: string;
  readonly children?: StoreFolderAdapter[];
  readonly items?: unknown[];
  [key: string]: unknown;
}

declare const defaultFolder: StoreFolderAdapter;
export default defaultFolder;

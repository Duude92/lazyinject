interface LazyInjectContainerOptions {
  [containers: string | 'default']: ContainerOption;
}

export interface ContainerOption {
  catalogs: Array<CatalogOptions>;
}

export interface CatalogOptions {
  path: string;
  recursive: boolean;
}

export declare type Config = LazyInjectContainerOptions;

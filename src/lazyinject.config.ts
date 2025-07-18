interface LazyInjectContainerOptions {
  containers: Record<string | 'default', ContainerOption>[];
}

interface ContainerOption {
  catalogs: Array<CatalogOptions>;
}

interface CatalogOptions {
  path: string;
  recursive: boolean;
}

export declare type Config = LazyInjectContainerOptions;

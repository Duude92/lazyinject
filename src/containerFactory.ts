import { StandaloneContainerOptions } from './api/IContainerOptions';
import { Container } from './container';
import { resolveAndLoadModules } from './moduleLoader';
import { ContainerRegistry, ContainerRegistryStatic, containersRegistry } from './containerRegistry';

/**
 * Factory to create Container object
 */
export class ContainerFactory {
  /**
   * Main function to create a new Container object with provided options
   * @param options Provided options. See {@link IContainerOptions}
   */
  static async create(options?: StandaloneContainerOptions): Promise<Container> {
    const container = new Container(ContainerRegistryStatic);
    if (options && typeof options !== 'object') containersRegistry.register(container, options ?? 'default');
    await resolveAndLoadModules(options ?? 'default');

    return container;
  }
}

import { StandaloneContainerOptions } from './api/IContainerOptions';
import { Container } from './container';
import { resolveAndLoadModules } from './moduleLoader';

/**
 * Factory to create Container object
 */
export class ContainerFactory {
  /**
   * Main function to create a new Container object with provided options
   * @param options Provided options. See {@link IContainerOptions}
   */
  static async create(options?: StandaloneContainerOptions): Promise<Container> {
    await resolveAndLoadModules(options);

    return new Container();
  }
}

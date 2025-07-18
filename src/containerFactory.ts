import { StandaloneContainerOptions } from './api/IContainerOptions';
import { Container } from './container';
import { resolveAndLoadModules } from './moduleLoader';
import { loadConfig } from './containerConfig';

/**
 * Factory to create Container object
 */
export class ContainerFactory {
  private static isConfigLoaded: boolean = false;

  /**
   * Main function to create a new Container object with provided options
   * @param options Provided options. See {@link IContainerOptions}
   */
  static async create(options?: StandaloneContainerOptions): Promise<Container> {
    if (!this.isConfigLoaded) await loadConfig();
    await resolveAndLoadModules(options ?? 'default');

    return new Container();
  }
}

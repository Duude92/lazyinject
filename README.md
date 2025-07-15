# LazyInject
A lightweight TypeScript dependency injection library with lazy loading capabilities.

## Overview
LazyInject provides a clean and efficient way to manage dependencies in TypeScript applications through decorators and a container-based system. The library's key feature is lazy initialization, which defers object instantiation until dependencies are actually needed, improving performance and memory usage.

## Features
 🚀 Lazy Loading: Dependencies are instantiated only when accessed<br>
 🎯 Decorator-Based: Simple @Export and @Import decorators for dependency management<br>
 📦 Container System: Centralized dependency registration and resolution<br>
 🔍 Auto-Discovery: Automatic scanning of directories for dependencies<br>
 🎭 Interface-Based Injection: Inject based on interfaces rather than concrete implementations<br>
 📚 Multiple Implementations: Support for injecting arrays of implementations<br>
 💪 Type Safety: Full TypeScript support with generic types<br>
## Installation
```bash
npm install lazyinject
```

## Quick Start
### 1. Define an Interface
   ```typescript
   // interface/ILogger.ts
export interface ILogger {
    log(message: string): void;
}
```
### 2. Create an Implementation
   ```typescript
   // implementations/ConsoleLogger.ts
import {Export} from 'lazyinject';
import {ILogger} from '../interface/ILogger';

@Export('ILogger')
export class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}
```
### 3. Inject Dependencies
   ```typescript
   // MyService.ts
import {Import} from 'lazyinject';
import {ILogger} from './interface/ILogger';

@Export(MyService)
export class MyService {
    constructor(
        @Import('ILogger')
        private readonly logger: ILogger
    ) {}

    doSomething(): void {
        this.logger.log('Service is working!');
    }
}
```
### 4. Bootstrap Your Application
   ```typescript
   // index.ts
import {ContainerFactory} from 'lazyinject';
import { MyService } from './MyService';

const bootstrap = async () => {
    const container = await ContainerFactory.create({
        baseDir: __dirname,
        catalogs: ['.', './implementations']
    });

    const service = container.get<MyService>(MyService);
    service.doSomething();
};

bootstrap();
```
## Advanced Usage
### Lazy Loading
Use the Lazy<T> wrapper for deferred instantiation:

```typescript
import {ImportMany, Lazy} from 'lazyinject';
import {IPlugin} from './interface/IPlugin';

export class PluginManager {
    constructor(
        @ImportMany('IPlugin', {lazy: true})
        private readonly plugins: Lazy<IPlugin>[]
    ) {}

    executeRandomPlugin(): void {
        const randomIndex = Math.floor(Math.random() * this.plugins.length);
        const plugin = this.plugins[randomIndex];

        // Plugin is instantiated only when .Value is accessed
        plugin.Value.execute();
    }

    getPluginInfo(): void {
        this.plugins.forEach((plugin, index) => {
            console.log(`Plugin ${index}: Loaded = ${plugin.HasValue}`);
        });
    }
}
```
### Multiple Implementations
Inject all implementations of an interface:

```typescript
import {ImportMany} from 'lazyinject';
import {IValidator} from './interface/IValidator';

export class ValidationService {
    constructor(
        @ImportMany('IValidator')
        private readonly validators: IValidator[]
    ) {}

    validateAll(data: any): boolean {
        return this.validators.every(validator => validator.validate(data));
    }
}
```
### Container Configuration
The ContainerFactory supports various configuration options:

```typescript
const container = await ContainerFactory.create({
    baseDir: __dirname,           // Base directory for scanning
    catalogs: [                   // Directories to scan for dependencies
        '.',
        './services',
        './implementations',
        './plugins'
    ],
    recursive: true                // To recursively scan directories for dependencies
});
```
## API Reference
### Types
 - `InterfaceType`: Supported <u>identifier</u> types for registration (`string | symbol | ConstructorType`)
 - `ConstructorType`: Type of class constructor, used to register class
 - `ExportedType`: Type of object to register (`ConstructorType | object`)
### Decorators
- `@Export(identifier: InterfaceType)`: Registers a class as an implementation of the specified identifier
- `@Import(identifier: InterfaceType)`: Injects a single implementation
- `@ImportMany(identifier: InterfaceType, options?)`: Injects all implementations as an array
  - `options.lazy`: boolean - Enable lazy loading (default: false)
### Core Classes
- `ContainerFactory`: Factory for creating dependency injection containers
- `Lazy<T>`: Wrapper for lazy-loaded dependencies
  - `.Value`: T - Gets the instantiated value
  - `.HasValue`: boolean - Checks if the value has been instantiated
- `ContainerRegistry`: Internal registry for managing dependencies
## Examples
The repository includes several examples in the samples/ directory:

<table>
<tr><td>
01-simple-get</td><td>Basic container usage with @Export and container.get&lt;type&gt;
</td></tr><tr>
<td>02-simple-import</td><td>Simple dependency injection with @Import</td>
</tr><tr><td>
03-import-array</td><td>Multiple implementations with @ImportMany</td>
</tr><tr><td>
04-lazy-import</td><td>Lazy loading with performance benefits</td>
</tr><tr><td>
05-object-export</td><td>Exporting object instances</td>
</tr><tr><td>
06-js-import</td><td>Basic container usage with JS</td>
</tr><tr><td>
07-using-config</td><td>Example of project using lazyinject.config.js</td>
</tr><tr><td>
<a href="https://github.com/Duude92/node-file-manager">node-file-manager</a></td><td>Example of usage in separate project using published package</td>
</tr>
</table>

## Building
```bash
npm run build
```
This will compile TypeScript files and generate type definitions in the `dist/` directory.

## License
This project is open source and available under the MIT License.

## Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.
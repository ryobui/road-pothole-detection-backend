import * as fg from 'fast-glob';
import * as path from 'path';

export function loadConfigs() {
    const configDir = path.resolve(__dirname);
    const configFiles = fg.sync(`${configDir}/*.config.{ts,js}`);
    const configs = [];

    configFiles.forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const configModule = require(file);
        const configKey = Object.keys(configModule)[0];
        if (configKey) {
            configs.push(configModule[configKey]);
        }
    });

    return configs;
}

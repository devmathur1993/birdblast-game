import {
    Assets,
    extensions,
    ExtensionType,
    Resolver,
    resolveTextureUrl,
    type ResolveURLParser,
    type UnresolvedAsset
} from 'pixi.js';

import manifest from '../manifest.json';

export const resolveJsonUrl = {
    extension: ExtensionType.ResolveParser,
    test: (value: string): boolean => Resolver.RETINA_PREFIX.test(value) && value.endsWith('.json'),
    parse: resolveTextureUrl.parse,
} as ResolveURLParser;

extensions.add(resolveJsonUrl);


export async function initAssets() {

    await Assets.init({ manifest, basePath: 'assets' });
    await Assets.loadBundle(['default', 'preload', 'background', 'screen'], onProgress => {
        console.log(onProgress);
    });

    const allBundles = manifest.bundles.map((item) => item.name);
    Assets.backgroundLoadBundle(allBundles);
}

export function isBundleLoaded(bundle: string) {
    const bundleManifest = manifest.bundles.find((b) => b.name === bundle);

    if (!bundleManifest) {
        return false;
    }

    for (const asset of bundleManifest.assets as UnresolvedAsset[]) {
        if (!Assets.cache.has(asset.alias as string)) {
            return false;
        }
    }

    return true;
}

export function areBundlesLoaded(bundles: string[]) {
    for (const name of bundles) {
        if (!isBundleLoaded(name)) {
            return false;
        }
    }

    return true;
}

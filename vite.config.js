import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import collectModuleAssetsPaths from "./vite-module-loader.js";

async function getConfig() {
    const paths = [
        "resources/css/app.scss",
        "resources/assets/scss/main.scss",
        "resources/js/app.js",
        "resources/js/datatables.js",
        "resources/js/ckeditor.js",
        "resources/js/app/chat/chat-app.js",
    ];
    const allPaths = await collectModuleAssetsPaths(paths, "Modules");

    return defineConfig({
        plugins: [
            laravel({
                input: allPaths,
                refresh: true,
            }),
        ],
        define: {
            "process.env.IS_PREACT": JSON.stringify("true"),
        },
        optimizeDeps: {
            exclude: ["js-big-decimal"],
        },
        resolve: {
            alias: {
                // Alias to resolve livewire's ESM module
              '@livewire': path.resolve(__dirname, 'vendor/livewire/livewire/dist/livewire.esm'),
            },
        },
        plugins: [vite()],
        assetsInlineLimit: 0,
    });
}

export default getConfig();

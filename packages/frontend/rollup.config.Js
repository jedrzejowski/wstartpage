import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

const plugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    commonjs(),
    html({
        meta: [
            {charset: "UTF-8"},
            {name: "viewport", content: "minimum-scale=1, initial-scale=1, width=device-width"}
        ]
    }),
    typescript({
        sourceMap: false
    }),
    nodeResolve({
        extensions: [".js", ".ts", ".tsx"],
    }),
];

export default [
    {
        input: './src/viewer.tsx',
        output: {
            format: 'iife',
            file: 'dist/viewer.js',
        },
        plugins,
    },
    {
        input: './src/editor.tsx',
        output: {
            format: 'iife',
            file: 'dist/editor2/editor.js',
        },
        plugins,
    }
];
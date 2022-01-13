import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import {terser} from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction)

const plugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    commonjs(),
    html({
        title: "Strona Startowa",
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

if (isProduction) {
    plugins.push(terser({
        ecma: 2020,
        mangle: {toplevel: true},
        format: {
            comments: false,
            quote_style: 1
        },
        compress: {
            module: true,
            toplevel: true,
            unsafe_arrows: true,
            drop_console: true,
            drop_debugger: true,
        }
    }));
}

export default [
    {
        input: './src/viewer.tsx',
        output: {
            format: 'iife',
            file: 'dist/viewer.js',
            sourcemap: isProduction ? false : 'inline'
        },
        plugins,
    },
    {
        input: './src/editor.tsx',
        output: {
            format: 'iife',
            file: 'dist/editor2/editor.js',
            sourcemap: isProduction ? false : 'inline'
        },
        plugins,
    }
];
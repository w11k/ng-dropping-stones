'use strict';
var GulpConfig = (function () {
    function GulpConfig() {

        // ----------------------------------------------------------
        // Vendor
        // ----------------------------------------------------------

        this.vendor = [
            "bower_components/font-awesome/css/font-awesome.min.css",
            "bower_components/bootstrap/dist/css/bootstrap.min.css",
            "bower_components/jquery/jquery.min.js",
            "bower_components/lodash/lodash.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js",
            "bower_components/bootstrap/js/transition.js",
            "bower_components/bootstrap/js/collapse.js",
            "bower_components/angular/angular.min.js",
            "bower_components/angular-cookies/angular-cookies.min.js",
            "bower_components/angular-animate/angular-animate.min.js",
            "bower_components/angular-sanitize/angular-sanitize.min.js",
            "bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "bower_components/angular-bootstrap/ui-bootstrap.min.js",
            "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "bower_components/animate.css/animate.min.css"
        ];

        // ----------------------------------------------------------
        // Source Paths
        // ----------------------------------------------------------

        this.revAllOptions = {
            dontRenameFile: ["index.html"]
        };

        // Relative to Root folder

        this.htmlFiles = [
            "**/*.html"
        ];

        this.cssFiles = [
            "**/*.css"
        ];

        this.scssFiles = [
            "!**/_*.scss",
            "**/*.scss"
        ];

        this.scssRebuildAllFiles = [
            "**/_*.scss"
        ];

        this.typeScriptFiles = [
            "**/*.ts"
        ];
        this.typeScriptLintFiles = [
            "**/*.ts"
        ];

        this.javaScriptFiles = [
            "**/*.js"
        ];

        // Relative to Root folder

        this.typeScriptDefinitions = [
            "typings/tsd.d.ts"
        ];

        this.copyFiles = [
            ["bower_components/bootstrap/dist/fonts/**/*", "fonts"],
            ["bower_components/font-awesome/fonts/*.woff", "fonts"]
        ];

        // ----------------------------------------------------------
        // SystemJS
        // ----------------------------------------------------------

        this.systemImportMain = "init";

        this.systemJSConfig = {
            baseURL: '',
            defaultJSExtensions: true,

            "paths": {
                "*": "*.js"
            }
        };

        // ----------------------------------------------------------
        // Output
        // ----------------------------------------------------------

        this.target = "target";

        this.targetApp = this.target + "/build";

        this.targetJs = this.targetApp;

        // ----------------------------------------------------------
        // BrowserSync
        // ----------------------------------------------------------

        this.browserSyncOptions = {
            injectChanges: true,
            //reloadDelay: 750,
            open: false,
            online: true,
            reloadOnRestart: true,
            port: 3000,
            //proxy: {
            //    target: "http://localhost:8080",
            //    ws: true
            //},
            server: {
                baseDir: this.targetApp,
                directory: false
            }//,
            //files: this.targetApp + '/**/*'
        };

    }

    return GulpConfig;
})();
module.exports = GulpConfig;

/*!
 * Emmet for the Cloud9 IDE.
 *
 * @copyright 2013, Rubens Mariuzzo, Mariuzzo.com
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

// RequireJS configuration for non AMD dependencies.
requirejs.config({
    shim: {
        './vendors/underscore.js': {
            exports: '_'
        },
        './vendors/emmet-full.js': {
            deps: ['_'],
            exports: 'emmet'
        },
        './cloud9-editor-proxy.js': {
            deps: ['_', 'emmet'],
            exports: 'editorProxy'
        }
    }
});

// Cloud9 Emmet extension.
define(function(require, exports, module) {

    // Cloud9's dependencies.
    var ext = require('core/ext');
    var menus = require('ext/menus/menus');
    var editors = require("ext/editors/editors");
    var commands = require('ext/commands/commands');

    // Extension's dependencies.
    require('./vendors/underscore.js');
    require('./vendors/emmet-full.js');
    var editorProxy = require('./cloud9-editor-proxy.js');

    // Cloud9 extension definition.
    module.exports = ext.register('ext/cloud9-emmet-ext/cloud9-emmet-ext', {

        // C9 Extension Properties

        name: 'Emmet Extension',
        dev: 'Rubens Mariuzzo',
        alone: true,
        offline: false,
        type: ext.GENERAL,
        nodes: [],

        // C9 Extension Methods

        /**
         * Initialize the extension.
         */
        init: function(amlNode) {},

        /**
         * Hook the extension into the Cloud9 IDE.
         */
        hook: function() {

            // Prepare the menu.
            this.nodes.push(menus.addItemByPath('Tools/Emmet/', new apf.menu(), 900));

            // Emmet > Expand Abbreviation
            var mnuItemExpand = new apf.item({
                command: 'expand',
                onclick: function(editor) {
                    runEmmetAction('expand_abbreviation', editor);
                }
            });

            this.nodes.push(menus.addItemByPath('Tools/Emmet/Expand Abbreviation', mnuItemExpand, 910));

            commands.addCommand({
                name: 'expand',
                hint: 'expands CSS-like abbreviations into HTML/XML/CSS code, depending on current document’s syntax.',
                msg: 'Expanding abbreviation.',
                bindKey: {
                    mac: 'Command-Shift-E',
                    win: 'Shift-Ctrl-E'
                },
                isAvailable: function(editor) {
                    return true;
                },
                exec: function(editor) {
                    runEmmetAction('expand_abbreviation', editor);
                }
            });

            ext.initExtension(this);
        },

        /**
         * Enable the extension.
         */
        enable: function() {
            this.nodes.each(function(item) {
                item.enable();
            });
            this.disabled = false;
        },

        /**
         * Disable the extension.
         */
        disable: function() {
            this.nodes.each(function(item) {
                item.disable();
            });
            this.disabled = true;
        },

        /**
         * Destroy the extension dependencies.
         */
        destroy: function() {

            // Restore the menu.
            menus.remove('Tools/Emmet');

            this.nodes.each(function(item) {
                item.destroy(true, true);
            });
            this.nodes = [];
        }

    });

    // Private functions //
    //-------------------//

    function runEmmetAction(name, editor) {

        if (this.disabled === true)
            return;

        // Set current editor.
        if (!editor)
            editor = editors.currentEditor;

        if (editor.amlEditor)
            editor = editor.amlEditor.$editor;

        editorProxy.setEditor(editor);

        // Delegate Emmet action.
        try {
            emmet.require('actions').run(name, editorProxy);
        } catch (err) {}
    }

});
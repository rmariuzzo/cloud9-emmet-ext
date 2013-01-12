/*!
 * Emmet for the Cloud9 IDE.
 *
 * Cloud9 Editor Proxy for Emmet.
 *
 * @copyright 2013, Rubens Mariuzzo, Mariuzzo.com
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

// Emmet Editor proxy implementation AMD definition.
define(function(require, exports, module) {

    // IEmmetEditor.js proxy implementation.
    var editorProxy = {

        // The current editor.
        editor: null,

        // IEmmetEditor interface functions //
        //----------------------------------//

        /**
         * Returns character indexes of selected text: object with <code>start</code>
         * and <code>end</code> properties. If there's no selection, should return 
         * object with <code>start</code> and <code>end</code> properties referring
         * to current caret position
         * @return {Object}
         * @example
         * var selection = editor.getSelectionRange();
         * alert(selection.start + ', ' + selection.end); 
         */
        getSelectionRange: function() {
            var range = this.editor.getSelection().getRange();
            return {
                start: range.start.column,
                end: range.end.column
            };
        },

        /**
         * Creates selection from <code>start</code> to <code>end</code> character
         * indexes. If <code>end</code> is ommited, this method should place caret 
         * and <code>start</code> index
         * @param {Number} start
         * @param {Number} [end]
         * @example
         * editor.createSelection(10, 40);
         * 
         * //move caret to 15th character
         * editor.createSelection(15);
         */
        createSelection: function(start, end) {
            var row = this.editor.getCursorPosition().row;
            if (start === end) this.editor.moveCursorTo(row, start);
            else this.editor.selection.setSelectionRange({
                start: {
                    row: row,
                    column: start
                },
                end: {
                    row: row,
                    column: end
                }
            });
        },

        /**
         * Returns current line's start and end indexes as object with <code>start</code>
         * and <code>end</code> properties
         * @return {Object}
         * @example
         * var range = editor.getCurrentLineRange();
         * alert(range.start + ', ' + range.end);
         */
        getCurrentLineRange: function() {
            return {
                start: 0,
                end: this.editor.session.getLine(this.editor.getCursorPosition().row).length
            };
        },

        /**
         * Returns current caret position
         * @return {Number|null}
         */
        getCaretPos: function() {
            return this.editor.getCursorPosition().row;
        },

        /**
         * Set new caret position
         * @param {Number} pos Caret position
         */
        setCaretPos: function(pos) {
            this.editor.moveCursorTo(this.editor.getCursorPosition().row, pos);
        },

        /**
         * Returns content of current line
         * @return {String}
         */
        getCurrentLine: function() {
            return this.editor.session.getLine(this.editor.getCursorPosition().row).length;
        },

        /**
         * Replace editor's content or it's part (from <code>start</code> to 
         * <code>end</code> index). If <code>value</code> contains 
         * <code>caret_placeholder</code>, the editor will put caret into 
         * this position. If you skip <code>start</code> and <code>end</code>
         * arguments, the whole target's content will be replaced with 
         * <code>value</code>. 
         * 
         * If you pass <code>start</code> argument only,
         * the <code>value</code> will be placed at <code>start</code> string 
         * index of current content. 
         * 
         * If you pass <code>start</code> and <code>end</code> arguments,
         * the corresponding substring of current target's content will be 
         * replaced with <code>value</code>. 
         * @param {String} value Content you want to paste
         * @param {Number} [start] Start index of editor's content
         * @param {Number} [end] End index of editor's content
         * @param {Boolean} [no_indent] Do not auto indent <code>value</code>
         */
        replaceContent: function(value, start, end, no_indent) {
            if (typeof end === 'undefined') end = start || 0;
            var row = this.editor.getCursorPosition().row;
            this.editor.selection.setSelectionRange({
                start: {
                    row: row,
                    column: start
                },
                end: {
                    row: row,
                    column: end
                }
            });
            this.editor.insert(value);
        },

        /**
         * Returns editor's content
         * @return {String}
         */
        getContent: function() {
            return this.editor.getValue();
        },

        /**
         * Returns current editor's syntax mode
         * @return {String}
         */
        getSyntax: function() {
            var syntax = this.editor.session.syntax;
            return
            syntax === 'xhtml' ? 'xhtml' : syntax === 'html' ? 'html' : syntax === 'xml' ? 'xml' : 'plain';
        },

        /**
         * Returns current output profile name (see profile module).
         * In most cases, this method should return <code>null</code> and let 
         * Emmet guess best profile name for current syntax and user data.
         * In case you’re using advanced editor with access to syntax scopes 
         * (like Sublime Text 2), you can return syntax name for current scope. 
         * For example, you may return `line` profile when editor caret is inside
         * string of programming language.
         *  
         * @return {String}
         */
        getProfileName: function() {
            return 'xhtml';
        },

        /**
         * Ask user to enter something
         * @param {String} title Dialog title
         * @return {String} Entered data
         * @since 0.65
         */
        prompt: function(title) {
            return '';
        },

        /**
         * Returns current selection
         * @return {String}
         * @since 0.65
         */
        getSelection: function() {
            return '';
        },

        /**
         * Returns current editor's file path
         * @return {String}
         * @since 0.65 
         */
        getFilePath: function() {
            return '';
        },

        // Custom functions //
        //------------------//

        setEditor: function(editor) {
            this.editor = editor;
        }

    };

    return editorProxy;

});
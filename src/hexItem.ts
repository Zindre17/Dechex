
import * as vscode from 'vscode';

export class HexItem extends vscode.TreeItem {
    constructor(
        private readonly editor: vscode.TextEditor,
        public readonly hex: string,
        public readonly lineNumber: number,
        public readonly index: number,
        private readonly showLineNumber: boolean
    ) {
        super('', vscode.TreeItemCollapsibleState.None);
        this.generateLabel();

        this.contextValue = "hex";
        this.command = {
            title: "",
            command: "dechex.navigate",
            arguments: [this]
        };
    }

    isReplaced = false;

    generateLabel() {
        let prefix = "";
        if (this.showLineNumber) {
            prefix = `L:${this.lineNumber + 1}    `;
        }
        this.label = `${prefix}${this.getCleanHex()}  =  ${this.getAsDecimal()}`;
    }

    getCleanHex() {
        return this.hex.replace(/_/g, '');
    }
    getAsDecimal() {
        return parseInt(this.getCleanHex());
    }

    getEditorStart() {
        return new vscode.Position(this.lineNumber, this.index);
    }

    getEditorEnd() {
        return new vscode.Position(this.lineNumber, this.index + this.hex.length);
    }

    getEditorRange() {
        return new vscode.Range(this.getEditorStart(), this.getEditorEnd());
    }

    async replaceWithDecimal() {
        if (this.isReplaced) {
            return;
        }
        this.isReplaced = true;
        this.focus();
        await this.editor.edit((editBuilder) => {
            editBuilder.replace(
                this.getEditorRange(),
                this.getAsDecimal().toString()
            );
        });
    }

    focus() {
        vscode.window.showTextDocument(this.editor.document);
        this.select();
        this.scrollTo();
    }

    select() {
        this.editor.selection = new vscode.Selection(
            this.getEditorStart(),
            this.getEditorEnd()
        );
    }

    scrollTo() {
        const newStart = this.getEditorStart();
        const newEnd = this.getEditorEnd();

        this.editor.revealRange(
            new vscode.Range(
                newStart.translate(Math.max(-10, -newStart.line)),
                newEnd.translate(10)
            )
        );
    }
}

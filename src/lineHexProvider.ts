import * as vscode from 'vscode';
import { getAllMatches } from './hexHelper';
import { HexItem } from './hexItem';

export class LineHexProvider implements vscode.TreeDataProvider<HexItem>{
    constructor(private lineNumber: number) { }

    private _onDidChangeTreeData
        = new vscode.EventEmitter<HexItem | undefined | null | void>();

    readonly onDidChangeTreeData
        = this._onDidChangeTreeData.event;

    update(lineNumber: number): void {
        this.lineNumber = lineNumber;
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: HexItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: HexItem): vscode.ProviderResult<HexItem[]> {
        if (element) {
            return [];
        }
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const line = editor.document.lineAt(this.lineNumber);
            const matches = getAllMatches(line.text);
            return matches.map(
                match => new HexItem(
                    editor,
                    match[0],
                    this.lineNumber,
                    match.index,
                    false
                )
            );
        }
        return [];
    }
}

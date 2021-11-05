import * as vscode from 'vscode';
import { getAllMatches } from './hexHelper';
import { HexItem } from './hexItem';

export class DocumentHexProvider implements vscode.TreeDataProvider<vscode.TreeItem>{

    private _onDidChangeTreeData
        = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();

    readonly onDidChangeTreeData
        = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return [new vscode.TreeItem("No open editors")];
        }

        if (!element) {
            const entries: HexItem[] = [];

            const lines = vscode.window.activeTextEditor?.document.lineCount ?? 0;
            for (let i = 0; i < lines; i++) {
                const line = vscode.window.activeTextEditor?.document.lineAt(i);

                if (!line) {
                    continue;
                }

                var matches = getAllMatches(line.text);

                matches.forEach(match => {
                    entries.push(new HexItem(editor, match[0], i, match.index, true));
                });
            }
            return entries;
        }

        return [new vscode.TreeItem("No hex numbers found.")];
    }
}
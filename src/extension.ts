// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dechex" is now active!');

	vscode.window.registerTreeDataProvider(
		'dechexmain',
		new MyTreeDataProvider()
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

class MyTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem>{

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
		if (!element) {
			return [new vscode.TreeItem("hello", vscode.TreeItemCollapsibleState.None)];
		}
		return [];
	}
}

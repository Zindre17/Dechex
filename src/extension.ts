// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DocumentHexProvider } from './documentHexProvider';
import { HexItem } from './hexItem';
import { LineHexProvider } from './lineHexProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	registerLineHexProvider(context);
	registerDocumentHexProvider(context);
	registerCommands(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function registerLineHexProvider(context: vscode.ExtensionContext) {
	const lineNumber = vscode.window.activeTextEditor?.selection.active.line ?? 0;
	const lineHexProvider = new LineHexProvider(lineNumber);
	registerTreeDataProvider(
		context,
		'dechexline',
		lineHexProvider
	);

	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection(
			(selectionEvent) => {
				const selectedLine = selectionEvent.selections[0].active.line;
				lineHexProvider.update(selectedLine);
			})
	);
}

function registerDocumentHexProvider(context: vscode.ExtensionContext) {
	const documentHexProvider = new DocumentHexProvider();

	registerTreeDataProvider(
		context,
		'dechexdoc',
		documentHexProvider
	);

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(
			() => documentHexProvider.refresh()
		)
	);
}

function registerCommands(context: vscode.ExtensionContext) {
	registerCommand(
		context,
		"dechex.navigate",
		(hexItem: HexItem) => hexItem.focus()
	);

	registerCommand(
		context,
		"dechex.convert",
		(hexItem: HexItem) => hexItem.replaceWithDecimal()
	);
}

function registerTreeDataProvider(context: vscode.ExtensionContext, viewId: string, provider: vscode.TreeDataProvider<any>) {
	context.subscriptions.push(
		vscode.window.registerTreeDataProvider(
			viewId,
			provider
		)
	);
}

function registerCommand(context: vscode.ExtensionContext, commandId: string, command: (...args: any[]) => any) {
	context.subscriptions.push(
		vscode.commands.registerCommand(commandId, command)
	);
}
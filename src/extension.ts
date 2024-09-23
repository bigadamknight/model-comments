import * as vscode from 'vscode';

let isHidden = false;
let statusBarItem: vscode.StatusBarItem;
let originalContent: string | null = null;
let disposables: vscode.Disposable[] = [];

function getConfig() {
	return vscode.workspace.getConfiguration('modelComments');
}

// LLM: This comment is for language models
/* start-model-comment */
/** LLM: start-model-comment */

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "model-comments" is now active');

	// Register commands
	const toggleCommand = vscode.commands.registerCommand('model-comments.toggleLLMComments', toggleLLMComments);
	context.subscriptions.push(toggleCommand);

	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'model-comments.toggleLLMComments';
	context.subscriptions.push(statusBarItem);

	// Set initial state based on settings
	isHidden = getConfig().get('defaultState') === 'hide';

	// Listen for configuration changes
	vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('modelComments')) {
			updateContent();
		}
	});

	// Update content when the active editor changes
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateContent));

	// Initial update
	updateContent();
	updateStatusBar();
}

function toggleLLMComments() {
	isHidden = !isHidden;
	updateContent();
	vscode.window.showInformationMessage(`LLM comments are now ${isHidden ? 'hidden' : 'visible'}`);
	updateStatusBar();
}

function updateContent() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;

	const document = editor.document;
	const fullText = document.getText();

	if (isHidden) {
		if (originalContent === null) {
			originalContent = fullText;
		}
		const identifier = getConfig().get('identifier') as string;
		// Updated regex to match all three comment styles
		const regex = new RegExp(`(\\/\\/ ${identifier}.*$|/\\* ${identifier}[\\s\\S]*?\\*/|/\\*\\* ${identifier}[\\s\\S]*?\\*/)`, 'gm');
		const newContent = fullText.replace(regex, '');
		
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), newContent);
		vscode.workspace.applyEdit(edit);
	} else if (originalContent !== null) {
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), originalContent);
		vscode.workspace.applyEdit(edit);
		originalContent = null;
	}
}

function updateStatusBar() {
	statusBarItem.text = `LLM Comments: ${isHidden ? 'Hidden' : 'Visible'}`;
	statusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {
	disposables.forEach(d => d.dispose());
}

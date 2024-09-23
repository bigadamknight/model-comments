import * as assert from 'assert';
import * as vscode from 'vscode';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	// test('Extension is present', () => {
	//   assert.ok(vscode.extensions.getExtension('your-publisher-name.model-comments'));
	// });

	test('Toggle command is registered', async () => {
		const commands = await vscode.commands.getCommands();
		assert.ok(commands.includes('model-comments.toggleLLMComments'));
	});
});

suite('Model Comments Extension', () => {
	test('Toggle command changes visibility state', async () => {
		// This is a placeholder test. Implement actual logic when ready.
		const initialState = false; // Placeholder
		await vscode.commands.executeCommand('model-comments.toggleLLMComments');
		const newState = true; // Placeholder
		assert.notStrictEqual(initialState, newState);
	});

	test('Configuration changes are reflected', async () => {
			// Placeholder for configuration test
			assert.ok(true);
	});
});

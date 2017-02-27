var socket = io()

var workspaceData = {
	grid: {
		spacing: 10
	},
	toolbox: document.getElementById('toolbox'),
	trashcan: true
}

var workspace = Blockly.inject('blocklyDiv', workspaceData)

workspace.addChangeListener(updateFunction)

function updateFunction (e) {
	var xml = Blockly.Xml.workspaceToDom(workspace)
	var xmlText = Blockly.Xml.domToText(xml)
	console.log(xmlText)
}
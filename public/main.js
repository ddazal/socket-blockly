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
	socket.emit('c2s xml', xmlText)
}

socket.on('s2c xml', function (xml) {
	setTimeout(function () {
		console.log('Hola mundillo')
		workspace.dispose()
		workspace = Blockly.inject('blocklyDiv', workspaceData)
		var text2dom = Blockly.Xml.textToDom(xml)
		Blockly.Xml.domToWorkspace(text2dom, workspace)
	}, 0)
})

// function refresh (xml) {
// 	console.log('Hola mundillo')
// 	workspace.dispose()
// 	workspace = Blockly.inject('blocklyDiv', workspaceData)
// 	var tex2dom = Blockly.Xml.textToDom(xml)
// 	Blockly.Xml.domToWorkspace(text2dom, workspace)
// }
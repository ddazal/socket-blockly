const $ = require('jquery')
const io = require('socket.io-client')
const socket = io()

var xml, xmlText;

/*======================= Inicialización de Blockly =======================*/

var $toolbox = document.getElementById('toolbox')

$toolbox = Blockly.Options.parseToolboxTree($toolbox)

var workspaceOptions = {
	grid: {
		spacing: 10
	},
	toolbox: $toolbox,
	trashcan: true
}

var workspace = Blockly.inject('blocklyDiv', workspaceOptions)

function updateWorkspace (event) {
  if (event.type == Blockly.Events.UI || event.type == Blockly.Events.CREATE) return

  let xml = Blockly.Xml.workspaceToDom(workspace)
  let xml_text = Blockly.Xml.domToText(xml)

  socket.emit('new xml', xml_text)
}

workspace.addChangeListener(updateWorkspace)

socket.on('rebuild workspace', function (xml) {
	Blockly.Events.disable()
	workspace.clear()
	var xmlData = Blockly.Xml.textToDom(xml)
	Blockly.Xml.domToWorkspace(xmlData, workspace)
	Blockly.Events.enable()
})
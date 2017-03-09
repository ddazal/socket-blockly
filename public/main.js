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

socket.on('build workspace', () => {
	/*
	 * Emito un evento desde el servidor que al ser escuchado por el cliente
	 * inyecta el area de trabajo de Blockly. Lo hice así, para que la variable
	 * workspace no fuera global, sino que solo estuviera definida dentro del
	 * evento
	*/
	var workspace = Blockly.inject('blocklyDiv', workspaceOptions)
})

/*=========================================================================*/

$('button').click(function () {
	/* 
	 * Al principio, con este botón solo emitía el evento al servidor, pero
	 * no sé porque se pierde la referencia del xml si se dejan la tres primeras
	 * líneas de código como parte del evento addChangeListener que viene con 
	 * Blockly...el mismo que usamos paa generar el código en C en pickly.
	 * Metiendo toda esa lógica aquí, se asegura que el evento se emita con el
	 * xml actualizado
	*/
	var thisWorkspace = Blockly.getMainWorkspace()
	xml = Blockly.Xml.workspaceToDom(thisWorkspace)
  xmlText = Blockly.Xml.domToText(xml)
	socket.emit('new xml', { xml: xmlText })
})

socket.on('rebuild workspace', function (data) {
	/*
	 * La reconstrucción de toda la vida
	*/
	var thisWorkspace = Blockly.getMainWorkspace()
	thisWorkspace.dispose()
	thisWorkspace = Blockly.inject('blocklyDiv', workspaceOptions)
	var xmlData = Blockly.Xml.textToDom(data.xml)
	Blockly.Xml.domToWorkspace(xmlData, thisWorkspace)
})
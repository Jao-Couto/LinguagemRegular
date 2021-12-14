var nodes = null;
var edges = null;
var network = null;
var qtd = 0
var qtd_edge = 0
let inicial = null
let final = []
let elem = 0
let path = []



function iniPath() {
    for (var i = 0; i < qtd; i++) {
        if (!path[i])
            path[i] = []
        for (var j = 0; j < qtd; j++)
            if (!path[i][j])
                path[i][j] = null
    }
    console.log(path);
}

function deleteColumn(array, remIdx) {
    return array.map(function (arr) {
        return arr.filter(function (el, idx) { return idx !== remIdx });
    });
};

function deleteRow(arr, row) {
    arr = arr.slice(0); // make copy
    arr.splice(row, 1);
    var x = deleteColumn(arr, row)
    return x;
}
// randomly create some nodes and edges
var nodes = Array(5)
    .fill(null)
    .map((_, i) => ({ id: i, label: `q${i}` }));
var edges = [
    { from: 0, to: 1, label: "a" },
    { from: 0, to: 2, label: "a" },
    { from: 1, to: 3, label: "b" },
    { from: 2, to: 4, label: "c" },
];

var data = {
    nodes: null,
    edges: null,
};
var seed = 2;


function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

var options
function draw() {
    destroy();
    nodes = [];
    edges = [];

    // create a network
    var container = document.getElementById("mynetwork");
    options = {
        locale: 'pt-br',
        edges: {
            arrows: 'to',
        },
        manipulation: {
            addNode: function (data, callback) {
                data.id = qtd;
                data.label = 'q' + qtd;
                qtd++
                iniPath();
                callback(data);
            },
            editNode: function (data, callback) {
                // filling in the popup DOM elements
                document.getElementById("node-operation").innerText = "Edit Node";
                editNode(data, cancelNodeEdit, callback);
            },
            deleteNode: function (data, callback) {
                qtd--
                let selectedNodeId = network.getSelectedNodes()[0]
                final.pop(selectedNodeId)
                if (inicial == selectedNodeId)
                    inicial = 0
                path = deleteRow(path, selectedNodeId)
                console.log(path);
                callback(data)
            },
            deleteEdge: function (data, callback) {
                //qtd_edge--
                let selectedEdgeId = network.getSelectedEdges()
                let edge = network.getConnectedNodes(selectedEdgeId)
                path[edge[0]][edge[1]] = null
                callback(data)
            },
            addEdge: function (data, callback) {
                document.getElementById("edge-operation").innerText = "Add Edge";
                editEdgeWithoutDrag(data, callback);
            },
            editEdge: {
                editWithoutDrag: function (data, callback) {
                    document.getElementById("edge-operation").innerText = "Edit Edge";
                    editEdgeWithoutDrag(data, callback);
                },
            },
        },
    };
    network = new vis.Network(container, data, options);
}

function editNode(data, cancelAction, callback) {
    document.getElementById("node-label").value = data.label;

    if (data.shape == undefined || data.shape != 'triangleDown') {
        document.getElementById("node-inicial").checked = false
    }
    else
        document.getElementById("node-inicial").checked = true

    if (data.borderWidth == undefined || data.borderWidth != 5)
        document.getElementById("node-final").checked = false
    else
        document.getElementById("node-final").checked = true

    document.getElementById("node-saveButton").onclick = saveNodeData.bind(
        this,
        data,
        callback
    );
    document.getElementById("node-cancelButton").onclick = cancelAction.bind(
        this,
        callback
    );
    document.getElementById("node-popUp").style.display = "block";
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
    document.getElementById("node-saveButton").onclick = null;
    document.getElementById("node-cancelButton").onclick = null;
    document.getElementById("node-popUp").style.display = "none";
}

function cancelNodeEdit(callback) {
    clearNodePopUp();
    callback(null);
}

function saveNodeData(data, callback) {
    let selectedNodeId = network.getSelectedNodes()[0]

    data.label = document.getElementById("node-label").value;

    if (document.getElementById("node-inicial").checked) {
        inicial = selectedNodeId
        data.shape = 'triangleDown'
    }
    else {
        data.shape = 'ellipse'
    }
    if (document.getElementById("node-final").checked) {
        final.push(selectedNodeId)
        data.borderWidth = 5
    }
    else {
        final.pop(selectedNodeId)
        data.borderWidth = 1
    }
    clearNodePopUp();
    callback(data);
}



function editEdgeWithoutDrag(data, callback) {
    // filling in the popup DOM elements
    document.getElementById("edge-label").value = '';
    document.getElementById("edge-saveButton").onclick = saveEdgeData.bind(
        this,
        data,
        callback
    );
    document.getElementById("edge-cancelButton").onclick = cancelEdgeEdit.bind(
        this,
        callback
    );
    document.getElementById("edge-popUp").style.display = "block";
}

function clearEdgePopUp() {
    document.getElementById("edge-saveButton").onclick = null;
    document.getElementById("edge-cancelButton").onclick = null;
    document.getElementById("edge-popUp").style.display = "none";
}

function cancelEdgeEdit(callback) {
    clearEdgePopUp();
    callback(null);
}


function saveEdgeData(data, callback) {
    if (typeof data.to === "object") data.to = data.to.id;
    if (typeof data.from === "object") data.from = data.from.id;
    data.label = document.getElementById("edge-label").value;
    data.id = 'e' + qtd_edge;
    qtd_edge++
    path[data.from][data.to] = data.label
    console.log(path);
    clearEdgePopUp();
    callback(data);
}

function init() {
    draw();
}


const dfs = (node) => {
    for (let j = 0; j <= elem; j++) {
        let letras = $('#entrada' + j).val()
        let pos = 0
        let stack = [];
        let aux = false
        stack.push(node);
        while (stack.length > 0) {
            console.log(stack);
            node = stack.pop();
            let fim = final.filter(
                function (final) {
                    return (final == node)
                }
            )
            if (pos != letras.length || fim.length == 0) {
                aux = false
            } else break


            console.log(`we visited ${node}`)
            for (let j = 0; path[node] != undefined && j < path[node].length; j++) {

                if (letras[pos] != undefined && path[node][j] == letras[pos]) {
                    console.log(path[node][j] + '=' + letras[pos]);
                    stack.push(j);
                    aux = true

                }
            }
            if (aux)
                pos++
            console.log('Volta ----------');
        }
        if (aux)
            $('#entrada' + j).css("background-color", "#0f0")
        else
            $('#entrada' + j).css("background-color", "#ff7075")
        console.log('result ' + aux);
    }
}

$(window).on("load", function () {
    $('#nav-er').removeClass("active")
    $('#nav-home').removeClass("active")
    $('#nav-af').addClass("active")
    $('#nav-gr').removeClass("active")

    init();

    $("#moreT").click(() => {
        elem++
        $('#elementosTeste').append(`<div class="input-group m-1 ">
        <input type="text" class="form-control" id="entrada`+ elem + `"> 
    </div>`)

    })

    $('#teste').click(() => {
        if (inicial != null) {
            console.log('--------------------------------------');
            console.log(path);
            dfs(inicial)
        }
        else alert('Selecionar node inicial')

    })

})
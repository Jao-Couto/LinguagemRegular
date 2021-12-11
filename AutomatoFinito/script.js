var nodes = null;
var edges = null;
var network = null;
var qtd = 0
var qtd_edge = 0
let inicial = 0
let final = []

let path = [
    [null, 'a', 'a', null, null]
    , [null, null, null, 'b', null]
    , [null, null, null, null, 'c']
    , [null, null, null, null, null]
    , [null, null, null, null, null]
]



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
            addEdge: function (data, callback) {
                if (data.from == data.to) {
                    var r = confirm("Do you want to connect the node to itself?");
                    if (r != true) {
                        callback(null);
                        return;
                    }
                }
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
    let node = network.body.nodes[selectedNodeId];

    data.label = document.getElementById("node-label").value;

    if (document.getElementById("node-inicial").checked) {
        inicial = selectedNodeId
        node.setOptions({
            shape: 'triangleDown',
        })
    }

    else node.setOptions({
        shape: 'ellipse',
    })

    if (document.getElementById("node-final").checked) {
        final.push(selectedNodeId)
        node.setOptions({
            borderWidth: 5,
        })
    }
    else {
        final.pop(selectedNodeId)
        node.setOptions({
            borderWidth: 1,
        })

    }
    callback(node);
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
    data.id = 'e' + qtd_edge
    qtd_edge++
    path[data.from][data.to] = data.label
    console.log(path);
    clearEdgePopUp();
    callback(data);
}

function init() {
    draw();
}

window.addEventListener("load", () => {
    init();
});

function nextNode(from, label) {
    let teste = path.filter(
        function (path) { return path.label == label && path.from == from }
    );
    console.log('teste');
    console.log(teste);
    return teste
}


const dfs = (node) => {
    let letras = $('#entrada').val()
    let pos = 0
    let stack = [];
    let aux = false
    visited = new Array(qtd);
    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }
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
        } else return aux


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
    return aux
}

$(window).on("load", function () {

    $('#entrada').keyup(() => {
        console.log('--------------------------------------');
        if (dfs(inicial))
            $('#entrada').css("background-color", "#0f0")
        else
            $('#entrada').css("background-color", "#ff7075")
        console.log('result ' + dfs(inicial));

    })

})
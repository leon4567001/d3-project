var g = new dagreD3.graphlib.Graph()
  .setGraph({})
  .setDefaultEdgeLabel(function() { return {}; });

// Here we"re setting nodeclass, which is used by our custom drawNodes function
// below.
g.setNode(0,  { label: "来料接收",       class: "type-TOP" });
g.setNode(1,  { label: "来料检验",         class: "type-S" });
g.setNode(2,  { label: "来料存储",        class: "type-NP" });
g.setNode(3,  { label: "化工料配置",        class: "type-DT" });
g.setNode(4,  { label: "化工料抽料",      class: "type-TK" });
g.setNode(5,  { label: "日料罐储存",        class: "type-VP" });
g.setNode(6,  { label: "生产准备",       class: "type-VBZ" });
g.setNode(7,  { label: "清模",        class: "type-TK" });
g.setNode(8,  { label: "喷脱模剂",        class: "type-NP" });
g.setNode(9,  { label: "外协件放置",        class: "type-DT" });
g.setNode(10, { label: "浇注",        class: "type-TK" });
g.setNode(11, { label: "熟化",        class: "type-NN" });
g.setNode(12, { label: "起模",   class: "type-TK" });
g.setNode(13, { label: "开孔",         class: "type-." });
g.setNode(14, { label: "首检",  class: "type-TK" });
g.setNode(15,{label:"后道处理", class:"type-TOP"});
g.setNode(16,{label:"过程检查", class:"type-TOP"});
g.setNode(17,{label:"上悬挂链/料架车摆放", class:"type-TOP"});
g.setNode(18,{label:"后熟化", class:"type-TOP"});
g.setNode(19,{label:"终检", class:"type-TOP"});
g.setNode(20,{label:"产品特性检查", class:"type-TOP"});
g.setNode(21,{label:"成品包装", class:"type-TOP"});
g.setNode(22,{label:"成品审核", class:"type-TOP"});
g.setNode(23,{label:"成品储存", class:"type-TOP"});
g.setNode(25,{label:"发运", class:"type-TOP"});

g.nodes().forEach(function(v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Set up edges, no special attributes.
g.setEdge(0, 1);
g.setEdge(1, 2);
// g.setEdge(2, 3, {label: 'label text'});
g.setEdge(2, 3);
g.setEdge(3, 4);
g.setEdge(4, 5);
g.setEdge(5, 6);
g.setEdge(6, 7);
g.setEdge(7, 8);
g.setEdge(8, 9);
g.setEdge(9, 10);
g.setEdge(10, 11);
g.setEdge(11,12);
g.setEdge(12, 13);
g.setEdge(13, 14);
g.setEdge(14, 15);
g.setEdge(15, 16);
g.setEdge(16, 17);
g.setEdge(17, 18);
g.setEdge(18, 19);
g.setEdge(19, 20);
g.setEdge(20, 21);
g.setEdge(21, 22);
g.setEdge(22, 23);
g.setEdge(23, 25);

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

//define the click function for nodes
$("g.node").click(function () {
    var upText = this.innerHTML;
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
    var doText = upText.match(reg).join("");
    console.log(upText);
    console.log(doText);
    $("#searchValue").val(doText);
});

// Center the graph
var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);
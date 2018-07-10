var forceTree3 = function(setting) {


    var relations = setting.relations,
        links = setting.links,
        selector = setting.selector
    var nodes = {}

    // 上传到服务器需要修改
    var pathUrl = '/'

    d3.select(selector).selectAll('svg').remove()


    links.forEach(function(link) {

        link.source = nodes[link.source] || (nodes[link.source] = {
            name: link.source
        })

        link.target = nodes[link.target] || (nodes[link.target] = {
            name: link.target
        })

        link.aa = '11'
    });

    var width = 960,
        height = 960;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(160)
        .charge(-600)
        .on("tick", tick)
        .start();

    var svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height);


    var link = svg.selectAll(".link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link");

    var color = ['#1a1925', '#042c3b', '#1f242b']
    var lineColor = ['#ff7e00', '#e8b93e']

    link.style("stroke", function(d) {

            var source = d.target.name,
                isShow,
                lineObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == source) {

                    isShow = relations[i].show
                }
            }

            if (isShow) {

                return lineColor[d.level]
            } else {
                return '#1c346b'
            }

        })
        .style("stroke-width", 2)

    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        /*        .on("mouseover", mouseover)
                .on("mouseout", mouseout)*/
        .call(force.drag);

    node.append("circle")
        .attr('r', function(d, i) {
            
            var dname = d.name,
                isShow,
                index,
                cirlceObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {
                    index = relations[i].index
                    isShow = relations[i].show
                }
            }

            if (index === 0) {

                return 28
            } else if (index === 1) {
                return 26
            } else if (index === 2) {
                return 15
            }
        })
        .style("fill", function(d) {

            var dname = d.name,
                isShow,
                cirlceObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    isShow = relations[i].show
                }
            }

            if (isShow) {

                return color[d.index]
            } else {

                return '#1c346b'
            }
        })

    node.append("svg:image")
        .attr("class", "image")
        .attr("xlink:href", function(d, i) {

            var dname = d.name,
                index,
                isDrawImg,
                imageObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    index = relations[i].index
                    isDrawImg = relations[i].show
                }
            }

            $(imageObj).data('showBig', true)

            if (isDrawImg) {

                if (index == 0) {

                    return "images/mProject.png"
                } else if (index == 1) {

                    return "images/mCompany.png"
                } else if (index == 2) {

                    return "images/mPerson.png"
                }

            } else {

                return ''
            }
        })
        .on('click', function(d, i) {

            var obj = d3.select(this)

            var dname = d.name,
                index,
                isCanClick,
                imageObj = d3.select(this)[0][0],
                showBig = $(imageObj).data('showBig')

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    index = relations[i].index
                    isCanClick = relations[i].show
                }
            }

            if (isCanClick) {

                if (showBig) {

                    if (index == 0) {

                        d3.select(this)
                            .attr('xlink:href', "images/project.png")
                    } else if (index == 1) {

                        d3.select(this)
                            .attr('xlink:href', "images/company.png")
                    } else if (index == 2) {

                        d3.select(this)
                            .attr('xlink:href', "images/person.png")
                    }
                    d3.select(this)
                        .attr('width', '124px')
                        .attr('height', '124px')
                        .attr("x", "-62px")
                        .attr("y", "-62px")

                    var circle = $(this).parent().find('circle')[0]

                    $(imageObj).data('showBig', false)

                    d3.select(circle).attr('r', 62)

                } else {

                    if (index === 0) {

                        d3.select(this)
                            .attr("x", "-32px")
                            .attr("y", "-32px")
                            .attr("width", "64px")
                            .attr("height", "64px")
                            .attr('xlink:href', "images/mProject.png")
                    } else if (index === 1) {

                        d3.select(this)
                            .attr("x", "-31px")
                            .attr("y", "-31px")
                            .attr("width", "62px")
                            .attr("height", "62px")
                            .attr('xlink:href', "images/mCompany.png")
                    } else if (index === 2) {

                        d3.select(this)
                            .attr("x", "-15px")
                            .attr("y", "-15px")
                            .attr("width", "30px")
                            .attr("height", "30px")
                            .attr('xlink:href', "images/mPerson.png")
                    }

                    var circle = $(this).parent().find('circle')[0]

                    $(imageObj).data('showBig', true)

                    d3.select(circle).attr('r', function() {

                        if (index === 0) {

                            return 28
                        } else if (index === 1) {
                            return 26
                        } else {
                            return 15
                        }
                    })

                }
            } else {

                var confirm = window.confirm("确认开通VIP通道")

                if (confirm && showBig) {

                    if (index === 0) {

                        d3.select(this)
                            .attr("x", "-32px")
                            .attr("y", "-32px")
                            .attr("width", "64px")
                            .attr("height", "64px")
                            .attr('xlink:href', "images/mProject.png")
                    } else if (index === 1) {

                        d3.select(this)
                            .attr("x", "-31px")
                            .attr("y", "-31px")
                            .attr("width", "62px")
                            .attr("height", "62px")
                            .attr('xlink:href', "images/mCompany.png")
                    } else if (index === 2) {

                        d3.select(this)
                            .attr("x", "-15px")
                            .attr("y", "-15px")
                            .attr("width", "30px")
                            .attr("height", "30px")
                            .attr('xlink:href', "images/mPerson.png")
                    }

                    var circle = $(this).parent().find('circle')[0]

                    $(imageObj).data('showBig', true)

                    d3.select(circle).attr('r', function() {

                        if (index === 0) {

                            return 28
                        } else if (index === 1) {
                            return 26
                        } else {
                            return 15
                        }
                    })

                } else {

                }
            }
        })
        .attr("x", function(d,i) {

            var dname = d.name,
                index,
                isCanClick,
                imageObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    index = relations[i].index
                }
            }

            if (index === 0 ){
                
                return '-32px'
            } else if (index === 1) {

                return '-28px'
            } else if (index === 2) {

                return  '-15px'
            }
        })
        .attr("y",  function(d,i) {

            var dname = d.name,
                index,
                isCanClick,
                imageObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    index = relations[i].index
                }
            }

            if (index === 0 ){
                
                return '-32px'
            } else if (index === 1) {

                return '-28px'
            } else if (index === 2) {

                return  '-15px'
            }
        })
        .attr("width",  function(d,i) {

            var dname = d.name,
                index,
                isCanClick,
                imageObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    index = relations[i].index
                }
            }

            if (index === 0 ){
                
                return '64px'
            } else if (index === 1) {

                return '56px'
            } else if (index === 2) {

                return  '30px'
            }
        })
        .attr("height",  function(d,i) {

            var dname = d.name,
                index,
                isCanClick,
                imageObj = d3.select(this)[0][0]

            for (var i = 0; i < relations.length; i++) {

                if (relations[i].obj == dname) {

                    index = relations[i].index
                }
            }

            if (index === 0 ){
                
                return '64px'
            } else if (index === 1) {

                return '56px'
            } else if (index === 2) {

                return  '30px'
            }
        })
        .style('cursor', 'pointer')

    node.append("svg:title")
        .text(function(d) {
            return d.name;
        });

    function tick() { //打点更新坐标
        link
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        node
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
    }

    function imageClick() {

        var obj = d3.select(this)

        var dname = d.name,
            index

        for (var i = 0; i < relations.length; i++) {

            if (relations[i].obj == dname) {

                index = relations[i].index
            }
        }

        $(this).data('mIndex', index)

        if (index == 0) {

            d3.select(this)
                .attr('width', '124px')
                .attr('height', '124px')
                .attr('xlink:href', "images/project.png")
        }
    }

    function mouseover() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 60);
    }

    function mouseout() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", function(d, i) {

                if (d.index == 0) {

                    return 28
                } else if (d.index == 1) {
                    return 26
                } else {
                    return 15
                }
            })
    }
}
import d3 from "d3";
import d3tip from "d3-tip";
import ContextMenu from "./context_menu.es6.js";
import {Spouse, Child, Male} from "../models/symbols.es6.js";

class FamilyGraphView {

    constructor(family) {
        this.family = family;
        this.width = 800;
        this.height = 600;
        this.menu = new ContextMenu();
    }

    createSvgContainer() {
        if (!this.svg) {
            this.svg = d3.select("body")
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
        }
        this.svg.selectAll("*").remove();
    }


    generateMenuItems(controller) {
        var self = this;
        this.menu.clearAll();
        this.menu.addMenuItems([{
            title: "Wifes",
            group: "Find",
            action: (element, data) => {
                controller.highlightFor("wifes", data);
            },
            canShow: (human) => {
                return self.family.wifes(human).length > 0;
            }
          }, {
            title: "Husbands",
            group: "Find",
            action: (element, data) => {
                controller.highlightFor("husbands", data);
            },
            canShow: (human) => {
                return self.family.husbands(human).length > 0;
            }
        }, {
            title: "Siblings",
            group: "Find",
            action: (element, data) => {
                controller.highlightFor("siblings", data);
            },
            canShow: (human) => {
                return self.family.siblings(human).length > 0;
            }
        }, {
          title: "Brothers",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("brothers", data);
          },
          canShow: (human) => {
              return self.family.brothers(human).length > 0;
          }
        }, {
            title: "Sisters",
            group: "Find",
            action: (element, data) => {
                controller.highlightFor("sisters", data);
            },
            canShow: (human) => {
                return self.family.sisters(human).length > 0;
            }
        }, {
          title: "Parents",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("parents", data);
          },
          canShow: (human) => {
              return self.family.parents(human).length > 0;
          }
        }, {
          title: "Sons",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("sons", data);
          },
          canShow: (human) => {
              return self.family.sons(human).length > 0;
          }
        }, {
          title: "Daughters",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("daughters", data);
          },
          canShow: (human) => {
              return self.family.daughters(human).length > 0;
          }
        }, {
          title: "Children",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("children", data);
          },
          canShow: (human) => {
              return human.hasChildren();
          }
        }, {
          title: "Granddaughters",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("grandDaughters", data);
          },
          canShow: (human) => {
              return self.family.grandDaughters(human).length > 0;
          }
        }, {
          title: "Grandsons",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("grandSons", data);
          },
          canShow: (human) => {
              return self.family.grandSons(human).length > 0;
          }
        }, {
          title: "Grandchildren",
          group: "Find",
          action: (element, data) => {
              controller.highlightFor("grandChildren", data);
          },
          canShow: (human) => {
              return self.family.grandChildren(human).length > 0;
          }
        }, {
          title: "Child",
          group: "Add",
          action: (element, data) => {
              controller.renderAddHumanView(data, Child);
          },
          canShow: (human) => {
              return human.isMarried();
          }
        }, {
          title: "Spouse",
          group: "Add",
          action: (element, data) => {
              controller.renderAddHumanView(data, Spouse);
          },
          canShow: (human) => {
              return !human.isMarried();
          }
        }]);
    }

    render(controller) {
        let { nodes, links } = controller.generateNodesAndLinks();
        this.createSvgContainer();
        this.generateMenuItems(controller);

        let layout = d3.layout.force();
        let fill = d3.scale.category20();
        let tip = d3tip(d3);
        let tooltip = tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(function(d) {
                return d.name;
            });
        this.svg.call(tooltip);

        let link = this.svg.selectAll("line")
            .data(links)
            .enter()
            .append("svg:line")
            .attr("class", "link")
            .attr("class", (d) => {
                if (d.type === Spouse) {
                    return "spouse-link";
                }
                else if (d.type === Child) {
                    return "child-link";
                }
            });

        let node = this.svg.selectAll("circle")
            .data(nodes)
            .enter().append("svg:circle")
            .attr("r", 20 - .75)
            .attr("class", (d) => {
                if (d.highlight) {
                    return "highlight";
                }
                else if (d.sex === Male) {
                    return "male";
                }
                else {
                    return "female";
                }
            })
            .style("stroke", function(d) {
                return d3.rgb(fill(d.group)).darker();
            })
            .on("mouseover", tooltip.show)
            .on("mouseout", tooltip.hide)
            .on("contextmenu", this.menu.generate())
            .call(layout.drag);

        layout.charge(-600);
        layout.linkDistance((d) => {
            if (d.type === Spouse) {
                return 50;
            }
            return 90;
        });
        layout.size([this.width, this.height]);
        layout.nodes(nodes);
        layout.links(links);

        layout.on("tick", () => {
            node.attr("cx", (d) => { return d.x; });
            node.attr("cy", (d) => { return d.y; });

            link.attr("x1", (d) => { return d.source.x; });
            link.attr("y1", (d) => { return d.source.y; });
            link.attr("x2", (d) => { return d.target.x; });
            link.attr("y2", (d) => { return d.target.y; });
        });
        layout.start();
    }
}

export default FamilyGraphView;

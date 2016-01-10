import d3 from "d3";
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
        this.createSvgPatterns();
    }

    createSvgPatterns() {
        this.defs = this.svg.append("svg:defs");
        this.defs.append("svg:pattern")
               .attr("id", "female-image")
               .attr("width", "40")
               .attr("height", "40")
               .attr("x", "0")
               .attr("y", "0")
               .append("svg:image")
               .attr("width", "40")
               .attr("height", "40")
               .attr("x", "0")
               .attr("y", "0")
               .attr("xlink:href", "images/queen.jpg");
        this.defs.append("svg:pattern")
              .attr("id", "male-image")
              .attr("width", "40")
              .attr("height", "40")
              .attr("x", "0")
              .attr("y", "0")
              .append("svg:image")
              .attr("width", "40")
              .attr("height", "40")
              .attr("x", "0")
              .attr("y", "0")
              .attr("xlink:href", "images/king.jpg");
        this.defs.append("svg:pattern")
              .attr("id", "highlight-male-image")
              .attr("width", "60")
              .attr("height", "60")
              .attr("x", "0")
              .attr("y", "0")
              .append("svg:image")
              .attr("width", "60")
              .attr("height", "60")
              .attr("x", "0")
              .attr("y", "0")
              .attr("xlink:href", "images/king.jpg");
        this.defs.append("svg:pattern")
              .attr("id", "highlight-female-image")
              .attr("width", "60")
              .attr("height", "60")
              .attr("x", "0")
              .attr("y", "0")
              .append("svg:image")
              .attr("width", "60")
              .attr("height", "60")
              .attr("x", "0")
              .attr("y", "0")
              .attr("xlink:href", "images/queen.jpg");
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

        let nodeEnter = this.svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("g");

        nodeEnter.append("svg:circle")
            .attr("r", (d) => {
                if(d.highlight) {
                    return 30 - 0.75;
                }
                else {
                    return 20 - 0.75;
                }
            })
            .attr("class", (d) => {
                let classes = [];
                if (d.highlight) {
                    classes.push("highlight");
                }
                if (d.sex === Male) {
                    classes.push("male");
                }
                else {
                    classes.push("female");
                }
                return classes.join(" ");
            })
            .on("contextmenu", this.menu.generate())
            .call(layout.drag);

        nodeEnter.append("text")
                 .attr("dy", (d) => {
                     if(d.highlight) {
                         return -35;
                     }
                     else {
                         return -25;
                     }
                 })
                 .text((d) => { return d.name; });

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
            nodeEnter.attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });

            link.attr("x1", (d) => { return d.source.x; });
            link.attr("y1", (d) => { return d.source.y; });
            link.attr("x2", (d) => { return d.target.x; });
            link.attr("y2", (d) => { return d.target.y; });
        });
        layout.start();
    }
}

export default FamilyGraphView;

import d3 from "d3";
import _ from "lodash";

class ContextMenu {
    constructor() {
        this.menuItems = [];
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
    }

    addMenuItems(menuItems) {
        _.forEach(menuItems, (menuItem) => {
            this.addMenuItem(menuItem);
        });
    }

    clearAll() {
        this.menuItems = [];
    }

    createMenu() {
        // create the div element that will hold the context menu
        d3.selectAll(".d3-context-menu").data([1])
            .enter()
            .append("div")
            .attr("class", "d3-context-menu");

        // close menu
        d3.select("body").on("click.d3-context-menu", () => {
            d3.select(".d3-context-menu").style("display", "none");
        });
    }

    generate() {
        let self = this;
        self.createMenu();

        return (data, index) => {
            let elm = this;
            d3.selectAll(".d3-context-menu").html("");
            let list = d3.selectAll(".d3-context-menu").append("ul");
            let filteredMenuItems = _.filter(self.menuItems, (menuItem) => {
                if(menuItem.canShow) {
                    return menuItem.canShow(data);
                }
                return true;
            });
            let groupedMenuItems = _.groupBy(filteredMenuItems, "group");
            _.forEach(groupedMenuItems, function(menuItems, group) {
                let groupLi = list.append("li").text(group);
                groupLi.append("ul")
                .selectAll("li")
                .data(menuItems)
                .enter()
                .append("li")
                .html((d) => {
                    return d.title;
                }).on("click", function(menuItem) {
                    menuItem.action(elm, data, index);
                    d3.select(".d3-context-menu").style("display", "none");
                });
            });
            d3.select(".d3-context-menu")
                .style("left", (d3.event.pageX - 2) + "px")
                .style("top", (d3.event.pageY - 2) + "px")
                .style("display", "block");

            d3.event.preventDefault();
        };
    }
}

export default ContextMenu;

import d3 from "d3";

class ContextMenu {
    constructor() {
        this.menuItems = [];
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
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
        var self = this;
        self.createMenu();

        return (data, index) => {
            var elm = this;
            d3.selectAll(".d3-context-menu").html("");
            var list = d3.selectAll(".d3-context-menu").append("ul");
            list.selectAll("li").data(self.menuItems).enter()
                .append("li")
                .html(function(d) {
                    return d.title;
                })
                .on("click", function(menuItem) {
                    menuItem.action(elm, data, index);
                    d3.select(".d3-context-menu").style("display", "none");
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

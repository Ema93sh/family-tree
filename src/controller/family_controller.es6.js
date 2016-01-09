import {Male, Female} from "../models/symbols.es6.js";
import Person from "../models/person.es6.js";
import _ from "lodash";

class FamilyController {

    constructor(familyGraph, familyGraphView) {
        this.familyGraph = familyGraph;
        this.familyGraphView = familyGraphView;
    }

    generateSampleData() {
        let adam = new Person("Adam", Male);
        let eve = new Person("Eve", Female);
        let sam = new Person("Sam", Male);
        let eva = new Person("Eva", Female);
        let marry = new Person("Marry", Female);
        let chris = new Person("Chris", Male);
        let dean = new Person("Dean", Male);

        this.familyGraph.marry(adam, eve);
        this.familyGraph.addChildren(adam, eve, [sam, eva, marry]);

        this.familyGraph.marry(chris, eva);
        this.familyGraph.addChild(chris, eva, dean);
    }

    generateNodesAndLinks() {
        var links = this.familyGraph.generateLinksFor(this.familyGraph.rootHuman.id);
        var nodeIds = [];
        for(var link of links) {
            nodeIds = _.union(nodeIds, [link.source, link.target]);
        }

        let nodes = this.familyGraph.getNodes(nodeIds);

        links = _.map(links, function(l) {
            var targetIndex = nodeIds.indexOf(l.target);
            var sourceIndex = nodeIds.indexOf(l.source);
            return {source: sourceIndex, target: targetIndex, type: l.type};
        });
        return {nodes: nodes, links: links};
    }

    clearAllHighlights() {
        _.forEach(this.familyGraph.nodes, function(human) {
            human.highlight = false;
        });
    }

    highlightFor(relationship, forHuman) {
        this.clearAllHighlights();
        this.familyGraph[relationship](forHuman).forEach( (h) => { h.highlight = true; });
        this.renderView();
    }


    renderView() {
        this.familyGraphView.render(this);
    }

}

export default FamilyController;

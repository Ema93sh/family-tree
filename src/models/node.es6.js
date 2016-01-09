import _ from "lodash";
import generateUniqueId from "../utils/graph_utils.es6.js";

class Node {
    constructor() {
        this.id = generateUniqueId();
        this.links = {};
    }

    getLinkForType(type) {
        var nodesWithLinkType = [];
        _.forEach(this.links, function(linkType, nodeId) {
            if (type === linkType) {
                nodesWithLinkType.push(nodeId);
            }
        });
        return nodesWithLinkType;
    }

    getLinks() {
        var self = this;
        var links = [];
        _.forEach(this.links, function(value, key) {
            links.push({source: self.id, target: key, type: value});
        });
        return links;
    }

}

export default Node;

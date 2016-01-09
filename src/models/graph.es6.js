import _ from "lodash";

class Graph {
    constructor(name) {
        this.name = name;
        this.nodes = {};
    }

    getNode(nodeId) {
        return this.nodes[nodeId];
    }

    getNodes(nodeIds) {
        var self = this;
        return _.map(nodeIds, function(nodeId) {
            return self.getNode(nodeId);
        });
    }

    addNode(node) {
        if (this.nodes[node.id] === undefined) {
            this.nodes[node.id] = node;
        }
    }

    addNodes(nodes) {
        for (var node of nodes) {
            this.addNode(node);
        }
    }

    addEdge(fromNode, toNode, relationType) {
        this.nodes[fromNode.id].links[toNode.id] = relationType;
    }

    generateLinksFor(nodeId, visitedNodeIds = []) {
        visitedNodeIds.push(nodeId);
        let links = this.getNode(nodeId).getLinks();
        var allLinks = [];
        for (var link of links) {
            if(visitedNodeIds.indexOf(link.target) === -1) {
                allLinks.push(link);
            }
        }
        let targetIds = _(links).pluck("target").filter(function(targetId) {
            return visitedNodeIds.indexOf(targetId) === -1;
        }).value();
        visitedNodeIds = _.union(visitedNodeIds, targetIds);
        for( var targetId of targetIds ) {
            allLinks = _.union(allLinks, this.generateLinksFor(targetId, visitedNodeIds));
        }
        return allLinks;
    }

    getNodeIdsWithLinkChain(fromId, linkChain) {
        let currentNode = this.getNode(fromId);
        let linkToCheck = _.head(linkChain);
        let nodeIdsWithLink = [];
        if(typeof linkToCheck === "function") {
            nodeIdsWithLink = linkToCheck(currentNode) ? [currentNode.id] : [];
        }
        else {
            nodeIdsWithLink = currentNode.getLinkForType(linkToCheck);
        }

        if (_.tail(linkChain).length === 0) {
            return nodeIdsWithLink;
        }

        var nodeIds = [];
        for (var nodeId of nodeIdsWithLink) {
            var nextLink = _.tail(linkChain);
            nodeIds = _.union(nodeIds, this.getNodeIdsWithLinkChain(nodeId, nextLink));
        }

        return _.filter(nodeIds, function(nId) {
            return nId !== fromId;
        });
    }

    getNodesWithLinkChain(fromNode, linkChain) {
        var self = this;
        var nodeIds = self.getNodeIdsWithLinkChain(fromNode.id, linkChain);
        return _.map(nodeIds, function(nodeId) {
            return self.getNode(nodeId);
        });
    }
}

export default Graph;

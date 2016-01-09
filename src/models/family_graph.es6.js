import Graph from "./graph.es6.js";
import {Husband, Wife, Parent, Child, Male, Female} from "./symbols.es6.js";

function isMalePredicate (person){
    return person.sex === Male;
}

function isFemalePredicate (person) {
    return person.sex === Female;
}

class FamilyGraph extends Graph {

    constructor(name) {
        super(name);
    }

    addNode(human) {
        if(!this.rootHuman) {
            this.rootHuman = human;
        }
        super.addNode(human);
    }

    marry(husband, wife) {
        this.addNodes([husband, wife]);
        this.addEdge(husband, wife, Wife);
        this.addEdge(wife, husband, Husband);
    }

    addChild(husband, wife, child) {
        this.addNode(child);
        this.addEdge(husband, child, Child);
        this.addEdge(child, husband, Parent);

        this.addEdge(wife, child, Child);
        this.addEdge(child, wife, Parent);
    }

    addChildren(husband, wife, children) {
        for (var child of children) {
            this.addChild(husband, wife, child);
        }
    }

    wifes(human) {
        return this.getNodesWithLinkChain(human, [Wife]);
    }

    husbands(human) {
        return this.getNodesWithLinkChain(human, [Husband]);
    }

    siblings(human) {
        return this.getNodesWithLinkChain(human, [Parent, Child]);
    }

    brothers(human) {
        return this.getNodesWithLinkChain(human, [Parent, Child, isMalePredicate]);
    }

    sisters(human) {
        return this.getNodesWithLinkChain(human, [Parent, Child, isFemalePredicate]);
    }

    parents(human) {
        return this.getNodesWithLinkChain(human, [Parent]);
    }

    father(human) {
        return this.getNodesWithLinkChain(human, [Parent, isMalePredicate]);
    }

    children(human) {
        return this.getNodesWithLinkChain(human, [Child]);
    }

    sons(human) {
        return this.getNodesWithLinkChain(human, [Child, isMalePredicate]);
    }

    daughters(human) {
        return this.getNodesWithLinkChain(human, [Child, isFemalePredicate]);
    }

    mother(human) {
        return this.getNodesWithLinkChain(human, [Parent, isFemalePredicate]);
    }

    grandFather(human) {
        return this.getNodesWithLinkChain(human, [Parent, Parent, isMalePredicate]);
    }

    grandMother(human) {
        return this.getNodesWithLinkChain(human, [Parent, Parent, isFemalePredicate]);
    }

    grandChildren(human) {
        return this.getNodesWithLinkChain(human, [Child, Child]);
    }

    grandDaughters(human) {
        return this.getNodesWithLinkChain(human, [Child, Child, isFemalePredicate]);
    }

    grandSons(human) {
        return this.getNodesWithLinkChain(human, [Child, Child, isMalePredicate]);
    }

}

export default FamilyGraph;

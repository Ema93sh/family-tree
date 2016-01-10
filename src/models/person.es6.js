import Node from "./node.es6.js";
import {Spouse, Child} from "./symbols.es6.js";

class Person extends Node {
    constructor(name, sex) {
        super();
        this.name = name;
        this.sex = sex;
    }

    isMarried() {
        let spouse = this.getLinkForType(Spouse);
        return spouse.length > 0;
    }

    hasChildren() {
        let children = this.getLinkForType(Child);
        return children.length > 0;
    }
}

export default Person;

import Node from "./node.es6.js";

class Person extends Node {
    constructor(name, sex) {
        super();
        this.name = name;
        this.sex = sex;
    }
}

export default Person;

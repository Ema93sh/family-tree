import FamilyController from "./controller/family_controller.es6.js";
import FamilyGraph from "./models/family_graph.es6.js";
import FamilyGraphView from "./views/family_graph_view.es6.js";


let adamFamilyGraph = new FamilyGraph("Adam Family");
let adamFamilyGraphView = new FamilyGraphView(adamFamilyGraph);
let familyController = new FamilyController(adamFamilyGraph, adamFamilyGraphView);

console.log("Generating sample data...");
familyController.generateSampleData();

console.log("Rendering View...");
familyController.renderView();

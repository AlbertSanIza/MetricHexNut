//Author-Albert Sanchez
//Description-Create a Metric Hex Nut
function run(context) {

  "use strict";

  var defaultMetricHexNutName = 'Hex Nut';
  var metricHexNutMatrix = [
    {nominalSize: 'M1.6', threadPitch: 0.35, widthAcrossFlatsMax: 3.2, widthAcrossFlatsMin: 3.02, widthAcrossCornersMin: 3.41, thicknessMax: 1.3, thicknessMin: 1.05},
    {nominalSize: 'M2', threadPitch: 0.4, widthAcrossFlatsMax: 4, widthAcrossFlatsMin: 3.82, widthAcrossCornersMin: 4.32, thicknessMax: 1.6, thicknessMin: 1.35},
    {nominalSize: 'M2.5', threadPitch: 0.45, widthAcrossFlatsMax: 5, widthAcrossFlatsMin: 4.82, widthAcrossCornersMin: 5.45, thicknessMax: 2, thicknessMin: 1.75},
    {nominalSize: 'M3', threadPitch: 0.5, widthAcrossFlatsMax: 5.5, widthAcrossFlatsMin: 5.32, widthAcrossCornersMin: 6.01, thicknessMax: 2.4, thicknessMin: 2.15},
    {nominalSize: 'M4', threadPitch: 0.7, widthAcrossFlatsMax: 7, widthAcrossFlatsMin: 6.78, widthAcrossCornersMin: 7.66, thicknessMax: 3.2, thicknessMin: 2.9},
    {nominalSize: 'M5', threadPitch: 0.8, widthAcrossFlatsMax: 8, widthAcrossFlatsMin: 7.78, widthAcrossCornersMin: 8.79, thicknessMax: 4.7, thicknessMin: 4.4},
    {nominalSize: 'M6', threadPitch: 1, widthAcrossFlatsMax: 10, widthAcrossFlatsMin: 9.78, widthAcrossCornersMin: 11.05, thicknessMax: 5.2, thicknessMin: 4.9},
    {nominalSize: 'M10', threadPitch: 1.5, widthAcrossFlatsMax: 16, widthAcrossFlatsMin: 15.73, widthAcrossCornersMin: 17.77, thicknessMax: 8.4, thicknessMin: 8.04},
    {nominalSize: 'M12', threadPitch: 1.75, widthAcrossFlatsMax: 18, widthAcrossFlatsMin: 17.73, widthAcrossCornersMin: 20.03, thicknessMax: 10.8, thicknessMin: 10.37},
    {nominalSize: 'M14', threadPitch: 2, widthAcrossFlatsMax: 21, widthAcrossFlatsMin: 20.67, widthAcrossCornersMin: 23.35, thicknessMax: 12.8, thicknessMin: 12.1},
    {nominalSize: 'M16', threadPitch: 2, widthAcrossFlatsMax: 24, widthAcrossFlatsMin: 23.67, widthAcrossCornersMin: 26.75, thicknessMax: 14.8, thicknessMin: 14.1},
    {nominalSize: 'M20', threadPitch: 2.5, widthAcrossFlatsMax: 30, widthAcrossFlatsMin: 29.16, widthAcrossCornersMin: 32.95, thicknessMax: 18, thicknessMin: 16.9},
    {nominalSize: 'M24', threadPitch: 3, widthAcrossFlatsMax: 36, widthAcrossFlatsMin: 35, widthAcrossCornersMin: 39.55, thicknessMax: 21.5, thicknessMin: 20.2},
    {nominalSize: 'M30', threadPitch: 3.5, widthAcrossFlatsMax: 46, widthAcrossFlatsMin: 45, widthAcrossCornersMin: 50.85, thicknessMax: 25.6, thicknessMin: 24.3},
    {nominalSize: 'M36', threadPitch: 4, widthAcrossFlatsMax: 55, widthAcrossFlatsMin: 53.8, widthAcrossCornersMin: 60.78, thicknessMax: 31, thicknessMin: 29.4},
    {nominalSize: 'M42', threadPitch: 4.5, widthAcrossFlatsMax: 65, widthAcrossFlatsMin: 63.1, widthAcrossCornersMin: 73.1, thicknessMax: 34, thicknessMin: 32.4},
    {nominalSize: 'M48', threadPitch: 5, widthAcrossFlatsMax: 75, widthAcrossFlatsMin: 73.1, widthAcrossCornersMin: 82.6, thicknessMax: 38, thicknessMin: 36.4},
    {nominalSize: 'M56', threadPitch: 5.5, widthAcrossFlatsMax: 85, widthAcrossFlatsMin: 82.8, widthAcrossCornersMin: 93.56, thicknessMax: 45, thicknessMin: 43.4},
    {nominalSize: 'M64', threadPitch: 6, widthAcrossFlatsMax: 95, widthAcrossFlatsMin: 92.8, widthAcrossCornersMin: 104.86, thicknessMax: 51, thicknessMin: 49.1}
  ];

  var defaultBoltName = 'Bolt';
  var defaultHeadDiameter = 0.75;
  var defaultBodyDiameter = 0.5;
  var defaultHeadHeight = 0.3125;
  var defaultBodyLength = 2.0;
  var defaultCutAngle = 30.0 * (Math.PI / 180);
  var defaultChamferDistance = 0.03845;
  var defaultFilletRadius = 0.02994;

  var app = adsk.core.Application.get(), ui;
  if (app) {
    ui = app.userInterface;
  }
  var product = app.activeProduct;
  var design = adsk.fusion.Design(product);
  if (!design) {
    ui.messageBox('It is not supported in current workspace, please change to MODEL workspace and try again.');
    adsk.terminate();
    return;
  }
  var newComp;
  function createNewComponent() {
    var rootComp = design.rootComponent;
    var allOccs = rootComp.occurrences;
    var newOcc = allOccs.addNewComponent(adsk.core.Matrix3D.create());
    newComp = newOcc.component;
  }
  var createCommandDefinition = function() {
    var commandDefinitions = ui.commandDefinitions;
    var cmDef = commandDefinitions.itemById('MetricHexNut');
    if (!cmDef) {
      cmDef = commandDefinitions.addButtonDefinition('MetricHexNut', 'Create Metric Hex Nut', 'Create a Metric Hex Nut.', './resources');
    }
    return cmDef;
  };
  var onCommandCreated = function(args) {
    try {
      var command = args.command;
      command.isRepeatable = false;
      command.execute.add(onCommandExecuted);
      command.executePreview.add(onCommandExecuted);
      command.destroy.add(function() {
        adsk.terminate();
      });
      var inputs = command.commandInputs;
      inputs.addStringValueInput('metricHexNutName', 'Hex Nut Name', defaultMetricHexNutName);
      var initNominalSize = inputs.addDropDownCommandInput('nominalSize', 'Nominal Size', adsk.core.DropDownStyles.TextListDropDownStyle);
      initNominalSize.listItems.add(metricHexNutMatrix[0].nominalSize, true, '');
      for (var i = 1; i < metricHexNutMatrix.length; i++) {
        initNominalSize.listItems.add(metricHexNutMatrix[i].nominalSize, false, '');
      }
      initNominalSize.listItems.add('Custom', false, '');
      var initThreadPitch = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].threadPitch);
      inputs.addValueInput('threadPitch', 'Thread Pitch','cm',initThreadPitch);
      var initWidthAcrossFlatsMax = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].widthAcrossFlatsMax);
      inputs.addValueInput('widthAcrossFlatsMax', 'Width Across Flats','cm',initWidthAcrossFlatsMax);
      var initWidthAcrossCornersMin = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].widthAcrossCornersMin);
      inputs.addValueInput('widthAcrossCornersMin', 'Width Across Corners','cm',initWidthAcrossCornersMin);
      var initThicknessMax = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].thicknessMax);
      inputs.addValueInput('thicknessMax', 'Thickness','cm',initThicknessMax);

      inputs.addStringValueInput('boltName', 'Blot Name', defaultBoltName);
      var initHeadDiameter = adsk.core.ValueInput.createByReal(defaultHeadDiameter);
      inputs.addValueInput('headDiameter', 'Head Diameter','cm',initHeadDiameter);
      var initBodyDiameter = adsk.core.ValueInput.createByReal(defaultBodyDiameter);
      inputs.addValueInput('bodyDiameter', 'Body Diameter', 'cm', initBodyDiameter);
      var initHeadHeight = adsk.core.ValueInput.createByReal(defaultHeadHeight);
      inputs.addValueInput('headHeight', 'Head Height', 'cm', initHeadHeight);
      var initBodyLength = adsk.core.ValueInput.createByReal(defaultBodyLength);
      inputs.addValueInput('bodyLength', 'Body Length', 'cm', initBodyLength);
      var initCutAngle = adsk.core.ValueInput.createByReal(defaultCutAngle);
      inputs.addValueInput('cutAngle', 'Cut Angle', 'deg', initCutAngle);
      var initChamferDistance = adsk.core.ValueInput.createByReal(defaultChamferDistance);
      inputs.addValueInput('chamferDistance', 'Chamfer Distance', 'cm', initChamferDistance);
      var initFilletRadius = adsk.core.ValueInput.createByReal(defaultFilletRadius);
      inputs.addValueInput('filletRadius', 'Fillet Radius', 'cm', initFilletRadius);
    }
    catch (e) {
      ui.messageBox('Failed to create command : ' + (e.description ? e.description : e));
    }
  };
  var onCommandExecuted = function(args) {
    try {
      var unitsMgr = app.activeProduct.unitsManager;
      var command = adsk.core.Command(args.firingEvent.sender);
      var inputs = command.commandInputs;
      var metricHexNut = new MetricHexNut();
      var bolt = new Bolt();

      var selectedItem, selectedItemObject;
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        if (input.id === 'nominalSize') {
          selectedItem = input.selectedItem.name;
          if(selectedItem != 'Custom') {
            for (var j = 0; j < metricHexNutMatrix.length; j++) {
              if (metricHexNutMatrix[j].nominalSize == selectedItem) {
                selectedItemObject = metricHexNutMatrix[j];
                break;
              }
            }
          } else {
            selectedItemObject = null;
          }
          break;
        }
      }
      for (var n = 0; n < inputs.count; n++) {
        var input = inputs.item(n);
        if (input.id === 'boltName') {
          bolt.boltName = input.value;
        } else if (input.id === 'headDiameter') {
          bolt.headDiameter = unitsMgr.evaluateExpression(input.expression, "cm");
        } else if (input.id === 'bodyDiameter') {
          bolt.bodyDiameter = unitsMgr.evaluateExpression(input.expression, "cm");
        } else if (input.id === 'headHeight') {
          bolt.headHeight = unitsMgr.evaluateExpression(input.expression, "cm");
        } else if (input.id === 'bodyLength') {
          bolt.bodyLength = adsk.core.ValueInput.createByString(input.expression);
        } else if (input.id === 'cutAngle') {
          bolt.cutAngle = unitsMgr.evaluateExpression(input.expression, "deg");
        } else if (input.id === 'chamferDistance') {
          bolt.chamferDistance = adsk.core.ValueInput.createByString(input.expression);
        } else if (input.id === 'filletRadius') {
          bolt.filletRadius = adsk.core.ValueInput.createByString(input.expression);
        }
      }
      bolt.buildBolt();
      args.isValidResult = true;
    }
    catch (e) {
      ui.messageBox('Failed to create Bolt : ' + (e.description ? e.description : e));
    }
  };
  var MetricHexNut = function() {
  };
  var Bolt = function() {
    this.boltName = defaultBoltName;
    this.headDiameter = defaultHeadDiameter;
    this.bodyDiameter = defaultBodyDiameter;
    this.headHeight = defaultHeadHeight;
    this.bodyLength = adsk.core.ValueInput.createByReal(defaultBodyLength);
    this.cutAngle = defaultCutAngle;
    this.chamferDistance = adsk.core.ValueInput.createByReal(defaultChamferDistance);
    this.filletRadius = adsk.core.ValueInput.createByReal(defaultFilletRadius);
    // Construct a bolt.
    this.buildBolt = function() {
      createNewComponent();
      if (!newComp) {
        ui.messageBox('New component failed to create', 'New Component Failed');
        adsk.terminate();
        return;
      }
      // Create a new sketch.
      var sketches = newComp.sketches;
      var xyPlane = newComp.xYConstructionPlane;
      var xzPlane = newComp.xZConstructionPlane;
      var sketch = sketches.add(xyPlane);
      var center = adsk.core.Point3D.create(0, 0, 0);
      var vertices =[];
      for(var i =0; i < 6; i++) {
        var vertex = adsk.core.Point3D.create(center.x + (this.headDiameter/2) * Math.cos(Math.PI * i / 3), center.y + (this.headDiameter/2) * Math.sin(Math.PI * i / 3),0);
        vertices.push(vertex);
      }
      for(i = 0; i < 6; i++) {
        sketch.sketchCurves.sketchLines.addByTwoPoints(vertices[(i+1) %6], vertices[i]);
      }
      var extrudes = newComp.features.extrudeFeatures;
      var prof = sketch.profiles.item(0);
      var extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation);
      var distance = adsk.core.ValueInput.createByReal(this.headHeight);
      extInput.setDistanceExtent(false, distance);
      var headExt = extrudes.add(extInput);
      var fc = headExt.faces.item(0);
      var bd = fc.body;
      bd.name = this.boltName;
      //create the body
      var bodySketch = sketches.add(xyPlane);
      bodySketch.sketchCurves.sketchCircles.addByCenterRadius(center, this.bodyDiameter/2);
      var bodyProf = bodySketch.profiles.item(0);
      var bodyExtInput = extrudes.createInput(bodyProf, adsk.fusion.FeatureOperations.JoinFeatureOperation);
      bodyExtInput.setAllExtent(adsk.fusion.ExtentDirections.NegativeExtentDirection);
      bodyExtInput.setDistanceExtent(false, this.bodyLength);
      var bodyExt = extrudes.add(bodyExtInput);
      // create chamfer
      var edgeCol = adsk.core.ObjectCollection.create();
      var edges = bodyExt.endFaces.item(0).edges;
      for(var iEdge = 0; iEdge < edges.count; iEdge++){
        edgeCol.add(edges.item(iEdge));
      }
      var chamferFeats = newComp.features.chamferFeatures;
      var chamferInput = chamferFeats.createInput(edgeCol, true);
      chamferInput.setToEqualDistance(this.chamferDistance);
      chamferFeats.add(chamferInput);
      // create fillet
      edgeCol.clear(0);
      var loops = headExt.endFaces.item(0).loops;
      var edgeLoop;
      for(var iEdgeLoop = 0; iEdgeLoop < loops.count; iEdgeLoop++){
        //since there two edgeloops in the start face of head, one consists of one circle edge while the other six edges
        edgeLoop = loops.item(iEdgeLoop);
        if(edgeLoop.edges.count == 1){
          break;
        }
      }
      edgeCol.add(edgeLoop.edges.item(0));
      var filletFeats = newComp.features.filletFeatures;
      var filletInput = filletFeats.createInput();
      filletInput.addConstantRadiusEdgeSet(edgeCol, this.filletRadius, true);
      filletFeats.add(filletInput);
      //create revolve feature 1
      var revolveSketchOne = sketches.add(xzPlane);
      var radius = this.headDiameter/2;
      var point1 = revolveSketchOne.modelToSketchSpace(adsk.core.Point3D.create(center.x + radius*Math.cos(Math.PI/6), 0, center.y));
      var point2 = revolveSketchOne.modelToSketchSpace(adsk.core.Point3D.create(center.x + radius, 0, center.y));
      var point3 = revolveSketchOne.modelToSketchSpace(adsk.core.Point3D.create(point2.x, 0, (point2.x - point1.x) * Math.tan(this.cutAngle)));
      revolveSketchOne.sketchCurves.sketchLines.addByTwoPoints(point1, point2);
      revolveSketchOne.sketchCurves.sketchLines.addByTwoPoints(point2, point3);
      revolveSketchOne.sketchCurves.sketchLines.addByTwoPoints(point3, point1);
      //revolve feature 2
      var point4 = revolveSketchOne.modelToSketchSpace(adsk.core.Point3D.create(center.x + radius*Math.cos(Math.PI/6), 0, this.headHeight - center.y));
      var point5 = revolveSketchOne.modelToSketchSpace(adsk.core.Point3D.create(center.x + radius, 0, this.headHeight - center.y));
      var point6 = revolveSketchOne.modelToSketchSpace(adsk.core.Point3D.create(center.x + point2.x, 0,  this.headHeight - center.y - (point5.x - point4.x) * Math.tan(this.cutAngle)));
      revolveSketchOne.sketchCurves.sketchLines.addByTwoPoints(point4, point5);
      revolveSketchOne.sketchCurves.sketchLines.addByTwoPoints(point5, point6);
      revolveSketchOne.sketchCurves.sketchLines.addByTwoPoints(point6, point4);
      var zaxis = newComp.zConstructionAxis;
      var revolves = newComp.features.revolveFeatures;
      var revProf1 = revolveSketchOne.profiles.item(0);
      var revInput1 = revolves.createInput(revProf1, zaxis, adsk.fusion.FeatureOperations.CutFeatureOperation);
      var revAngle = adsk.core.ValueInput.createByReal(Math.PI*2);
      revInput1.setAngleExtent(false,revAngle);
      revolves.add(revInput1);
      var revProf2 = revolveSketchOne.profiles.item(1);
      var revInput2 = revolves.createInput(revProf2, zaxis, adsk.fusion.FeatureOperations.CutFeatureOperation);
      //var revAngle = adsk.core.Value.createByReal(Math.PI*2);
      revInput2.setAngleExtent(false,revAngle);
      revolves.add(revInput2);
      var sideFace = bodyExt.sideFaces.item(0);
      var threadFeatures = newComp.features.threadFeatures;
      var threadDataQuery = threadFeatures.threadDataQuery;
      var defaultThreadType = threadDataQuery.defaultMetricThreadType;
      var designate = {};
      var threadClass = {};
      var isOk = threadDataQuery.recommendThreadData(this.bodyDiameter, false, defaultThreadType, designate, threadClass);
      if (isOk) {
        var threadInfo = threadFeatures.createThreadInfo(false, defaultThreadType, designate.value, threadClass.value);
        var faces = adsk.core.ObjectCollection.create();
        faces.add(sideFace);
        var threadInput = threadFeatures.createInput(faces, threadInfo);
        threadFeatures.add(threadInput);
      }
    };
  };
  try {
    if (adsk.debug === true) {
      debugger;
    }
    var command = createCommandDefinition();
    var commandCreatedEvent = command.commandCreated;
    commandCreatedEvent.add(onCommandCreated);
    command.execute();
  }
  catch (e) {
    if (ui) {
      ui.messageBox('Failed : ' + (e.description ? e.description : e));
    }
    adsk.terminate();
  }
}

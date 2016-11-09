//Author-Albert Sanchez
//Description-Create a Metric Hex Nut
function run(context) {
  "use strict";
  var metricHexNutMatrix = [
    {nominalSize: 'M1.6', d: 1.6, af: 3.2, k: 1.3},
    {nominalSize: 'M2',   d: 2,   af: 4,   k: 1.6},
    {nominalSize: 'M2.5', d: 2.5, af: 5,   k: 2},
    {nominalSize: 'M3',   d: 3,   af: 5.5, k: 2.4},
    {nominalSize: 'M4',   d: 4,   af: 7,   k: 3.2},
    {nominalSize: 'M5',   d: 5,   af: 8,   k: 4.7},
    {nominalSize: 'M6',   d: 6,   af: 10,  k: 5.2},
    {nominalSize: 'M8',   d: 8,   af: 13,  k: 6.8},
    {nominalSize: 'M10',  d: 10,  af: 16,  k: 8.4},
    {nominalSize: 'M12',  d: 12,  af: 18,  k: 10.8},
    {nominalSize: 'M14',  d: 14,  af: 21,  k: 12.8},
    {nominalSize: 'M16',  d: 16,  af: 24,  k: 14.8},
    {nominalSize: 'M20',  d: 20,  af: 30,  k: 18},
    {nominalSize: 'M24',  d: 24,  af: 36,  k: 21.5},
    {nominalSize: 'M30',  d: 30,  af: 46,  k: 25.6},
    {nominalSize: 'M36',  d: 36,  af: 55,  k: 31},
    {nominalSize: 'M42',  d: 42,  af: 65,  k: 34},
    {nominalSize: 'M48',  d: 48,  af: 75,  k: 38},
    {nominalSize: 'M56',  d: 56,  af: 85,  k: 45},
    {nominalSize: 'M64',  d: 64,  af: 95,  k: 51}
  ];
  for (var i = 0; i < metricHexNutMatrix.length; i++) {
    metricHexNutMatrix[i].d = metricHexNutMatrix[i].d / 10;
    metricHexNutMatrix[i].ac = (2 * metricHexNutMatrix[i].af) / Math.sqrt(3);
    metricHexNutMatrix[i].af = metricHexNutMatrix[i].af / 10;
    metricHexNutMatrix[i].ac = metricHexNutMatrix[i].ac / 10;
    metricHexNutMatrix[i].k = metricHexNutMatrix[i].k / 10;
  }
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
  };
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
      inputs.addImageCommandInput("image", "", "resources/example.png");
      inputs.addStringValueInput('metricHexNutName', 'Hex Nut Name', 'Metric Hex Nut');
      var initNominalSize = inputs.addDropDownCommandInput('nominalSize', 'Nominal Size', adsk.core.DropDownStyles.TextListDropDownStyle);
      initNominalSize.listItems.add(metricHexNutMatrix[0].nominalSize, true, '');
      for (var i = 1; i < metricHexNutMatrix.length; i++) {
        initNominalSize.listItems.add(metricHexNutMatrix[i].nominalSize, false, '');
      }
      initNominalSize.listItems.add('Custom', false, '');
      var initVisa = adsk.core.ValueInput.createByReal(0);
      var initD = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].d);
      var initAf = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].af);
      var initWidthAc = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].ac);
      var initK = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].k);
      inputs.addValueInput('V', 'Visa', 'cm', initVisa);
      inputs.addValueInput('D', '(d) Diameter', 'cm', initD);
      inputs.addValueInput('Af', '(af) Width Across Flats', 'cm', initAf);
      inputs.addValueInput('Ac', '(ac) Width Across Corners', 'cm', initWidthAc);
      inputs.addValueInput('K', '(k) Thickness', 'cm', initK);
      inputs.addValueInput('alternativeD', '(d) Diameter', 'cm', initD);
      inputs.addValueInput('alternativeAf', '(af) Width Across Flats', 'cm', initAf);
      inputs.addValueInput('alternativeAc', '(ac) Width Across Corners', 'cm', initWidthAc);
      inputs.addValueInput('alternativeK', '(k) Thickness', 'cm', initK);
      inputs.addStringValueInput('stringD', '(d) Diameter', '0.16 cm');
      inputs.addStringValueInput('stringAf', '(af) Width Across Flats', '0.32 cm');
      inputs.addStringValueInput('stringAc', '(ac) Width Across Corners', '0.37 cm');
      inputs.addStringValueInput('stringK', '(k) Thickness', '0.13 cm');
      inputs.addStringValueInput('stringThread', 'Thread Pitch', 'M1.6x0.35');
      inputs.itemById('V').isVisible = false;
      inputs.itemById('D').isVisible = false;
      inputs.itemById('Af').isVisible = false;
      inputs.itemById('Ac').isVisible = false;
      inputs.itemById('K').isVisible = false;
      inputs.itemById('alternativeD').isVisible = false;
      inputs.itemById('alternativeAf').isVisible = false;
      inputs.itemById('alternativeAc').isVisible = false;
      inputs.itemById('alternativeK').isVisible = false;
      inputs.itemById('stringD').isReadOnly = true;
      inputs.itemById('stringAf').isReadOnly = true;
      inputs.itemById('stringAc').isReadOnly = true;
      inputs.itemById('stringK').isReadOnly = true;
      inputs.itemById('stringThread').isReadOnly = true;
    }
    catch (e) {
      ui.messageBox('Failed to create command : ' + (e.description ? e.description : e));
    }
  };
  var lastSelectedItem = "M1.6";
  var customObjectBase = new Object();
  var alternative = false;
  var onCommandExecuted = function(args) {
    try {
      var unitsMgr = app.activeProduct.unitsManager;
      var command = adsk.core.Command(args.firingEvent.sender);
      var inputs = command.commandInputs;
      var metricHexNut = new MetricHexNut();
      var selectedItemObject = new Object();
      var selectedItem = inputs.itemById('nominalSize').selectedItem.name;
      if (selectedItem != 'Custom') {
        for (var j = 0; j < metricHexNutMatrix.length; j++) {
          if (selectedItem == metricHexNutMatrix[j].nominalSize) {
            selectedItemObject = metricHexNutMatrix[j];
            break;
          }
        }
      }
      if (selectedItem != lastSelectedItem) {
        if (selectedItem == 'Custom' || lastSelectedItem == 'Custom') {
          inputs.itemById('stringD').isVisible = selectedItem == 'Custom' ? false : true;
          inputs.itemById('stringAf').isVisible = selectedItem == 'Custom' ? false : true;
          inputs.itemById('stringAc').isVisible = selectedItem == 'Custom' ? false : true;
          inputs.itemById('stringK').isVisible = selectedItem == 'Custom' ? false : true;
          inputs.itemById('D').isVisible = false;
          inputs.itemById('Af').isVisible = false;
          inputs.itemById('Ac').isVisible = false;
          inputs.itemById('K').isVisible = false;
          inputs.itemById('alternativeD').isVisible = false;
          inputs.itemById('alternativeAf').isVisible = false;
          inputs.itemById('alternativeAc').isVisible = false;
          inputs.itemById('alternativeK').isVisible = false;
        }
        if (selectedItem == 'Custom') {
          customObjectBase.d = inputs.itemById('D').value;
          customObjectBase.af = inputs.itemById('Af').value;
          customObjectBase.ac = inputs.itemById('Ac').value;
          customObjectBase.k = inputs.itemById('K').value;
        }
      }
      if (selectedItem == 'Custom') {
        inputs.itemById('D').isVisible = alternative ? true : false;
        inputs.itemById('Af').isVisible = alternative ? true : false;
        inputs.itemById('Ac').isVisible = alternative ? true : false;
        inputs.itemById('K').isVisible = alternative ? true : false;
        inputs.itemById('alternativeD').isVisible = alternative ? false : true;
        inputs.itemById('alternativeAf').isVisible = alternative ? false : true;
        inputs.itemById('alternativeAc').isVisible = alternative ? false : true;
        inputs.itemById('alternativeK').isVisible = alternative ? false : true;
      }
      var isGood = true;
      var customObjectNow = new Object();
      if (selectedItem == 'Custom') {
        customObjectNow.d = !alternative ? inputs.itemById('D').value : inputs.itemById('alternativeD').value;
        customObjectNow.af = !alternative ? inputs.itemById('Af').value : inputs.itemById('alternativeAf').value;
        customObjectNow.ac = !alternative ? inputs.itemById('Ac').value : inputs.itemById('alternativeAc').value;
        customObjectNow.k = !alternative ? inputs.itemById('K').value : inputs.itemById('alternativeK').value;
        if (customObjectNow.d != customObjectBase.d) {
          if (customObjectNow.d <= 0 || customObjectNow.d >= customObjectNow.af) {
            ui.messageBox("(d) value not allowed!\n\nGood:\n(d) > 0\n(d) < (af)");
            isGood = false;
          }
        } else if (customObjectNow.af != customObjectBase.af) {
          if (customObjectNow.af <= customObjectBase.d) {
            ui.messageBox("(af) value not allowed!\n\nGood:\n(af) > (d)");
            isGood = false;
          } else {
            customObjectNow.ac = (2 * customObjectNow.af) / Math.sqrt(3);
          }
        } else if (customObjectNow.ac != customObjectBase.ac) {
          var af = (Math.sqrt(3) * customObjectNow.ac) / 2;
          if (af <= customObjectBase.d) {
            ui.messageBox("(ac) value not allowed!");
            isGood = false;
          } else {
            customObjectNow.af = af;
          }
        } else if (customObjectNow.k != customObjectBase.k) {
          if (customObjectNow.af < 0.4) {
            ui.messageBox("(k) value not allowed!");
            isGood = false;
          }
        }
      }
      if (selectedItem != 'Custom') {
        inputs.itemById('D').value = selectedItemObject.d;
        inputs.itemById('Af').value = selectedItemObject.af;
        inputs.itemById('Ac').value = selectedItemObject.ac;
        inputs.itemById('K').value = selectedItemObject.k;
        inputs.itemById('alternativeD').value = inputs.itemById('D').value;
        inputs.itemById('alternativeAf').value = inputs.itemById('Af').value;
        inputs.itemById('alternativeAc').value = inputs.itemById('Ac').value;
        inputs.itemById('alternativeK').value = inputs.itemById('K').value;
      } else {
        inputs.itemById('V').value = isGood ? customObjectNow.d : customObjectBase.d;
        inputs.itemById('D').expression = inputs.itemById('V').expression;
        inputs.itemById('V').value = isGood ? customObjectNow.af : customObjectBase.af;
        inputs.itemById('Af').expression = inputs.itemById('V').expression;
        inputs.itemById('V').value = isGood ? customObjectNow.ac : customObjectBase.ac;
        inputs.itemById('Ac').expression = inputs.itemById('V').expression;
        inputs.itemById('V').value = isGood ? customObjectNow.k : customObjectBase.k;
        inputs.itemById('K').expression = inputs.itemById('V').expression;
        inputs.itemById('alternativeD').expression = inputs.itemById('D').expression;
        inputs.itemById('alternativeAf').expression = inputs.itemById('Af').expression;
        inputs.itemById('alternativeAc').expression = inputs.itemById('Ac').expression;
        inputs.itemById('alternativeK').expression = inputs.itemById('K').expression;
      }
      metricHexNut.values.d = inputs.itemById('D').value;
      metricHexNut.values.af = inputs.itemById('Af').value;
      metricHexNut.values.ac = inputs.itemById('Ac').value;
      metricHexNut.values.k = inputs.itemById('K').value;
      metricHexNut.values.metricHexNutName = inputs.itemById('metricHexNutName').value;
      inputs.itemById('stringD').value = inputs.itemById('D').expression;
      inputs.itemById('stringAf').value = inputs.itemById('Af').expression;
      inputs.itemById('stringAc').value = inputs.itemById('Ac').expression;
      inputs.itemById('stringK').value = inputs.itemById('K').expression;
      metricHexNut.buildMetricHexNut();
      inputs.itemById('stringThread').value = alternative + " " + metricHexNut.values.thread;
      lastSelectedItem = selectedItem;
      alternative = !alternative;
      args.isValidResult = true;
    }
    catch (e) {
      ui.messageBox('Failed to create Metric Hex Nut: ' + (e.description ? e.description : e));
    }
  };
  var MetricHexNut = function() {
    this.values = {
      metricHexNutName: 'Metric Hex Nut',
      d: metricHexNutMatrix[0].d,
      af: metricHexNutMatrix[0].af,
      ac: metricHexNutMatrix[0].ac,
      k: metricHexNutMatrix[0].k,
      thread: ""
    };
    this.buildMetricHexNut = function() {
      createNewComponent();
      if (!newComp) {
        ui.messageBox('New component failed to create', 'New Component Failed');
        adsk.terminate();
        return;
      }
      var sketches = newComp.sketches;
      var sketch = sketches.add(newComp.xYConstructionPlane);
      var center = adsk.core.Point3D.create(0, 0, 0);
      var vertices = [];
      for (var i = 0; i < 6; i++) {
        var vertex = adsk.core.Point3D.create((this.values.af / Math.sqrt(3)) * Math.cos(Math.PI * i / 3 + (30 * (Math.PI / 180))), (this.values.af / Math.sqrt(3)) * Math.sin(Math.PI * i / 3 + (30 * (Math.PI / 180))), 0);
        vertices.push(vertex);
      }
      for (i = 0; i < 6; i++) {
        sketch.sketchCurves.sketchLines.addByTwoPoints(vertices[(i + 1) % 6], vertices[i]);
      }
      var prof = sketch.profiles.item(0);
      var extrudes = newComp.features.extrudeFeatures;
      var extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation);
      var distance = adsk.core.ValueInput.createByReal(this.values.k);
      extInput.setDistanceExtent(false, distance);
      var ext = extrudes.add(extInput);
      var body = ext.bodies.item(0);
      if (!this.values.metricHexNutName) {
        this.values.metricHexNutName = "Metric Hex Nut";
        ui.messageBox('Body must have a name');
      }
      body.name = this.values.metricHexNutName;
      var endFaces = ext.endFaces;
      var endFace = endFaces.item(0);
      var planes = newComp.constructionPlanes;
      var planeInput = planes.createInput();
      var offsetVal = adsk.core.ValueInput.createByString('0 cm');
      planeInput.setByOffset(endFace, offsetVal);
      var offsetPlane = planes.add(planeInput);
      var offsetSketch = sketches.add(offsetPlane);
      var offsetSketchPoints = offsetSketch.sketchPoints;
      var centerHole = offsetSketchPoints.add(center);
      var ptColl = adsk.core.ObjectCollection.create();
      ptColl.add(centerHole);
      var holes = newComp.features.holeFeatures;
      var holeInput = holes.createSimpleInput(adsk.core.ValueInput.createByReal(this.values.d));
      holeInput.setPositionBySketchPoints(ptColl);
      holeInput.setDistanceExtent(distance);
      holes.add(holeInput);
      var revolveSketch = sketches.add(newComp.xZConstructionPlane);
      var radius = this.values.ac / 2;
      var point1 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius * Math.cos(Math.PI / 6), 0, 0));
      var point2 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius, 0, 0));
      var point3 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(point2.x, 0, (point2.x - point1.x) * Math.tan(30 * (Math.PI / 180))));
      var point4 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius * Math.cos(Math.PI / 6), 0, this.values.k - center.y));
      var point5 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius, 0, this.values.k - center.y));
      var point6 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(point2.x, 0, this.values.k - center.y - (point5.x - point4.x) * Math.tan(30 * (Math.PI / 180))));
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point1, point2);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point2, point3);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point3, point1);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point4, point5);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point5, point6);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point6, point4);
      var revolves = newComp.features.revolveFeatures;
      var revInputOne = revolves.createInput(revolveSketch.profiles.item(0), newComp.zConstructionAxis, adsk.fusion.FeatureOperations.CutFeatureOperation);
      var revInputTwo = revolves.createInput(revolveSketch.profiles.item(1), newComp.zConstructionAxis, adsk.fusion.FeatureOperations.CutFeatureOperation);
      var angle = adsk.core.ValueInput.createByReal(Math.PI * 2);
      revInputOne.setAngleExtent(false, angle);
      revInputTwo.setAngleExtent(false, angle);
      revolves.add(revInputOne);
      revolves.add(revInputTwo);
      var threadFeatures = newComp.features.threadFeatures;
      var threadDataQuery = threadFeatures.threadDataQuery;
      var defaultThreadType = threadDataQuery.defaultMetricThreadType;
      var designate = new Object();
      var threadClass = new Object();
      var isOk = threadDataQuery.recommendThreadData(this.values.d, true, defaultThreadType, designate, threadClass);
      if (isOk) {
        this.values.thread = designate.value;
        var hole = holes.item(0);
        var sideFace = hole.sideFaces.item(0);
        var threadInfo = threadFeatures.createThreadInfo(true, defaultThreadType, designate.value, threadClass.value);
        var threadInput = threadFeatures.createInput(sideFace, threadInfo);
        threadInput.threadLength = adsk.core.ValueInput.createByReal(this.values.k - (this.values.k * 0.01));
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

//Author-Albert Sanchez
//Description-Create a Metric Hex Nut
function run(context) {
  "use strict";
  var defaultMetricHexNutName = 'Metric Hex Nut';
  var metricHexNutMatrix = [
    {nominalSize: 'M1.6', d: 1.6, af: 3.2, k: 1.3},
    {nominalSize: 'M2',   d: 2,   af: 4,   k: 1.6},
    {nominalSize: 'M2.5', d: 2.5, af: 5,   k: 2},
    {nominalSize: 'M3',   d: 3,   af: 5.5, k: 2.4},
    {nominalSize: 'M4',   d: 4,   af: 7,   k: 3.2},
    {nominalSize: 'M5',   d: 5,   af: 8,   k: 4.7},
    {nominalSize: 'M6',   d: 6,   af: 10,  k: 5.2},
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
    {nominalSize: 'M56',  d: 56,  af: 85,  k: 45}
  ];
  for (var i = 0; i < metricHexNutMatrix.length; i++) {
    metricHexNutMatrix[i].d = metricHexNutMatrix[i].d / 10;
    metricHexNutMatrix[i].d = metricHexNutMatrix[i].d.toFixed(4);
    metricHexNutMatrix[i].ac = (2 * metricHexNutMatrix[i].af) / Math.sqrt(3);
    metricHexNutMatrix[i].af = metricHexNutMatrix[i].af / 10;
    metricHexNutMatrix[i].af = metricHexNutMatrix[i].af.toFixed(4);
    metricHexNutMatrix[i].ac = metricHexNutMatrix[i].ac / 10;
    metricHexNutMatrix[i].ac = metricHexNutMatrix[i].ac.toFixed(4);
    metricHexNutMatrix[i].k = metricHexNutMatrix[i].k / 10;
    metricHexNutMatrix[i].k = metricHexNutMatrix[i].k.toFixed(4);
  }
  var lastSelectedItem = 'M1.6';
  var customObjectBase = new Object();
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
      inputs.addImageCommandInput("image", "", "resources/example.png");
      inputs.addStringValueInput('metricHexNutName', 'Hex Nut Name', defaultMetricHexNutName);
      var initNominalSize = inputs.addDropDownCommandInput('nominalSize', 'Nominal Size', adsk.core.DropDownStyles.TextListDropDownStyle);
      initNominalSize.listItems.add(metricHexNutMatrix[0].nominalSize, true, '');
      for (var i = 1; i < metricHexNutMatrix.length; i++) {
        initNominalSize.listItems.add(metricHexNutMatrix[i].nominalSize, false, '');
      }
      initNominalSize.listItems.add('Custom', false, '');
      var initD = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].d);
      inputs.addValueInput('D', '(d) Diameter', 'cm', initD);
      inputs.addTextBoxCommandInput('textBoxD', '(d) Diameter', metricHexNutMatrix[0].d + " cm", 1, true);
      var initAf = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].af);
      inputs.addValueInput('Af', '(af) Width Across Flats', 'cm', initAf);
      inputs.addTextBoxCommandInput('textBoxAf', '(af) Width Across Flats', metricHexNutMatrix[0].af + " cm", 1, true);
      var initWidthAc = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].ac);
      inputs.addValueInput('Ac', '(ac) Width Across Corners', 'cm', initWidthAc);
      inputs.addTextBoxCommandInput('textBoxAc', '(ac) Width Across Corners', metricHexNutMatrix[0].ac + " cm", 1, true);
      var initK = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].k);
      inputs.addValueInput('K', '(k) Thickness', 'cm', initK);
      inputs.addTextBoxCommandInput('textBoxK', '(k) Thickness', metricHexNutMatrix[0].k + " cm", 1, true);
      inputs.addTextBoxCommandInput('textBoxThread', 'Thread Pitch', "", 1, true);
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        switch (input.id) {
          case 'D':
          case 'Af':
          case 'Ac':
          case 'K':
          input.isVisible = false;
          break;
        }
      }
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
      var selectedItem;
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        if (input.id === 'nominalSize') {
          selectedItem = input.selectedItem.name;
          if (selectedItem != lastSelectedItem) {
            if (lastSelectedItem == 'Custom' || selectedItem == 'Custom') {
              for (var j = 0; j < inputs.count; j++) {
                var input2 = inputs.item(j);
                switch (input2.id) {
                  case 'textBoxD':
                  case 'textBoxAf':
                  case 'textBoxAc':
                  case 'textBoxK':
                  input2.isVisible = selectedItem == 'Custom' ? false : true;
                  break;
                  case 'D':
                  case 'Af':
                  case 'Ac':
                  case 'K':
                  input2.isVisible = selectedItem == 'Custom' ? true : false;
                  break;
                }
              }
            }
            if (selectedItem == 'Custom') {
              for (var i = 0; i < inputs.count; i++) {
                var input = inputs.item(i);
                if (input.id === 'D') {
                  customObjectBase.d = input.value;
                } else if (input.id === 'Af') {
                  customObjectBase.af = input.value;
                } else if (input.id === 'Ac') {
                  customObjectBase.ac = input.value;
                } else if (input.id === 'K') {
                  customObjectBase.k = input.value;
                }
              }
            }
          }
          break;
        }
      }
      var selectedItemObject;
      if (selectedItem != 'Custom') {
        for (var i = 0; i < metricHexNutMatrix.length; i++) {
          if (metricHexNutMatrix[i].nominalSize == selectedItem) {
            selectedItemObject = metricHexNutMatrix[i];
            for (var j = 0; j < inputs.count; j++) {
              var input = inputs.item(j);
              if (input.id === 'textBoxD') {
                input.text = selectedItemObject.d + " cm";
              } else if (input.id === 'D') {
                input.value = selectedItemObject.d;
              } else if (input.id === 'textBoxAf') {
                input.text = selectedItemObject.af + " cm";
              } else if (input.id === 'Af') {
                input.value = selectedItemObject.af;
              } else if (input.id === 'textBoxAc') {
                input.text = selectedItemObject.ac + " cm";
              } else if (input.id === 'Ac') {
                input.value = selectedItemObject.ac;
              } else if (input.id === 'textBoxK') {
                input.text = selectedItemObject.k + " cm";
              } else if (input.id === 'K') {
                input.value = selectedItemObject.k;
              }
            }
            break;
          }
        }
      }

      lastSelectedItem = selectedItem;
      var isGood = true;
      var customObjectNow = new Object();
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        if (input.id === 'metricHexNutName') {
          customObjectNow.metricHexNutName = input.value;
        } else if (input.id === 'D') {
          customObjectNow.d = input.value;
        } else if (input.id === 'Af') {
          customObjectNow.af = input.value;
        } else if (input.id === 'Ac') {
          customObjectNow.ac = input.value;
        } else if (input.id === 'K') {
          customObjectNow.k = input.value;
        }
      }
      if (customObjectNow.d != customObjectBase.d) {
        if (customObjectNow.d <= 0 || customObjectNow.d >= customObjectNow.af) {
          ui.messageBox("(d) value not allowed!");
          isGood = false;
        }
      } else if (customObjectNow.af != customObjectBase.af) {
        if (customObjectNow.af <= customObjectBase.d) {
          ui.messageBox("(af) value not allowed!");
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
      metricHexNut.metricHexNutName = customObjectNow.metricHexNutName;
      metricHexNut.d = isGood ? customObjectNow.d : customObjectBase.d;
      metricHexNut.af = isGood ? customObjectNow.af : customObjectBase.af;
      metricHexNut.ac = isGood ? customObjectNow.ac : customObjectBase.ac;
      metricHexNut.k = isGood ? customObjectNow.k : customObjectBase.k;
      metricHexNut.buildMetricHexNut();
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        if (input.id === 'textBoxThread') {
          input.text = metricHexNut.thread;
          break;
        }
      }
      args.isValidResult = true;
    }
    catch (e) {
      ui.messageBox('Failed to create Metric Hex Nut: ' + (e.description ? e.description : e));
    }
  };
  var MetricHexNut = function() {
    this.metricHexNutName = defaultMetricHexNutName;
    this.d = metricHexNutMatrix[0].d;
    this.af = metricHexNutMatrix[0].af;
    this.ac = metricHexNutMatrix[0].ac;
    this.k = metricHexNutMatrix[0].k;
    this.thread;
    this.buildMetricHexNut = function() {
      createNewComponent();
      if (!newComp) {
        ui.messageBox('New component failed to create', 'New Component Failed');
        adsk.terminate();
        return;
      }
      var sketches = newComp.sketches;
      var xyPlane = newComp.xYConstructionPlane;
      var xzPlane = newComp.xZConstructionPlane;
      var sketch = sketches.add(xyPlane);
      var center = adsk.core.Point3D.create(0, 0, 0);
      var vertices =[];
      for (var i = 0; i < 6; i++) {
        var vertex = adsk.core.Point3D.create((this.af / Math.sqrt(3)) * Math.cos(Math.PI * i / 3 + (30 * (Math.PI / 180))), (this.af / Math.sqrt(3)) * Math.sin(Math.PI * i / 3 + (30 * (Math.PI / 180))), 0);
        vertices.push(vertex);
      }
      for(i = 0; i < 6; i++) {
        sketch.sketchCurves.sketchLines.addByTwoPoints(vertices[(i + 1) % 6], vertices[i]);
      }
      var extrudedBody = newComp.features.extrudeFeatures;
      var profile = sketch.profiles.item(0);
      var extInput = extrudedBody.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation);
      var distance = adsk.core.ValueInput.createByReal(this.k);
      extInput.setDistanceExtent(false, distance);
      var headExt = extrudedBody.add(extInput);
      var fc = headExt.faces.item(0);
      var bd = fc.body;
      bd.name = this.metricHexNutName;
      var endFaces = headExt.endFaces;
      var endFace = endFaces.item(0);
      var planes = newComp.constructionPlanes;
      var planeInput = planes.createInput();
      var offsetVal = adsk.core.ValueInput.createByString('0 cm');
      planeInput.setByOffset(endFace, offsetVal);
      var offsetPlane = planes.add(planeInput);
      var offsetSketch = sketches.add(offsetPlane);
      var offsetSketchPoints = offsetSketch.sketchPoints;
      var centerHole = offsetSketchPoints.add(adsk.core.Point3D.create(0, 0, 0));
      var ptColl = adsk.core.ObjectCollection.create();
      ptColl.add(centerHole);
      var holes = newComp.features.holeFeatures;
      var holeInput = holes.createSimpleInput(adsk.core.ValueInput.createByReal(this.d));
      holeInput.setPositionBySketchPoints(ptColl);
      holeInput.setDistanceExtent(distance);
      var hole = holes.add(holeInput);
      var revolveSketch = sketches.add(xzPlane);
      var radius = this.ac / 2;
      var point1 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius * Math.cos(Math.PI / 6), 0, 0));
      var point2 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius, 0, 0));
      var point3 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(point2.x, 0, (point2.x - point1.x) * Math.tan(30 * (Math.PI / 180))));
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point1, point2);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point2, point3);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point3, point1);
      var point4 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius * Math.cos(Math.PI / 6), 0, this.k - center.y));
      var point5 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(radius, 0, this.k - center.y));
      var point6 = revolveSketch.modelToSketchSpace(adsk.core.Point3D.create(point2.x, 0, this.k - center.y - (point5.x - point4.x) * Math.tan(30 * (Math.PI / 180))));
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point4, point5);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point5, point6);
      revolveSketch.sketchCurves.sketchLines.addByTwoPoints(point6, point4);
      var zaxis = newComp.zConstructionAxis;
      var revolves = newComp.features.revolveFeatures;
      var revAngle = adsk.core.ValueInput.createByReal(Math.PI * 2);
      var revProfileOne = revolveSketch.profiles.item(0);
      var revProfileTwo = revolveSketch.profiles.item(1);
      var revInputOne = revolves.createInput(revProfileOne, zaxis, adsk.fusion.FeatureOperations.CutFeatureOperation);
      var revInputTwo = revolves.createInput(revProfileTwo, zaxis, adsk.fusion.FeatureOperations.CutFeatureOperation);
      revInputOne.setAngleExtent(false, revAngle);
      revInputTwo.setAngleExtent(false, revAngle);
      revolves.add(revInputOne);
      revolves.add(revInputTwo);
      var threadFeatures = newComp.features.threadFeatures;
      var threadDataQuery = threadFeatures.threadDataQuery;
      var defaultThreadType = threadDataQuery.defaultMetricThreadType;
      var designate = {};
      var threadClass = {};
      var isOk = threadDataQuery.recommendThreadData(this.d, true, defaultThreadType, designate, threadClass);
      if (isOk) {
        this.thread = designate.value;
        var sideFace = hole.sideFaces.item(0);
        var faces = adsk.core.ObjectCollection.create();
        faces.add(sideFace);
        var threadInfo = threadFeatures.createThreadInfo(true, defaultThreadType, designate.value, threadClass.value);
        var threadInput = threadFeatures.createInput(faces, threadInfo);
        threadInput.threadLength = adsk.core.ValueInput.createByReal(this.k);
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

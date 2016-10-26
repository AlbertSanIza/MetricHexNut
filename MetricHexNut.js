//Author-Albert Sanchez
//Description-Create a Metric Hex Nut
function run(context) {
  "use strict";
  var defaultMetricHexNutName = 'Metric Hex Nut';
  var metricHexNutMatrix = [
    {nominalSize: 'M1.6', d: 1.6, thread: 0.35, af: 3.2, k: 1.3},
    {nominalSize: 'M2',   d: 2,   thread: 0.4,  af: 4,   k: 1.6},
    {nominalSize: 'M2.5', d: 2.5, thread: 0.45, af: 5,   k: 2},
    {nominalSize: 'M3',   d: 3,   thread: 0.5,  af: 5.5, k: 2.4},
    {nominalSize: 'M4',   d: 4,   thread: 0.7,  af: 7,   k: 3.2},
    {nominalSize: 'M5',   d: 5,   thread: 0.8,  af: 8,   k: 4.7},
    {nominalSize: 'M6',   d: 6,   thread: 1,    af: 10,  k: 5.2},
    {nominalSize: 'M10',  d: 10,  thread: 1.5,  af: 16,  k: 8.4},
    {nominalSize: 'M12',  d: 12,  thread: 1.75, af: 18,  k: 10.8},
    {nominalSize: 'M14',  d: 14,  thread: 2,    af: 21,  k: 12.8},
    {nominalSize: 'M16',  d: 16,  thread: 2,    af: 24,  k: 14.8},
    {nominalSize: 'M20',  d: 20,  thread: 2.5,  af: 30,  k: 18},
    {nominalSize: 'M24',  d: 24,  thread: 3,    af: 36,  k: 21.5},
    {nominalSize: 'M30',  d: 30,  thread: 3.5,  af: 46,  k: 25.6},
    {nominalSize: 'M36',  d: 36,  thread: 4,    af: 55,  k: 31},
    {nominalSize: 'M42',  d: 42,  thread: 4.5,  af: 65,  k: 34},
    {nominalSize: 'M48',  d: 48,  thread: 5,    af: 75,  k: 38},
    {nominalSize: 'M56',  d: 56,  thread: 5.5,  af: 85,  k: 45},
    {nominalSize: 'M64',  d: 64,  thread: 6,    af: 95,  k: 51}
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
    metricHexNutMatrix[i].thread = metricHexNutMatrix[i].thread / 10;
    metricHexNutMatrix[i].thread = metricHexNutMatrix[i].thread.toFixed(4);
  }
  var lastSelectedItem = 'M1.6';
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
      var initThread = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].thread);
      inputs.addValueInput('Thread', 'Thread Pitch', 'cm', initThread);
      inputs.addTextBoxCommandInput('textBoxThread', 'Thread Pitch', metricHexNutMatrix[0].thread + " cm", 1, true);
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        switch (input.id) {
          case 'D':
          case 'Af':
          case 'Ac':
          case 'K':
          case 'Thread':
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
                  case 'textBoxThread':
                  input2.isVisible = selectedItem == 'Custom' ? false : true;
                  break;
                  case 'D':
                  case 'Af':
                  case 'Ac':
                  case 'K':
                  case 'Thread':
                  input2.isVisible = selectedItem == 'Custom' ? true : false;
                  break;
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
              } else if (input.id === 'textBoxThread') {
                input.text = selectedItemObject.thread + " cm";
              } else if (input.id === 'Thread') {
                input.value = selectedItemObject.thread;
              }
            }
            break;
          }
        }
      }
      lastSelectedItem = selectedItem;
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        if (input.id === 'metricHexNutName') {
          metricHexNut.metricHexNutName = input.value;
        } else if (input.id === 'D') {
          metricHexNut.d = input.value;
        } else if (input.id === 'Af') {
          metricHexNut.af = input.value;
        } else if (input.id === 'Ac') {
          metricHexNut.ac = input.value;
        } else if (input.id === 'K') {
          metricHexNut.k = input.value;
        } else if (input.id === 'Thread') {
          metricHexNut.thread = input.value;
        }
      }
      metricHexNut.buildMetricHexNut();
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
    this.thread = metricHexNutMatrix[0].thread;
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
      /*
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
      */
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

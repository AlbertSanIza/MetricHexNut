//Author-Albert Sanchez
//Description-Create a Metric Hex Nut
function run(context) {
  "use strict";
  var defaultMetricHexNutName = 'Metric Hex Nut';
  var metricHexNutMatrix = [
    {name: 'M1.6', d: 1.6, thread: 0.35, af: 3.2, ac: 3.41,   k: 1.3},
    {name: 'M2',   d: 2,   thread: 0.4,  af: 4,   ac: 4.32,   k: 1.6},
    {name: 'M2.5', d: 2.5, thread: 0.45, af: 5,   ac: 5.45,   k: 2},
    {name: 'M3',   d: 3,   thread: 0.5,  af: 5.5, ac: 6.01,   k: 2.4},
    {name: 'M4',   d: 4,   thread: 0.7,  af: 7,   ac: 7.66,   k: 3.2},
    {name: 'M5',   d: 5,   thread: 0.8,  af: 8,   ac: 8.79,   k: 4.7},
    {name: 'M6',   d: 6,   thread: 1,    af: 10,  ac: 11.05,  k: 5.2},
    {name: 'M10',  d: 10,  thread: 1.5,  af: 16,  ac: 17.77,  k: 8.4},
    {name: 'M12',  d: 12,  thread: 1.75, af: 18,  ac: 20.03,  k: 10.8},
    {name: 'M14',  d: 14,  thread: 2,    af: 21,  ac: 23.35,  k: 12.8},
    {name: 'M16',  d: 16,  thread: 2,    af: 24,  ac: 26.75,  k: 14.8},
    {name: 'M20',  d: 20,  thread: 2.5,  af: 30,  ac: 32.95,  k: 18},
    {name: 'M24',  d: 24,  thread: 3,    af: 36,  ac: 39.55,  k: 21.5},
    {name: 'M30',  d: 30,  thread: 3.5,  af: 46,  ac: 50.85,  k: 25.6},
    {name: 'M36',  d: 36,  thread: 4,    af: 55,  ac: 60.78,  k: 31},
    {name: 'M42',  d: 42,  thread: 4.5,  af: 65,  ac: 73.1,   k: 34},
    {name: 'M48',  d: 48,  thread: 5,    af: 75,  ac: 82.6,   k: 38},
    {name: 'M56',  d: 56,  thread: 5.5,  af: 85,  ac: 93.56,  k: 45},
    {name: 'M64',  d: 64,  thread: 6,    af: 95,  ac: 104.86, k: 51}
  ];
  for (var i = 0; i < metricHexNutMatrix.length; i++) {
    metricHexNutMatrix[i].d = metricHexNutMatrix[i].d / 10;
    metricHexNutMatrix[i].d = metricHexNutMatrix[i].d.toFixed(3);
    metricHexNutMatrix[i].af = metricHexNutMatrix[i].af / 10;
    metricHexNutMatrix[i].af = metricHexNutMatrix[i].af.toFixed(3);
    metricHexNutMatrix[i].ac = metricHexNutMatrix[i].ac / 10;
    metricHexNutMatrix[i].ac = metricHexNutMatrix[i].ac.toFixed(3);
    metricHexNutMatrix[i].k = metricHexNutMatrix[i].k / 10;
    metricHexNutMatrix[i].k = metricHexNutMatrix[i].k.toFixed(3);
    metricHexNutMatrix[i].thread = metricHexNutMatrix[i].thread / 10;
    metricHexNutMatrix[i].thread = metricHexNutMatrix[i].thread.toFixed(3);
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
      var initNominalDiameter = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].nominalDiameter);
      inputs.addValueInput('nominalDiameter', 'Nominal Diameter','cm',initNominalDiameter);
      inputs.addTextBoxCommandInput('textBoxNominalDiameter', 'Nominal Diameter', metricHexNutMatrix[0].nominalDiameter + " cm", 1, true);
      var initThreadPitch = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].threadPitch);
      inputs.addValueInput('threadPitch', 'Thread Pitch','cm',initThreadPitch);
      inputs.addTextBoxCommandInput('textBoxThreadPitch', 'Thread Pitch', metricHexNutMatrix[0].threadPitch + " cm", 1, true);
      var initWidthAcrossFlatsMax = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].widthAcrossFlatsMax);
      inputs.addValueInput('widthAcrossFlatsMax', 'Width Across Flats','cm',initWidthAcrossFlatsMax);
      inputs.addTextBoxCommandInput('textBoxWidthAcrossFlatsMax', 'Width Across Flats', metricHexNutMatrix[0].widthAcrossFlatsMax + " cm", 1, true);
      var initWidthAcrossCornersMin = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].widthAcrossCornersMin);
      inputs.addValueInput('widthAcrossCornersMin', 'Width Across Corners','cm',initWidthAcrossCornersMin);
      inputs.addTextBoxCommandInput('textBoxWidthAcrossCornersMin', 'Width Across Corners', metricHexNutMatrix[0].widthAcrossCornersMin + " cm", 1, true);
      var initThicknessMax = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].thicknessMax);
      inputs.addValueInput('thicknessMax', 'Thickness','cm',initThicknessMax);
      inputs.addTextBoxCommandInput('textBoxThicknessMax', 'Thickness', metricHexNutMatrix[0].thicknessMax + " cm", 1, true);
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        switch (input.id) {
          case 'textBoxNominalDiameter':
          case 'textBoxThreadPitch':
          case 'textBoxWidthAcrossFlatsMax':
          case 'textBoxWidthAcrossCornersMin':
          case 'textBoxThicknessMax':
          input.isVisible = true;
          break;
          case 'nominalDiameter':
          case 'threadPitch':
          case 'widthAcrossFlatsMax':
          case 'widthAcrossCornersMin':
          case 'thicknessMax':
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
                  case 'textBoxNominalDiameter':
                  case 'textBoxThreadPitch':
                  case 'textBoxWidthAcrossFlatsMax':
                  case 'textBoxWidthAcrossCornersMin':
                  case 'textBoxThicknessMax':
                  if (selectedItem == 'Custom') {
                    input2.isVisible = false;
                  } else {
                    input2.isVisible = true;
                  }
                  break;
                  case 'nominalDiameter':
                  case 'threadPitch':
                  case 'widthAcrossFlatsMax':
                  case 'widthAcrossCornersMin':
                  case 'thicknessMax':
                  if (selectedItem == 'Custom') {
                    input2.isVisible = true;
                  } else {
                    input2.isVisible = false;
                  }
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
              if (input.id === 'textBoxNominalDiameter') {
                input.text = selectedItemObject.nominalDiameter + " cm";
              } else if (input.id === 'nominalDiameter') {
                input.value = selectedItemObject.nominalDiameter;
              } else if (input.id === 'textBoxThreadPitch') {
                input.text = selectedItemObject.threadPitch + " cm";
              } else if (input.id === 'threadPitch') {
                input.value = selectedItemObject.threadPitch;
              } else if (input.id === 'textBoxWidthAcrossFlatsMax') {
                input.text = selectedItemObject.widthAcrossFlatsMax + " cm";
              } else if (input.id === 'widthAcrossFlatsMax') {
                input.value = selectedItemObject.widthAcrossFlatsMax;
              } else if (input.id === 'textBoxWidthAcrossCornersMin') {
                input.text = selectedItemObject.widthAcrossCornersMin + " cm";
              } else if (input.id === 'widthAcrossCornersMin') {
                input.value = selectedItemObject.widthAcrossCornersMin;
              } else if (input.id === 'textBoxThicknessMax') {
                input.text = selectedItemObject.thicknessMax + " cm";
              } else if (input.id === 'thicknessMax') {
                input.value = selectedItemObject.thicknessMax;
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
        } else if (input.id === 'nominalDiameter') {
          metricHexNut.nominalDiameter = input.value;
        } else if (input.id === 'threadPitch') {
          metricHexNut.threadPitch = input.value;
        } else if (input.id === 'widthAcrossFlatsMax') {
          metricHexNut.widthAcrossFlatsMax = input.value;
        } else if (input.id === 'widthAcrossCornersMin') {
          metricHexNut.widthAcrossCornersMin = input.value;
        } else if (input.id === 'thicknessMax') {
          metricHexNut.thicknessMax = input.value;
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
    this.nominalDiameter = metricHexNutMatrix[0].nominalDiameter;
    this.threadPitch = metricHexNutMatrix[0].threadPitch;
    this.widthAcrossFlatsMax = metricHexNutMatrix[0].widthAcrossFlatsMax;
    this.widthAcrossCornersMin = metricHexNutMatrix[0].widthAcrossCornersMin;
    this.thicknessMax = metricHexNutMatrix[0].thicknessMax;
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
        var vertex = adsk.core.Point3D.create(center.x + (this.widthAcrossCornersMin / 2) * Math.cos(Math.PI * i / 3), center.y + (this.widthAcrossCornersMin / 2) * Math.sin(Math.PI * i / 3), 0);
        vertices.push(vertex);
      }
      for(i = 0; i < 6; i++) {
        sketch.sketchCurves.sketchLines.addByTwoPoints(vertices[(i + 1) % 6], vertices[i]);
      }
      var extrudes = newComp.features.extrudeFeatures;
      var prof = sketch.profiles.item(0);
      var extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation);
      var distance = adsk.core.ValueInput.createByReal(this.thicknessMax);
      extInput.setDistanceExtent(false, distance);
      var headExt = extrudes.add(extInput);
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
      var holeInput = holes.createSimpleInput(adsk.core.ValueInput.createByReal(this.nominalDiameter));
      holeInput.setPositionBySketchPoints(ptColl);
      holeInput.setDistanceExtent(distance);
      var hole = holes.add(holeInput);
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

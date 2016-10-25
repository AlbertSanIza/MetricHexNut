//Author-Albert Sanchez
//Description-Create a Metric Hex Nut
function run(context) {
  "use strict";
  var defaultMetricHexNutName = 'Metric Hex Nut';
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
  for (var i = 0; i < metricHexNutMatrix.length; i++) {
    metricHexNutMatrix[i].threadPitch = metricHexNutMatrix[i].threadPitch / 10;
    metricHexNutMatrix[i].threadPitch = metricHexNutMatrix[i].threadPitch.toFixed(3);
    metricHexNutMatrix[i].widthAcrossFlatsMax = metricHexNutMatrix[i].widthAcrossFlatsMax / 10;
    metricHexNutMatrix[i].widthAcrossFlatsMax = metricHexNutMatrix[i].widthAcrossFlatsMax.toFixed(3);
    metricHexNutMatrix[i].widthAcrossFlatsMin = metricHexNutMatrix[i].widthAcrossFlatsMin / 10;
    metricHexNutMatrix[i].widthAcrossFlatsMin = metricHexNutMatrix[i].widthAcrossFlatsMin.toFixed(3);
    metricHexNutMatrix[i].widthAcrossCornersMin = metricHexNutMatrix[i].widthAcrossCornersMin / 10;
    metricHexNutMatrix[i].widthAcrossCornersMin = metricHexNutMatrix[i].widthAcrossCornersMin.toFixed(3);
    metricHexNutMatrix[i].thicknessMax = metricHexNutMatrix[i].thicknessMax / 10;
    metricHexNutMatrix[i].thicknessMax = metricHexNutMatrix[i].thicknessMax.toFixed(3);
    metricHexNutMatrix[i].thicknessMin = metricHexNutMatrix[i].thicknessMin / 10;
    metricHexNutMatrix[i].thicknessMin = metricHexNutMatrix[i].thicknessMin.toFixed(3);
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
      inputs.addStringValueInput('metricHexNutName', 'Hex Nut Name', defaultMetricHexNutName);
      var initNominalSize = inputs.addDropDownCommandInput('nominalSize', 'Nominal Size', adsk.core.DropDownStyles.TextListDropDownStyle);
      initNominalSize.listItems.add(metricHexNutMatrix[0].nominalSize, true, '');
      for (var i = 1; i < metricHexNutMatrix.length; i++) {
        initNominalSize.listItems.add(metricHexNutMatrix[i].nominalSize, false, '');
      }
      initNominalSize.listItems.add('Custom', false, '');
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
          case 'textBoxThreadPitch':
          case 'textBoxWidthAcrossFlatsMax':
          case 'textBoxWidthAcrossCornersMin':
          case 'textBoxThicknessMax':
          input.isVisible = true;
          break;
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
              if (input.id === 'textBoxThreadPitch') {
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
        var vertex = adsk.core.Point3D.create(center.x + (this.widthAcrossFlatsMax / 2) * Math.cos(Math.PI * i / 3), center.y + (this.widthAcrossFlatsMax / 2) * Math.sin(Math.PI * i / 3), 0);
        vertices.push(vertex);
      }
      for(i = 0; i < 6; i++) {
        sketch.sketchCurves.sketchLines.addByTwoPoints(vertices[(i + 1) % 6], vertices[i]);
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

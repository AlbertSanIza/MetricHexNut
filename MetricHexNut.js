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
      inputs.addStringValueInput('metricHexNutName', 'Hex Nut Name', 'Metric Hex Nut');
      inputs.addImageCommandInput("image", "", "resources/example.png");
      var initNominalSize = inputs.addDropDownCommandInput('nominalSize', 'Nominal Size', adsk.core.DropDownStyles.TextListDropDownStyle);
      initNominalSize.listItems.add(metricHexNutMatrix[0].nominalSize, true, '');
      for (var i = 1; i < metricHexNutMatrix.length; i++) {
        initNominalSize.listItems.add(metricHexNutMatrix[i].nominalSize, false, '');
      }
      initNominalSize.listItems.add('Custom', false, '');
      var initD = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].d);
      inputs.addValueInput('D', '(d) Diameter', 'cm', initD);
      var initAf = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].af);
      inputs.addValueInput('Af', '(af) Width Across Flats', 'cm', initAf);
      var initWidthAc = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].ac);
      inputs.addValueInput('Ac', '(ac) Width Across Corners', 'cm', initWidthAc);
      var initK = adsk.core.ValueInput.createByReal(metricHexNutMatrix[0].k);
      inputs.addValueInput('K', '(k) Thickness', 'cm', initK);
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
      for (var i = 0; i < inputs.count; i++) {
        var input = inputs.item(i);
        if (input.id === 'metricHexNutName') {
          metricHexNut.metricHexNutName = input.value;
        } else if (input.id === 'nominalSize') {
          ui.messageBox(input.id);
        } else if (input.id === 'D') {
          metricHexNut.d = unitsMgr.evaluateExpression(input.expression, "cm");
        } else if (input.id === 'Af') {
          metricHexNut.af = unitsMgr.evaluateExpression(input.expression, "cm");
        } else if (input.id === 'Ac') {
          metricHexNut.ac = unitsMgr.evaluateExpression(input.expression, "cm");
        } else if (input.id === 'K') {
          metricHexNut.k = unitsMgr.evaluateExpression(input.expression, "cm");
        }
      }
      args.isValidResult = true;
    }
    catch (e) {
      ui.messageBox('Failed to create Metric Hex Nut: ' + (e.description ? e.description : e));
    }
  };
  var MetricHexNut = function() {
    this.metricHexNutName = 'Metric Hex Nut';
    this.d = metricHexNutMatrix[0].d;
    this.af = metricHexNutMatrix[0].af;
    this.ac = metricHexNutMatrix[0].ac;
    this.k = metricHexNutMatrix[0].k;
    this.thread;
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

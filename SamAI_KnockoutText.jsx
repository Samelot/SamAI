var idoc = app.activeDocument;  
var background = idoc.pathItems.rectangle( 200, 200, 200, 40);  
background.name = 'path_background';  
  
  
var itext = idoc.textFrames.add();  
itext.contents = 'Outlined Text';  
itext.textRange.characterAttributes.size = 20;  
itext.position = [240, 190];  
  
  
var textOutline = itext.createOutline(); // this is a group  
textOutline.name = 'text_outlined';  
  
  
var icompound = idoc.compoundPathItems.add();  
  
  
var myExistingPath = idoc.pathItems['path_background']; // get this named path  
var myExistingOutlinedGroup = idoc.groupItems['text_outlined']; // get this named group  
  
  
myExistingPath.evenodd = true;  
myExistingOutlinedGroup.evenodd = true;  
  
  
myExistingPath.moveToBeginning(icompound);  
myExistingOutlinedGroup.moveToBeginning(icompound);

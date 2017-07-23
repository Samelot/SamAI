var docActive = app.documents.add();  
var textFrame = docActive.pathItems.rectangle( 0, 0, 200, 20);  
var areaText = docActive.textFrames.areaText(textFrame);  
areaText.contents = "Hello My Friend";  
areaText.textRange.characterAttributes.size = Math.round(20*0.85);  
  
  
var textOutline = areaText.createOutline(); // this is a group  
  
  
var compoundPaths = textOutline.compoundPathItems; // each letter is a compound path  

var textCompoundPath = app.activeDocument.activeLayer.compoundPathItems.add();
app.executeMenuCommand("noCompoundPath");
/*
for (i=0; i<compoundPaths.length; i++) {    // loop thru all letters  
    var compoundPath = compoundPaths[i];    // this holds one letter at a time  
    var pathItems = compoundPath.pathItems; // all pieces (pathItems) of the compound path make up each letter  
    for (j=0; j< pathItems.length; j++) {   // loop thru all letter parts  
        var pathItem = pathItems[j];            // this holds one letter piece at a time  
        //alert(pathItem.polarity);
        if(pathItem.polarity == "PolarityValues.POSITIVE") {
            pathItem.move(textCompoundPath, ElementPlacement.PLACEATBEGINNING);
        } else {
            pathItem.move(textCompoundPath, ElementPlacement.PLACEAFTER);
        }
        pathItem.evenodd=true;
        //pathItem.fillColor = docActive.swatches[5].color;       // fill it with the 5th swatch  
        //pathItem.strokeColor = docActive.swatches[4].color; // stroke it with the 4th swatch  
    }  

}  
*/

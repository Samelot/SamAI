#target illustrator

/* duplicate, rename, organize to layers */

var myDoc = app.activeDocument;

if(app.selection[0] != null) {
	var	selectedArt = myDoc.selection[0],
		dupNumber = 2, // set number of duplicates
		myDuplicate,
		i = 0;
		
	for(var i = 0; i < dupNumber; i++) {
		myDuplicate = selectedArt.duplicate();
		//myDuplicate.position = [selectedArt.position[0] + horOffset * (i + 1), selectedArt.position[1] + verOffset * (i + 1)];
    }

    selectedArt.hidden = true;
    selectedArt.selected = false;
} else {
    alert("You must have the object you want to duplicate selected.");
}


var thisLayer = myDoc.activeLayer,
    itemsToStyle = myDoc.selection, //itemsToCompoundPaths
    itemNames = ["front", "back"];

for(var i = 0; i < itemsToStyle.length; i++) {
    myDoc.selection = null;
    var textOutline = itemsToStyle[i].createOutline(); // this is a group  
    var compoundPaths = textOutline.compoundPathItems; // each letter is a compound path  

    textOutline.selected = true;
    textOutline.name = itemNames[i];
    app.executeMenuCommand("compoundPath"); // merge to single compound path
}

var items = [];
for(var i = 0; i < itemNames.length; i++) {
    items[i] = thisLayer.pageItems.getByName(itemNames[i]);
    //alert(items[i].name);
}

myDoc.selection = null;
var XMLOffset = "<LiveEffect name='Adobe Offset Path'><Dict data='R mlim 4 R ofst 3 I jntp 2 '/></LiveEffect>";
items[1].applyEffect(XMLOffset);
items[1].selected = true;
app.executeMenuCommand("expandStyle");

myDoc.selection = null;
items[0].selected = true;
app.executeMenuCommand("expandStyle");

function getLeadItem(glPage) {   //glPage is the Page Item  
    if (glPage.typename == 'CompoundPathItem'){  
        return glPage.pathItems[0];   //returns the first path item of the compound path (...but does not work)  
    } else {  
        return glPage;//  (if it is a normal page item, it just returns itself)  
    }  
    glPage = null  
}  

var artboards = [];

var newRect = function(x, y, width, height) {
    var l = 0;
    var t = 1;
    var r = 2;
    var b = 3;

    var rect = [];

    rect[l] = x;
    rect[t] = -y;
    rect[r] = width + x;
    rect[b] = -(height - rect[t]);

    return rect;
}

for(var i = 0; i < items.length; i++) {
    var item = thisLayer.pageItems.getByName(itemNames[i]);

    var style = app.activeDocument.graphicStyles.getByName(itemNames[i]);
    style.applyTo(item);
    
    var visBounds = item.visibleBounds;
    var x = visBounds[0];
    var y = visBounds[1];
    var width = Math.abs(x - visBounds[2]);
    var height = Math.abs(y - visBounds[3]);
    alert(width + ", " + height);
    alert(visBounds);
artboard = myDoc.artboards.add(newRect(x,-y,width,height));
artboard.name = "new name";
}

//var style = app.activeDocument.graphicStyles.getByName("front");
//style.applyTo(textOutline);
//app.executeMenuCommand("Live Adobe Round Corners");
//app.executeMenuCommand('Find Style menu item');

/*
var textCompoundPath = app.activeDocument.activeLayer.compoundPathItems.add();
for (i=0; i<compoundPaths.length; i++) {    // loop thru all letters  
    alert("a");
    var compoundPath = compoundPaths[i];    // this holds one letter at a time  
    var pathItems = compoundPath.pathItems; // all pieces (pathItems) of the compound path make up each letter  
    for (j=0; j< pathItems.length; j++) {   // loop thru all letter parts  
        var pathItem = pathItems[j];            // this holds one letter piece at a time
        //if(pathItem.polarity == "PolarityValues.POSITIVE") {
        //    pathItem.move(textCompoundPath, ElementPlacement.PLACEATBEGINNING);
        //} else {
        //    pathItem.move(textCompoundPath, ElementPlacement.PLACEAFTER);
        //}
        //pathItem.evenodd=true;
    }  
}
*/

//pathItem.fillColor = docActive.swatches[5].color;       // fill it with the 5th swatch  
//pathItem.strokeColor = docActive.swatches[4].color; // stroke it with the 4th swatch  
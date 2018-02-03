#target illustrator

if(app.selection[0] != null) {
} else {
    alert("You must have the object you want to duplicate selected.");
}

// REMOVE dupNumber = 0
var myDuplicate;

var myDoc = app.activeDocument;

var thisLayer = myDoc.activeLayer;
var layerNames = ["text"];
var itemNames = ["back", "front"]; // item/obj names cause issues. Try having a text obj named "back" or "Back". If this is found first in any of the for-loops, things mess up. Investigate!

var selectedArt = null;
var prevItem = null;

for(var i = 0; i < 1; i++) {
    var layerBaseName;
    if(selectedArt == null) {
        selectedArt = myDoc.selection[0];
        layerBaseName = selectedArt.textRange.contents;
        selectedArt.name = layerBaseName;
    } else {
        myDoc.selection = null;
        selectedArt.selected = true;
    }
	
    for(var j = 0; j < itemNames.length; j++) {
	    myDuplicate = selectedArt.duplicate();
        myDuplicate.position = [selectedArt.position[0] + selectedArt.width, selectedArt.position[1]];
    }

    //selectedArt.hidden = true;
    selectedArt.selected = false;

    var itemsToStyle = myDoc.selection;

    for(var j = 0; j < itemsToStyle.length; j++) {
        myDoc.selection = null;
        var textOutline = itemsToStyle[j].createOutline(); // this is a group  
        var compoundPaths = textOutline.compoundPathItems; // each letter is a compound path  

        textOutline.selected = true;
        textOutline.name = layerBaseName + "_" + itemNames[j];
        app.executeMenuCommand("compoundPath"); // merge to single compound path
    }

    var items = [];

    for(var j = 0; j < itemNames.length; j++) {
        items[j] = thisLayer.pageItems.getByName(layerBaseName + "_" + itemNames[j]);
    }
    
    offset = 1;

    myDoc.selection = null;
    var XMLOffset = "<LiveEffect name='Adobe Offset Path'><Dict data='R mlim 4 R ofst " + offset + " I jntp 2 '/></LiveEffect>";
    items[0].applyEffect(XMLOffset);
    items[0].selected = true;
    app.executeMenuCommand("expandStyle");

    myDoc.selection = null;
    items[1].selected = true;
    app.executeMenuCommand("expandStyle");

    for(var j = 0; j < items.length; j++) {
 
        var item = thisLayer.pageItems.getByName(layerBaseName + "_" + itemNames[j]);

        var style = app.activeDocument.graphicStyles.getByName(itemNames[j]);
        style.applyTo(item);
        
        //var frontLayer = myDoc.layers.add();
        //frontLayer.name = layerBaseName + "_" + layerNames[i] + "_" + itemNames[j];
        
        if(prevItem != null) {
            item.move(prevItem, ElementPlacement.PLACEBEFORE);
        }

        prevItem = item;
    }
}

myDoc.selection = null;
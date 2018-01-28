#target illustrator

function getLeadItem(glPage) {   //glPage is the Page Item  
    if (glPage.typename == 'CompoundPathItem'){  
        return glPage.pathItems[0];   //returns the first path item of the compound path (...but does not work)  
    } else {  
        return glPage;//  (if it is a normal page item, it just returns itself)  
    }  
    glPage = null  
}  

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

/* create artboards */
/* duplicate, rename, organize to layers */

//var artboards = [];

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
        textOutline.name = itemNames[j];
        app.executeMenuCommand("compoundPath"); // merge to single compound path
    }

    var items = [];
    
    for(var j = 0; j < itemNames.length; j++) {
        items[j] = thisLayer.pageItems.getByName(itemNames[j]);
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
 
        var item = thisLayer.pageItems.getByName(itemNames[j]);
        var style = app.activeDocument.graphicStyles.getByName(itemNames[j]);
        style.applyTo(item);
        
        var frontLayer = myDoc.layers.add();
        frontLayer.name = layerBaseName + "_" + layerNames[i] + "_" + itemNames[j];
        
        item.move(frontLayer, ElementPlacement.PLACEATEND);
        
    }
}

myDoc.selection = null;

var newLayer = myDoc.layers[layerBaseName + "_" + layerNames[0] + "_" + itemNames[0]];
var artboardItem = newLayer.pageItems[0];

var visBounds = artboardItem.visibleBounds;
var x = visBounds[0];
var y = visBounds[1];
var width = Math.abs(x - visBounds[2]);
var height = Math.abs(y - visBounds[3]);
//alert(width + ", " + height);
//alert(visBounds);
artboard = myDoc.artboards.add(newRect(x,-y,width,height));
artboard.name = "new name";
#target Illustrator  
var doc = app.activeDocument;  
//var all = doc.pathItems; // all paths in documenti
if ( app.documents.length > 0 ) {  
    doc = app.activeDocument;  
    var gi = doc.activeLayer.groupItems.add();  
    var all = doc.pathItems; // all paths in document  
      
    for (i=0; i<all.length; i++) {  
        eachPath = all[i];  
        eachPath.move (gi, ElementPlacement.PLACEATBEGINNING); // move all pathItems inside the group  
    }  
}  
else  
    alert('no documents to process');  

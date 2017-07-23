var deleteNullPaths = true;
var closeOpenPaths = true;
var deleteUnfilledPaths = true;
var countRemovedUnfilledPaths = 0;
var countClosedPaths = 0;
var countDeleted = 0;
var countCompounds = 0;

var untitledFeatures = 0;
var thisItemName = "";
var thisItemSecondary = "";

var startTime = new Date();

if(app.documents.length == 0)
{
    alert("Open a doc and select artwork");
}

var items = app.activeDocument.selection;
if ( items.length == null )
{
    alert("Select artwork before running this script.");
}
else
{   
    //alert( items.typename );
    for( a=0; a<items.length; a++ ) {
        try{
            if( items[a].typename == "GroupItem" ) {
                  // Need to find the name
                  
                  // EXPERIMENTAL
                for( b=items[a].groupItems.length-1; b >=0 ; b-- ) {
                    if( items[a].groupItems[b].typename == "GroupItem" ) {
                        for( c=items[a].groupItems[b].groupItems.length-1; c >=0 ; c-- ) {
                            if( items[a].groupItems[b].groupItems[c].typename == "GroupItem" ) {
                                for( d=items[a].groupItems[b].groupItems[c].groupItems.length-1; d >=0 ; d-- ) {
                                    for( e=items[a].groupItems[b].groupItems[c].groupItems[d].pageItems.length-1; e >=0 ; e-- ) {
                                        items[a].groupItems[b].groupItems[c].groupItems[d].pageItems[e].move( items[a], ElementPlacement.PLACEATBEGINNING );
                                    }
                                }
                            }
                            for( d=items[a].groupItems[b].groupItems[c].pageItems.length-1; d >=0 ; d-- ) {
                                items[a].groupItems[b].groupItems[c].pageItems[d].move( items[a], ElementPlacement.PLACEATBEGINNING );
                            }
                        }
                        for( c=items[a].groupItems[b].pageItems.length-1; c >=0 ; c-- ) {
                            items[a].groupItems[b].pageItems[c].move( items[a], ElementPlacement.PLACEATBEGINNING );
                        }
                     }
                     
                    // items[a].groupItems[b].remove();
                }
                // END EXPERIMENTAL
                  
                  if( items[a].textFrames.length >= 1 ) {
                        thisItemName = "";
                        var tempName = "";
                        // Use the first text item
                        for( q=0; q < items[a].textFrames.length; q++ ) {
                            tempName = items[a].textFrames[q].textRange.lines[0].contents
                            for( b=1; b < items[a].textFrames[q].textRange.lines.length; b++ ) {
                               if( tempName.substring (tempName.length-1) == "-" ) {
                                   tempName += items[a].textFrames[q].textRange.lines[b].contents;
                              } else {
                                  tempName += " " + items[a].textFrames[q].textRange.lines[b].contents;
                               }
                            }
                            if( (thisItemSecondary.length == 0) && ((parseFloat( tempName ) >= 0) || tempName[0] == "-" ) ) {
                                thisItemSecondary = "_" + tempName;
                            } else {
                                //if( parseFloat( tempName ) == -1 )
                                //{
                                    thisItemName = tempName;
                                //}
                          }
                        }
                } else {
                        // else, keep sequential order of all the untitleds
                        thisItemName = "_untitled_" + untitledFeatures;
                        untitledFeatures++;
                  }
                 
                 thisItemName = thisItemName + thisItemSecondary;
                 //clear for reuse
                thisItemSecondary = "";
                //alert( thisItemName );
                    
                  items[a].name = thisItemName;
                
              
                   // alert( thisItemName );
                 
                // Loose compound path items in 1st level grouping
                for( b=0; b<items[a].compoundPathItems.length; b++ ) {
                    items[a].compoundPathItems[b].name = thisItemName;
                }               
                
                // EXPERIMENTAL
                // Loose path items
                for( b=items[a].pathItems.length-1; b>=0; b-- ) {
                    if( (items[a].layer.name.indexOf( "point" ) > -1) && (items[a].symbolItems.length == 0) ) 
                    {
                        if( items[a].pathItems[b].area == 0 ) {
                            items[a].pathItems[b].remove();
                        }
                    }
                }
                // END EXPERIMENTAL

                // Loose path items
                for( b=items[a].pathItems.length-1; b>=0; b-- ) {
                    items[a].pathItems[b].name = thisItemName;
                    if( (items[a].layer.name.indexOf( "point" ) > -1) && (items[a].symbolItems.length == 0) ) 
                    {
                        mySym = items[a].symbolItems.add( app.activeDocument.symbols[1] );
                        //alert('boo');
                        mySym.top = items[a].pathItems[b].top + items[a].pathItems[b].height / 2;
                        mySym.left = items[a].pathItems[b].left + items[a].pathItems[b].width / 2 - mySym.width / 2;
                        mySym.name = thisItemName;
                        
                        if( items[a].pathItems.length == 1 ) {
                            items[a].pathItems[b].remove();
                        }
                    }
                }
                
                // Loose symbols items
                for( b=items[a].symbolItems.length-1; b>=0; b-- ) {
                    items[a].symbolItems[b].name = thisItemName;
                }
            
                //alert( "2nd level grouping " + items[a].groupItems.length );
                // Path items that were in 2nd level of grouping
                for( b=0; b<items[a].groupItems.length; b++ ) {
                    //alert( "2nd level grouping path items" + items[a].groupItems[b].pathItems.length );

                    // Loose compound path items in 2nd level grouping
                    for( c=0; c<items[a].groupItems[b].compoundPathItems.length; c++ ) {
                            items[a].groupItems[b].compoundPathItems[c].name = thisItemName;
                    }   

                    // Loose path items in 2nd level grouping
                    for( c=0; c<items[a].groupItems[b].pathItems.length; c++ ) {
                            items[a].groupItems[b].pathItems[c].name = thisItemName;
                    }
                    
                    // Path items in 3rd level of grouping
                    for( c=0; c<items[a].groupItems[b].groupItems.length; c++ ) {
                        //alert( "3rd level grouping path items" + items[a].groupItems[b].groupItems[c].pathItems.length );
                        for( d=0; d<items[a].groupItems[b].groupItems[c].pathItems.length; d++ ) {
                                items[a].groupItems[b].groupItems[c].pathItems[d].name = thisItemName;
                        }
                        
                        // Loose compound path items in 2nd level grouping
                        for( d=0; d<items[a].groupItems[b].groupItems[c].compoundPathItems.length; d++ ) {
                                items[a].groupItems[b].groupItems[c].compoundPathItems[d].name = thisItemName;
                        }   
                    }
                }
            
                //newCompound.firstPath.remove();
                //items[a].remove();
                
            } else {
                   // if( items[a].typename == "PathItem" ) {
                        // else, keep sequential order of all the untitleds
                            thisItemName = "_untitled_" + untitledFeatures;
                            untitledFeatures++;
                            items[a].name = thisItemName;
                    //}
               }
           
               if( thisItemName.indexOf( "untited" ) > -1 ) {
                    items[a].visible = false;
               }
        } catch(e) { alert( e ); }
    }
    
    var totalTime = (new Date() - startTime) / 1000 / 60;
    app.beep();
    alert( "Time elapsed: " + totalTime + " minute(s)" );
    
}


var map1, vector_layer;

function init(){
	map1 = new OpenLayers.Map("map_element_1", {controls:[new OpenLayers.Control.Navigation(), new OpenLayers.Control.PanZoomBar(), new OpenLayers.Control.OverviewMap()]});

	
	var google_map = new OpenLayers.Layer.Google('Google layer',{});

	var google_hybrid_map= new OpenLayers.Layer.Google('Google Hybrid layer', {type:google.maps.MapTypeId.HYBRID});


	vector_layer = new OpenLayers.Layer.Vector("KML", {
            strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: "flicker_data.kml",
                format: new OpenLayers.Format.KML({ 
                    extractAttributes: true,
			    extractStyles:true,
                    maxDepth: 2
})
            })
        })

	

	var vectore_style = new OpenLayers.Style({'fillColor':'#669933','fillOpacity':.8,'fontColor':'#f0f0f0','fontFamiy':'arial,sans-serif','fontSize':'.9em', 'fontWeight':'bold','label':'${num_points}','pointRadius':'${point_radius}','strokeColor':'#aaee77','strokeWidth':3}, 
{context:{num_points:function(feature){return feature.attributes.count},point_radius:function(feature){return 9+(feature.attributes.count)}}});

	var vector_style_select = new OpenLayers.Style({'fillColor':'#F08080','fillOpaciy':.9,'fontColor':'#232323','strokeColor':'#8B0000'});	

	var style_map = new OpenLayers.StyleMap    ({'default':vectore_style   ,'select':vector_style_select });

	var select_feature_control = new OpenLayers.Control.SelectFeature(vector_layer,{});

	vector_layer.styleMap = style_map ;
	vector_layer.setVisibility(true);

	//vector_layer.events.register('featureselected',this,on_select_feature);
	//vector_layer.events.register('featureunselected',this,on_unselect_feature);

	map1.addLayers([google_map,vector_layer,google_hybrid_map]);
	map1.addControl(select_feature_control );
	map1.addControl(new OpenLayers.Control.LayerSwitcher());
	select_feature_control.activate();

			
	if(!map1.getCenter()){
		map1.zoomToMaxExtent();
					}

		
}

function on_select_feature(event){

	var info_div = document.getElementById('photo_info_wrapper');
	info_div.innerHTML='';
	
	var cluster= event.feature.cluster;
	for(var i=0;i<cluster.length;i++){

		info_div.innerHTML +='<strong>'+cluster[i].attributes.name+'</strong>'+'<br/>'+"<img src='"+cluster[i].style.externalGraphic+"'/>"+cluster[i].attributes.description+'<br/><hr/>';

	}
}

function on_unselect_feature(event){
	
	var info_div = document.getElementById('photo_info_wrapper');
	info_div.innerHTML='';
}


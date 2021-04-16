var mapData,ALL_MARKERS=[],MARKERS_LAYER;


$(window).on('load', function() {


	//hide at start
	$('.filter').css('visibility', 'hidden');
	$('.search_container').hide();
	$("footer").hide();
	$(".group_elem").slideUp();
	$('#ships_to').hide();
	$('#collection').hide();
	$('#price_range').show();

	/*************************************/


	$('.filter_container_title'). click(function(){
		if($(".filter_container")[0].style.display=="none")
			$(".filter_container").slideDown();
		else
			$(".filter_container").slideUp();
	});

	$('#clearFilter'). click(function(){

		let elemNameArr = ['checkbox_collection' , 'checkbox_price_range', 'checkbox_shipment',
		'cb_price_range', 'cb_collection', 'cb_ships_to'
		];
		elemNameArr.forEach(function(name){
			let el = document.querySelector('input[name="'+name+'"]:checked');
			if(el) el.checked = false;
		});
		$(".group_elem").slideUp();
		filter2("all");
		checkAllOptions();
	});

	$('#cb_collection').click(function(){

		if($(this). is(":checked")){
			$(".group_col").slideDown();
		}
		else if($(this). is(":not(:checked)")){
			$(".group_col").slideUp();
		}
	});

	$('#cb_ships_to'). click(function(){

		if($(this). is(":checked")){
			$(".group_sh").slideDown();
		}
		else if($(this). is(":not(:checked)")){
			$(".group_sh").slideUp();
		}
	});

	$('#cb_price_range'). click(function(){

		if($(this). is(":checked")) {
			$(".group_pr").slideDown();
		}
		else if($(this). is(":not(:checked)")) {
			$(".group_pr").slideUp();
		}
	});

	$('input[type="checkbox"]').click(function(){
		//if ($(this).is(':checked') &&
		if (
		 this.name.indexOf('cb_') == -1
		) {
		  filter2($(this).val());
		}
	});

function checkAllOptions(){
	let ttt = $('input[type="checkbox"]');
	for(var i=0; i<ttt.length; i++){
		if(ttt[i].name.indexOf('cb_') ==-1)
			ttt[i].checked=true;
	}
}


	/*************************************/
function getCheckedArr(name){
	let t = $('input[name="'+name+'"]:checked');
	let arr= [];
	for(var i=0; i<t.length; i++){
		arr.push(t[i].value)
	}
	return arr;
}
function getCheckedArr1(){
	let t = $('input[type="checkbox"]:checked');
	let arr= [];
	for(var i=0; i<t.length; i++){
		if(t[i].name.indexOf('cb_')!==0)
			arr.push(t[i].value)
	}
	return arr;
}
	function filter2(val) {

		let collection_filter = document.querySelector('input[name="checkbox_collection"]:checked')
		let price_filter = document.querySelector('input[name="checkbox_price_range"]:checked')
		let shipment_filter = document.querySelector('input[name="checkbox_shipment"]:checked')

		MARKERS_LAYER.clearLayers();
		for(var i=0;i<ALL_MARKERS.length;i++){

			let m = ALL_MARKERS[i];
			if(val=="all"){
				MARKERS_LAYER.addLayer(m);
			}
			else {
				let arr = getCheckedArr1();
				//if(collection_filter && price_filter && shipment_filter){
					if(
						arr.includes( m.options.Collection ) &&
						arr.includes( m.options.Price_Range) &&
						arr.includes( m.options.Ships_To)
					){
						MARKERS_LAYER.addLayer(m);
					}
				//}
				/*
				else if(collection_filter && price_filter){
					if(
						arr.includes( m.options.Collection ) && arr.includes( m.options.Ships_To)
						//collection_filter.value == m.options.Collection &&
						//price_filter.value == m.options.Price_Range
					){
						MARKERS_LAYER.addLayer(m);
					}
				}
				else if(price_filter && shipment_filter){
					if(
						arr.includes( m.options.Price_Range  ) && arr.includes( m.options.Ships_To)
						//price_filter.value == m.options.Price_Range &&
						//shipment_filter.value == m.options.Ships_To
					){
						MARKERS_LAYER.addLayer(m);
					}
				}
				else if(collection_filter && shipment_filter){
					if(
						arr.includes( m.options.Collection ) && arr.includes( m.options.Ships_To)
						//collection_filter.value == m.options.Collection &&
						//shipment_filter.value == m.options.Ships_To
					){
						MARKERS_LAYER.addLayer(m);
					}
				}
				else if(collection_filter){
					if(
						arr.includes( m.options.Collection )
						//collection_filter.value == m.options.Collection
					){
						MARKERS_LAYER.addLayer(m);
					}
				}
				else if(price_filter){
					if(
						//let arr = getCheckedArr('checkbox_shipment');
						arr.includes( m.options.Price_Range )
						//price_filter.value == m.options.Price_Range
					){
						MARKERS_LAYER.addLayer(m);
					}
				}
				else if(shipment_filter){
					//checkbox_collection checkbox_price_range checkbox_shipment
					//let arr = getCheckedArr('checkbox_shipment');
					if(
						//shipment_filter.value == m.options.Ships_To
						arr.includes( m.options.Ships_To )
					){
						MARKERS_LAYER.addLayer(m);
					}
				}

				*/

			}
		}
	}

	checkAllOptions();

  var documentSettings = {};
  var markerColors = [];

  var polygonSettings = [];
  var polygonSheets = 1;
  var polygonsLegend;

  var completePoints = false;

  /**
   * Returns an Awesome marker with specified parameters
   */
  function createMarkerIcon(icon, prefix, markerColor, iconColor) {
    return L.AwesomeMarkers.icon({
      icon: icon,
      prefix: prefix,
      markerColor: markerColor,
      iconColor: iconColor
    });
  }

  /**
   * Sets the map view so that all markers are visible, or
   * to specified (lat, lon) and zoom if all three are specified
   */

  function centerAndZoomMap(points) {
  /*  var lat = map.getCenter(50.5, 30.5).lat, latSet = false;
    var lon = map.getCenter(50.5, 90).lng, lonSet = false;
    var zoom = 12, zoomSet = false;
    var center;*/

    if (getSetting('_initLat') !== '') {
      lat = getSetting('_initLat');
      latSet = false;
    }

    if (getSetting('_initLon') !== '') {
      lon = getSetting('_initLon');
      lonSet = false;
    }

    if (getSetting('_initZoom') !== '') {
      zoom = parseInt(getSetting('_initZoom'));
      zoomSet = false;
    }

    if ((latSet && lonSet) || !points) {
      center = L.latLng(lat, lon);
    } else {
      center = points.getBounds().getCenter();
    }

    if (points) {
      zoom = map.getBoundsZoom(points.getBounds());
    }

    map.setView(center, zoom);
  }


  /**
   * Assigns points to appropriate layers and clusters them if needed
   */
  function mapPoints(points) {
    //var layer;
	var markers = L.markerClusterGroup({
		maxClusterRadius:15
	});
	var searchData = [];
    // check that map has loaded before adding points to it?
    for (var i in points) {
      var point = points[i];

      // If icon contains '.', assume it's a path to a custom icon,
      // otherwise create a Font Awesome icon
      var iconSize = point['Custom Size'];
      var size = (iconSize.indexOf('x') > 0)
      ? [parseInt(iconSize.split('x')[0]), parseInt(iconSize.split('x')[1])]
      : [32, 32];

      var anchor = [size[0] / 2, size[1]];

      var icon = (point['Marker Icon'].indexOf('.') > 0)
        ? L.icon({
          iconUrl: point['Marker Icon'],
          iconSize: size,
          iconAnchor: anchor
        })
        : createMarkerIcon(point['Marker Icon'],
          'fa',
          point['Marker Color'].toLowerCase(),
          point['Icon Color']
        );

      if (point.Latitude !== '' && point.Longitude !== '') {
			let pointProperties = {
				name:point.Name,
				country:point.Country,
				latitude:point.Latitude,
				longitude:point.Longitude
			};
			searchData.push(pointProperties);

			var popup_img_html ="";
			if(point['Image']){
				var popup_imgs = point['Image'].split(',');
				if(popup_imgs.length>1){
 					popup_img_html = "<div class='banner-fade'><ul class='bjqs'>";
					for(var i=0;i<popup_imgs.length;i++){
					//https://www.jqueryscript.net/slider/Simple-Clean-jQuery-Image-Slider-Plugin-Basic-Slider.html
						//popup_img_html+= '<li><img src="' + point['Image'] + '"></li>'
						popup_img_html+='<li><img src="' + popup_imgs[i] + '" ></li>';
					}
					popup_img_html+="</ul></div>";
				}else{
					popup_img_html='<img src="' + point['Image'] + '" >';
				}
			}
        var marker = L.marker([point.Latitude, point.Longitude],
			{
				icon: icon,
				name:point.Name,
				Ships_To:point.Ships_To,
				Collection:point.Collection,
				Country:point.Country,
				Price_Range:point.Price_Range,
				no_imgs:popup_imgs.length
			}
		)
        .bindPopup("<b>" + point['Name'] + '</b><br>' +
          (popup_img_html) +
          point['Description'])
		.on('popupopen', function (popup) {
			if(popup.sourceTarget.options.no_imgs>1){
				map.setView(popup.sourceTarget.getLatLng(), map.getZoom());
				$('.banner-fade').bjqs({ height: '100%', width: '300px', responsive: true });
			}
		});
		 ;

			markers.addLayer(marker);
			//marker.addTo(layers[point.Group]);
			ALL_MARKERS.push(marker);
      }
    }


	//searchData

	ms_search_layer = $('#ms_search_layer').magicSuggest({
		placeholder: "Search...",
		data: searchData,
		valueField: 'name',
		displayField: 'name',
		displayFieldAdditional: ['country'],
		allowFreeEntries: false,
		highlight: false,
		collapsed: false,
		renderer: function (data) {
			 var html_div = '<div style="padding: 1px; overflow:hidden;">' +
				'<div style="font-family:Poppins;font-weight: bold; color: #333; font-size: 13px; line-height: 11px">' + data.name + '</div>' +
				'<div style="font-family:Poppins;color: #999; font-size: 10px">' + data.country + '</div>' +
			'</div>';
			return html_div;
		}
	});
	 $(ms_search_layer).on('selectionchange', function () {
		if (this.getSelection().length > 0) {

			var data = this.getSelection()[0];

			m = getMarkerByName(data.name);

			center = L.latLng(data.latitude, data.longitude);
			map.setView(center, 10);

			m.openPopup();

			setTimeout(function () {
				$("#ms_search_layer input")[0].setAttribute("placeholder", "");
				$("#ms_search_layer span.ms-helper")[0].style.display = "none";
			}, 1);


		} else {


		}

	});

	$("#ms_search_layer").on('click', 'span.ms-close-btn', function (e) {
		setTimeout(function () {
			ms_search_layer.clear();
		}, 1000);
	});

    completePoints = true;
    return markers;
  }

  var polygon = 0; // current active polygon
  var layer = 0; // number representing current layer among layers in legend


   /**
   * Here all data processing from the spreadsheet happens
   */
  function onMapDataLoad() {
    var options = mapData.sheets(constants.optionsSheetName).elements;
    createDocumentSettings(options);


    document.title = getSetting('_mapTitle');
    addBaseMap();

    // Add point markers to the map
    var points = mapData.sheets(constants.pointsSheetName);
    var layers;
    var group = '';
    if (points && points.elements.length > 0) {
      MARKERS_LAYER = mapPoints(points.elements);
	  map.addLayer( MARKERS_LAYER );
    } else {
      completePoints = true;
    }



    // Add location control
    if (getSetting('_mapMyLocation') !== 'off') {
      var locationControl = L.control.locate({
        keepCurrentZoomLevel: true,
        returnToPrevBounds: true,
        position: getSetting('_mapMyLocation')
      }).addTo(map);
    }

    // Add zoom control
    if (getSetting('_mapZoom') !== 'off') {
      L.control.zoom({position: getSetting('_mapZoom')}).addTo(map);
			zoomControl: false;
    }

    map.on('zoomend', function() {
      //togglePolygonLabels();
    });

		map.on('popupopen', function(e) {
    // find the pixel location on the map where the popup anchor is
    var px = map.project(e.popup._latlng);
   // find the height of the popup container, divide by 2 to centre, subtract from the Y axis of marker location
    px.y -= e.popup._container.clientHeight/2;
    // pan to new center
    map.panTo(map.unproject(px),{animate: true});
});

    addTitle();

    // Change Map attribution to include author's info + urls
    changeAttribution();

    // Append icons to categories in markers legend
    $('#points-legend form label span').each(function(i) {
      var legendIcon = (markerColors[i].indexOf('.') > 0)
        ? '<img src="' + markerColors[i] + '" class="markers-legend-icon">'
        : '&nbsp;<i class="fa fa-map-marker" style="color: '
          + markerColors[i]
          + '"></i>';
      $(this).prepend(legendIcon);
    });

    // When all processing is done, hide the loader and make the map visible
    showMap();

    function showMap() {
      if (completePoints ) {
        $('#map').css('visibility', 'visible');
        //$('.filter').show();
		$('.filter').css('visibility', 'visible');
		$("footer").show();
        $('.loader').hide();
		$('.search_container').show();

        // Open intro popup window in the center of the map
        if (getSetting('_introPopupText') != '') {
          initIntroPopup(getSetting('_introPopupText'), map.getCenter());
        };

       } else {
        setTimeout(showMap, 50);
      }
    }
  }

  /**
   * Adds title and subtitle from the spreadsheet to the map
   */
  function addTitle() {
    var dispTitle = getSetting('_mapTitleDisplay');

    if (dispTitle !== 'off') {
      var title = '<h3 class="pointer">' + getSetting('_mapTitle') + '</h3>';
      var subtitle = '<h5>' + getSetting('_mapSubtitle') + '</h5>';

      if (dispTitle == 'topleft') {
        $('div.leaflet-top').prepend('<div class="map-title leaflet-bar leaflet-control leaflet-control-custom">' + title + subtitle + '</div>');
      } else if (dispTitle == 'topcenter') {
        $('#map').append('<div class="div-center"></div>');
        $('.div-center').append('<div class="map-title leaflet-bar leaflet-control leaflet-control-custom">' + title + subtitle + '</div>');
      }

      $('.map-title h3').click(function() { location.reload(); });
    }
  }




  function initIntroPopup(info, coordinates) {
    // This is a pop-up for mobile device
    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
      $('body').append('<div id="mobile-intro-popup"><p>' + info +
        '</p><div id="mobile-intro-popup-close"><i class="fa fa-times"></i></div></div>');

      $('#mobile-intro-popup-close').click(function() {
        $("#mobile-intro-popup").hide();
      });
      return;
    }

    /* And this is a standard popup for bigger screens */
    L.popup({className: 'intro-popup'})
      .setLatLng(coordinates) // this needs to change
      .setContent(info)
      .openOn(map);
  }


  /**
   * Changes map attribution (author, GitHub repo, email etc.) in bottom-right
   */
  function changeAttribution() {
    var attributionHTML = $('.leaflet-control-attribution')[0].innerHTML;
    var credit = 'Developed by: <a target="_blank" href="https://farazahmed95.github.io/site/">Faraz Ahmed</a> | ';
    credit += 'Map: ' ;
    $('.leaflet-control-attribution')[0].innerHTML = credit + attributionHTML;
  }


  /**
   * Loads the basemap and adds it to the map
   */
  function addBaseMap() {
    var basemap = trySetting('_tileProvider', 'CartoDB.Positron');
    L.tileLayer.provider(basemap, {
      maxZoom: 17,
			noWrap:true,
    }).addTo(map);
    L.control.attribution({
      position: trySetting('_mapAttribution', 'bottomright')
    }).addTo(map);
  }



  /**
   * Returns the value of a setting s
   * getSetting(s) is equivalent to documentSettings[constants.s]
   */
  function getSetting(s) {
    return documentSettings[constants[s]];
  }



  /**
   * Returns the value of setting named s from constants.js
   * or def if setting is either not set or does not exist
   * Both arguments are strings
   * e.g. trySetting('_authorName', 'No Author')
   */
  function trySetting(s, def) {
    s = getSetting(s);
    if (!s || s.trim() === '') { return def; }
    return s;
  }


  /**
   * Triggers the load of the spreadsheet and map creation
   */
   //var mapData;

   $.ajax({
       url:'csv/Options.csv',
       type:'HEAD',
       error: function() {
         // Options.csv does not exist, so use Tabletop to fetch data from
         // the Google sheet
         mapData = Tabletop.init({
           key: googleDocURL,
           callback: function(data, mapData) { onMapDataLoad(); }
         });
       },
       success: function() {
         // Get all data from .csv files
         mapData = Procsv;
         mapData.load({
           self: mapData,
           tabs: ['Options', 'Points', 'Polygons', 'Polylines'],
           callback: onMapDataLoad
         });
       }
   });

  /**
   * Reformulates documentSettings as a dictionary, e.g.
   * {"webpageTitle": "Leaflet Boilerplate", "infoPopupText": "Stuff"}
   */
  function createDocumentSettings(settings) {
    for (var i in settings) {
      var setting = settings[i];
      documentSettings[setting.Setting] = setting.Customize;
    }
  }

  /**
   * Reformulates polygonSettings as a dictionary, e.g.
   * {"webpageTitle": "Leaflet Boilerplate", "infoPopupText": "Stuff"}
   */


  // Returns a string that contains digits of val split by comma evey 3 positions
  // Example: 12345678 -> "12,345,678"
  function comma(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
          val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
      }
      return val;
  }


});

function  getMarkerByName(name){
	for(var i=0;i<ALL_MARKERS.length;i++){
		let m = ALL_MARKERS[i];

		if( m.options.name == name)
			return m;
	}
	return null;
}
function test(){

map.eachLayer(function(layer){     //iterate over map rather than clusters
	if (layer.getChildCount){         // if layer is markerCluster
		console.log(layer._childCount);  // return count of points within each cluster
	}
	else{

	}
});


}

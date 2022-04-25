import React from "react";
import * as atlas from "azure-maps-control";
import * as mapservice from "azure-maps-rest";

const RouteMap = ({ to, from }) => {
//  pattern [75.7707758, 26.8803753]
  var map, datasource, client;

  function GetMap() {
    // Instantiate a map object
    var map = new atlas.Map("myMap", {
      // view: "Auto",

      language: "en-US",
      //Add authentication details for connecting to Azure Maps.
      authOptions: {
        //Use Azure Active Directory authentication.
        authType: "subscriptionKey",
        subscriptionKey: process.env.REACT_APP_MAPS_SUBSCRIPTION, //Your Azure Active Directory client id for accessing your Azure Maps account.
      }
    });

    //Wait until the map resources are ready.
    map.events.add("ready", function () {
      //Create a data source and add it to the map.
      datasource = new atlas.source.DataSource();
      map.sources.add(datasource);

      //Add a layer for rendering the route lines and have it render under the map labels.
      map.layers.add(
        new atlas.layer.LineLayer(datasource, null, {
          strokeColor: "#2272B9",
          strokeWidth: 5,
          lineJoin: "round",
          lineCap: "round"
        }),
        "labels"
      );

      //Add a layer for rendering point data.
      map.layers.add(
        new atlas.layer.SymbolLayer(datasource, null, {
          iconOptions: {
            image: ["get", "icon"],
            allowOverlap: true
          },
          textOptions: {
            textField: ["get", "title"],
            offset: [0, 1.2]
          },
          filter: [
            "any",
            ["==", ["geometry-type"], "Point"],
            ["==", ["geometry-type"], "MultiPoint"]
          ] //Only render Point or MultiPoints in this layer.
        })
      );

      //Create the GeoJSON objects which represent the start and end points of the route.
      var startPoint = new atlas.data.Feature(
        new atlas.data.Point(from),
        {
          icon: "pin-blue"
        }
      );

      var endPoint = new atlas.data.Feature(
        new atlas.data.Point(to),
        {
          icon: "pin-round-blue"
        }
      );

      //Add the data to the data source.
      datasource.add([startPoint, endPoint]);

      map.setCamera({
        bounds: atlas.data.BoundingBox.fromData([startPoint, endPoint]),
        padding: 80
      });

      //Use MapControlCredential to share authentication between a map control and the service module.
      var pipeline = mapservice.MapsURL.newPipeline(
        new mapservice.MapControlCredential(map)
      );

      //Construct the RouteURL object
      var routeURL = new mapservice.RouteURL(pipeline);

      //Start and end point input to the routeURL
      var coordinates = [
        [
          startPoint.geometry.coordinates[0],
          startPoint.geometry.coordinates[1]
        ],
        [endPoint.geometry.coordinates[0], endPoint.geometry.coordinates[1]]
      ];

      //Make a search route request
      routeURL
        .calculateRouteDirections(
          mapservice.Aborter.timeout(10000),
          coordinates
        )
        .then((directions) => {
          //Get data features from response
          var data = directions.geojson.getFeatures();
          datasource.add(data);
        }).catch(err=>{
          console.error(err)
        })
    });
  }

  React.useEffect(() => {
    GetMap();
  }, [to, from]);
  return <div id="myMap" style={{ marginTop: '8px', height: "350px", width: '100%' }}></div>;
};

export default RouteMap;

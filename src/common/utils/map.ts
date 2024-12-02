import Map from "ol/Map.js";
import View from "ol/View.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import OSM from "ol/source/OSM.js";
import TileWMS from "ol/source/TileWMS.js";
import Feature from "ol/Feature.js";
import { Point } from "ol/geom.js";
import { Icon, Style } from "ol/style.js";

class CustomMap {
  pois = [];
  openStreetMap = null;
  tileMap = null;
  poiLayer = null;
  myPoiLayer = null;
  mapContent = null;

  zoom = 0;
  maxZoom = 0;
  minZoom = 0;

  center = [];

  constructor({
    target,
    url,
    layers,
    proj = "EPSG:4326",
    zoom = 7,
    maxZoom = 15,
    minZoom = 7,
    center = [127.92, 36.7],
    extent = [123.49, 33.0, 132.37, 38.51],
  }) {
    this.zoom = zoom;
    this.maxZoom = maxZoom;
    this.minZoom = minZoom;
    this.center = center;

    this.mapContent = new Map({
      layers: [],
      controls: [],
      target,
      view: new View({
        projection: proj,
        center: center ?? [127.92, 36.7],
        zoom,
        maxZoom,
        minZoom,
        extent: extent ?? [123.49, 33.0, 132.37, 38.51],
      }),
    });

    this.openStreetMap = new TileLayer({
      visible: false,
      source: new OSM(),
    });
    this.mapContent.addLayer(this.openStreetMap);

    if (url && layers) {
      this.tileMap = new TileLayer({
        visible: false,
        source: new TileWMS({
          url,
          serverType: "geoserver",
          params: {
            LAYERS: layers,
            TILED: true,
            VERSION: "1.1.0",
            FORMAT: "image/png",
            SRS: proj,
          },
        }),
      });
      this.mapContent.addLayer(this.tileMap);
    }

    this.poiLayer = new VectorLayer({
      source: new VectorSource({}),
    });
    this.mapContent.addLayer(this.poiLayer);

    this.myPoiLayer = new VectorLayer({
      source: new VectorSource({}),
    });
    this.mapContent.addLayer(this.myPoiLayer);

    this.showBaseMap(this.zoom);

    this.mapContent.on("moveend", (evt) => {
      let curZoom = Math.round(evt.map.getView().getZoom());
      if (this.zoom !== curZoom) {
        this.zoom = curZoom;
        this.showBaseMap(this.zoom);
        this.redrawPois(this.zoom);
      }
    });

    this.mapContent.on("click", (evt) => {
      let index = 0;
      evt.map.forEachFeatureAtPixel(
        evt.pixel,
        (feature, layer) => {
          if (index++ === 0) {
            let values = feature.getProperties();
            if (values.onClick !== undefined) {
              values.onClick();
            }
          }
        },
        {
          hitTolerance: 2,
          layerFilter: (layer) => {
            return layer === this.poiLayer;
          },
        }
      );
    });
  }

  setZoom(val) {
    if (val >= this.minZoom && val <= this.maxZoom) {
      this.zoom = val;
      this.mapContent.getView().setZoom(val);
      this.showBaseMap(this.zoom);
      this.redrawPois(this.zoom);
    }
  }

  setCenter(val) {
    console.log(val);
    this.center = val;
    this.mapContent.getView().setCenter(val);
  }

  getCenter() {
    this.center = this.mapContent.getView().getCenter();
    return this.center;
  }

  initMyPoi({ image, position }) {
    const myPoi = new Feature(new Point(position));
    myPoi.setStyle(
      new Style({
        image: new Icon({
          src: image,
          scale: 0.8,
          anchor: [0.5, 0.8],
        }),
      })
    );
    this.myPoiLayer.getSource().addFeature(myPoi);
  }

  clearMyPoi() {
    this.myPoiLayer.getSource().clear();
  }

  fitMyExtent() {
    this.mapContent
      .getView()
      .fit(this.myPoiLayer.getSource().getExtent(), this.mapContent.getSize());
  }

  showBaseMap(curZoom) {
    this.openStreetMap.setVisible(curZoom > 9 || this.tileMap == null);
    if (this.tileMap) {
      this.tileMap.setVisible(curZoom <= 9);
    }
  }

  redrawPois(curZoom) {
    let poiSource = this.poiLayer.getSource();
    poiSource.clear();

    this.pois.map((el) => {
      let prop = el.getProperties();
      if (!prop.level || prop.level.indexOf("[" + curZoom + "]") >= 0) {
        poiSource.addFeature(el);
      }
    });
    this.zoom = curZoom;
  }

  addPois(arr) {
    this.pois = arr.map((e) => {
      const poi = new Feature(new Point(e.position));
      poi.setStyle(
        new Style({
          image: new Icon({
            src: e.image,
            scale: e.scale ?? 0.15,
          }),
        })
      );
      poi.setProperties({ level: e.indictLevel });
      poi.setProperties({ onClick: e.onClick });

      return poi;
    });

    this.poiLayer.getSource().addFeatures(this.pois);
  }

  clearPois() {
    this.poiLayer.getSource().clear();
  }

  fitExtent() {
    this.mapContent
      .getView()
      .fit(this.poiLayer.getSource().getExtent(), this.mapContent.getSize());
  }

  refresh() {
    this.mapContent.getLayers().forEach((layer) => layer.getSource().refresh());
  }

  destroy() {
    this.mapContent = null;
  }
}

export default CustomMap;

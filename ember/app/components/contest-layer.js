import { action } from '@ember/object';
import Component from '@glimmer/component';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

const CLASSIC_COLOR = '#ff2c73';
const TRIANGLE_COLOR = '#9f14ff';

export default class ContestLayer extends Component {
  source = new VectorSource();
  layer = new VectorLayer({
    source: this.source,
    style: style_function,
    name: 'Contest',
    zIndex: 49,
  });

  @action
  setVisible([value]) {
    this.layer.setVisible(value);
  }

  constructor() {
    super(...arguments);
    this.args.map.addLayer(this.layer);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.args.map.removeLayer(this.layer);
  }
}

/**
 * Determin the drawing style for the feature
 * @param {ol.feature} feature Feature to style
 * @return {!Array<ol.style.Style>} Style of the feature
 */
function style_function(feature) {
  let isTriangle = feature.get('isTriangle');
  let color = isTriangle ? TRIANGLE_COLOR : CLASSIC_COLOR;

  return [
    new Style({
      stroke: new Stroke({ color, width: 2, lineDash: [5] }),
      zIndex: 999,
    }),
  ];
}

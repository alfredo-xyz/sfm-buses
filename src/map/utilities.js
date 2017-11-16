// Utilities 

/**
 * Fetch wrapper for JSON files
 * @param {string} path - JSON file path
 * @returns {Promise} - Resolves with JSON if response is OK. Rejects if there's an error.
 */
export const fetchJSON = (path) => new Promise((resolve, reject) => {
  fetch(path).then(response => {
    if (response.status !== 200) {
      console.log(`There was a problem: ${response.status}`);
      reject(response);
    }
    response.json().then(data => resolve(data));
  });
})
/**
 * Adapted form less.js http://lesscss.org/
 */
export class Color {
  /**
   * 
   * @param {string|number[]} rgb - Color in RGB (array) or HEX (string) format
   * @param {number} a - Opacity 0-1
   */
  constructor(rgb, a) {
    if (Array.isArray(rgb)) {
      this.rgb = rgb;
    } else if (rgb.length === 6) {
      this.rgb = rgb.match(/.{2}/g).map(function(c) {
        return parseInt(c, 16);
      });
    } else {
      this.rgb = rgb.split('').map(function(c) {
        return parseInt(c + c, 16);
      });
    }
    this.alpha = typeof a === 'number' ? a : 1;
  }
  toHex() {
    return (
      '#' +
      this.rgb
        .map(function(c) {
          c = Color.clamp(Math.round(c), 255);
          return (c < 16 ? '0' : '') + c.toString(16);
        })
        .join('')
    );
  }
  toHSL() {
    const r = this.rgb[0] / 255,
      g = this.rgb[1] / 255,
      b = this.rgb[2] / 255,
      a = this.alpha;

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    let h,
      s,
      l = (max + min) / 2,
      d = max - min;

    if (max === min) {
      h = s = 0;
    } else {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
        default:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s, l: l, a: a };
  }

  /**
   * Color mixing method
   * @param {string|number[]} c1 - Color in RGB (array) or HEX (string) format
   * @param {string|number[]} c2 - Color in RGB (array) or HEX (string) format
   * @param {number} weight - 0-100
   * @returns {Color} - New mixed color
   * @copyright (c) 2006-2009 Hampton Catlin, Natalie Weizenbaum, and Chris Eppstein | http://sass-lang.com via less.js
   */
  static mix(c1, c2, weight) {
    const color1 = new Color(c1),
      color2 = new Color(c2);
    let p, w, a, w1, w2, rgb, alpha;

    if (!weight) {
      weight = 50;
    }
    p = weight / 100.0;
    w = p * 2 - 1;
    a = color1.toHSL().a - color2.toHSL().a;

    w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
    w2 = 1 - w1;

    rgb = [
      color1.rgb[0] * w1 + color2.rgb[0] * w2,
      color1.rgb[1] * w1 + color2.rgb[1] * w2,
      color1.rgb[2] * w1 + color2.rgb[2] * w2
    ];

    alpha = color1.alpha * p + color2.alpha * (1 - p);

    return new Color(rgb, alpha);
  }
  static clamp(v, max) {
    return Math.min(Math.max(v, 0), max);
  }
}

export const nextBusApi = {
  url: 'http://webservices.nextbus.com/service/publicJSONFeed?',
  agency: '&a=sf-muni',
  get: function(params) {
    return fetchJSON(this.url + params + this.agency)
  }
}


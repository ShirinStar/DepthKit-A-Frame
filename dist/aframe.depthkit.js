(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

//Depthkit.js minified
!function e(i, n, t) {
  function o(r, s) {
    if (!n[r]) {
      if (!i[r]) {
        var l = "function" == typeof require && require;if (!s && l) return l(r, !0);if (a) return a(r, !0);var u = new Error("Cannot find module '" + r + "'");throw u.code = "MODULE_NOT_FOUND", u;
      }var h = n[r] = { exports: {} };i[r][0].call(h.exports, function (e) {
        var n = i[r][1][e];return o(n || e);
      }, h, h.exports, e, i, n, t);
    }return n[r].exports;
  }for (var a = "function" == typeof require && require, r = 0; r < t.length; r++) {
    o(t[r]);
  }return o;
}({ 1: [function (e, i, n) {
    i.exports = function (e) {
      "string" == typeof e && (e = [e]);for (var i = [].slice.call(arguments, 1), n = [], t = 0; t < e.length - 1; t++) {
        n.push(e[t], i[t] || "");
      }return n.push(e[t]), n.join("");
    };
  }, {}], 2: [function (e, i, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });var t = function () {
      function e(e, i) {
        for (var n = 0; n < i.length; n++) {
          var t = i[n];t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
        }
      }return function (i, n, t) {
        return n && e(i.prototype, n), t && e(i, t), i;
      };
    }();var o = e("glslify"),
        a = function () {
      function e() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "mesh",
            n = arguments[1],
            t = this,
            a = arguments[2];arguments[3];!function (e, i) {
          if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = o(["#define GLSLIFY 1\nuniform sampler2D map;\nuniform float opacity;\n\nuniform float uvdy;\nuniform float uvdx;\n\nvarying float visibility;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vPos;\n\nvoid main() {\n\n    if ( visibility < 0.75 ) discard;\n\n    vec4 color = texture2D( map, vUv + vec2(uvdx, uvdy));\n    color.w = opacity;\n\n    gl_FragColor = color;\n    \n}"]),
            s = o(["#define GLSLIFY 1\nuniform float mindepth;\nuniform float maxdepth;\n\nuniform float width;\nuniform float height;\n\nuniform bool isPoints;\nuniform float pointSize;\n\nuniform float time;\n\nvarying vec3 vNormal;\nvarying vec3 vPos;\n\n//TODO: make uniforms\nconst float fx = 1.11087;\nconst float fy = 0.832305;\n\nuniform sampler2D map;\n\n//Making z global\nfloat z;\n\nvarying float visibility;\nvarying vec2 vUv;\n\nvec3 rgb2hsl( vec3 color ) {\n    float h = 0.0;\n    float s = 0.0;\n    float l = 0.0;\n    float r = color.r;\n    float g = color.g;\n    float b = color.b;\n    float cMin = min( r, min( g, b ) );\n    float cMax = max( r, max( g, b ) );\n    l =  ( cMax + cMin ) / 2.0;\n    if ( cMax > cMin ) {\n        float cDelta = cMax - cMin;\n        // saturation\n        if ( l < 0.5 ) {\n            s = cDelta / ( cMax + cMin );\n        } else {\n            s = cDelta / ( 2.0 - ( cMax + cMin ) );\n        }\n\n        // hue\n        if ( r == cMax ) {\n            h = ( g - b ) / cDelta;\n        } else if ( g == cMax ) {\n            h = 2.0 + ( b - r ) / cDelta;\n        } else {\n            h = 4.0 + ( r - g ) / cDelta;\n        }\n\n        if ( h < 0.0) {\n            h += 6.0;\n        }\n        h = h / 6.0;\n\n    }\n    return vec3( h, s, l );\n}\n\nvec3 xyz( float x, float y, float depth ) {\n    z = depth * ( maxdepth - mindepth ) + mindepth;\n    return vec3( ( x / height  ) * z * fx, ( y / (width * 2.0)  ) * z * fy, - z );\n}\n\nvoid main() {\n\n    vUv = vec2( ( position.x + 512.0 ) / 1024.0 , ( position.y + 512.0  ) / 1024.0 );\n\n    vUv.y = vUv.y * 0.5;// + 0.5;\n\n    vPos = (modelMatrix * vec4(position, 1.0 )).xyz;\n    vNormal = normalMatrix * normal;\n\n    vec3 hsl = rgb2hsl( texture2D( map, vUv ).xyz );\n    vec4 pos = vec4( xyz( position.x, position.y, hsl.x ), 1.0 );\n    pos.z += 2600.0;\n\n    visibility = hsl.z * 2.1;\n\n    if(isPoints){\n        gl_PointSize = pointSize;\n    }\n\n    gl_Position = projectionMatrix * modelViewMatrix * pos;\n}"]);switch (this.video = document.createElement("video"), this.video.crossOrigin = "anonymous", this.video.setAttribute("crossorigin", "anonymous"), this.video.src = a, this.video.autoplay = !1, this.video.loop = !1, this.videoTexture = new THREE.VideoTexture(this.video), this.videoTexture.minFilter = THREE.NearestFilter, this.videoTexture.magFilter = THREE.LinearFilter, this.videoTexture.format = THREE.RGBFormat, this.videoTexture.generateMipmaps = !1, this.manager = new THREE.LoadingManager(), this.props, e.geo || e.buildGeomtery(), this.material = new THREE.ShaderMaterial({ uniforms: { map: { type: "t", value: this.videoTexture }, time: { type: "f", value: 0 }, mindepth: { type: "f", value: 0 }, maxdepth: { type: "f", value: 0 }, uvdy: { type: "f", value: .5 }, uvdx: { type: "f", value: 0 }, width: { type: "f", value: 0 }, height: { type: "f", value: 0 }, opacity: { type: "f", value: 1 }, isPoints: { type: "b", value: !1 }, pointSize: { type: "f", value: 3 } }, vertexShader: s, fragmentShader: r, transparent: !0 }), this.material.side = THREE.DoubleSide, i) {case "wire":
            this.material.wireframe = !0, this.mesh = new THREE.Mesh(e.geo, this.material);break;case "points":
            this.material.uniforms.isPoints.value = !0, this.mesh = new THREE.Points(e.geo, this.material);break;default:
            this.mesh = new THREE.Mesh(e.geo, this.material);}this.jsonLoader = new THREE.FileLoader(this.manager), this.jsonLoader.setResponseType("json"), this.jsonLoader.load(n, function (e) {
          t.props = e, t.material.uniforms.width.value = t.props.textureWidth, t.material.uniforms.height.value = t.props.textureHeight, t.material.uniforms.mindepth.value = t.props.nearClip, t.material.uniforms.maxdepth.value = t.props.farClip;
        }), this.mesh.depthkit = this;var l = new THREE.SphereGeometry(300, 32, 32),
            u = new THREE.MeshBasicMaterial({ color: 16776960, wireframe: !0 });return this.colider = new THREE.Mesh(l, u), this.colider.scale.set(5, 2.5, 2.5), this.colider.visible = !1, this.mesh.add(this.colider), this.mesh.name = "depthkit", this.mesh;
      }return t(e, [{ key: "setPointSize", value: function value(e) {
          this.material.uniforms.isPoints.value ? this.material.uniforms.pointSize.value = e : console.warn("Can not set point size because the current character is not set to render points");
        } }, { key: "setOpacity", value: function value(e) {
          this.material.uniforms.opacity.value = e;
        } }, { key: "setLineWidth", value: function value(e) {
          this.material.wireframe ? this.material.wireframeLinewidth = e : console.warn("Can not set the line width because the current character is not set to render wireframe");
        } }, { key: "play", value: function value() {
          this.video.isPlaying ? console.warn("Can not play because the character is already playing") : this.video.play();
        } }, { key: "stop", value: function value() {
          this.video.currentTime = 0, this.video.pause();
        } }, { key: "pause", value: function value() {
          this.video.pause();
        } }, { key: "setLoop", value: function value(e) {
          this.video.loop = e;
        } }, { key: "setVolume", value: function value(e) {
          this.video.volume = e;
        } }, { key: "update", value: function value(e) {
          this.material.uniforms.time.value = e;
        } }, { key: "dispose", value: function value() {} }], [{ key: "buildGeomtery", value: function value() {
          e.geo = new THREE.Geometry();for (var i = 0; i < 256; i++) {
            for (var n = 0; n < 256; n++) {
              e.geo.vertices.push(new THREE.Vector3(5 * n - 640, 480 - 5 * i, 0));
            }
          }for (var t = 0; t < 255; t++) {
            for (var o = 0; o < 255; o++) {
              e.geo.faces.push(new THREE.Face3(o + 256 * t, o + 256 * (t + 1), o + 1 + 256 * t)), e.geo.faces.push(new THREE.Face3(o + 1 + 256 * t, o + 256 * (t + 1), o + 1 + 256 * (t + 1)));
            }
          }
        } }]), e;
    }();n.default = a;
  }, { glslify: 1 }], 3: [function (e, i, n) {
    "use strict";
    var t,
        o = e("./depthkit"),
        a = (t = o) && t.__esModule ? t : { default: t };window.DepthKit = a.default;
  }, { "./depthkit": 2 }] }, {}, [3]);

//Make sure AFrame is available
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

//AFrame DepthKit.js wrapper entity
AFRAME.registerComponent('depthkit', {

  schema: {
    type: { type: 'string', default: 'mesh' },
    videoPath: { type: 'string' },
    metaPath: { type: 'string' },
    loop: { type: 'boolean', default: true },
    autoplay: { type: 'boolean', default: true }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: true,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function init() {

    //Create a depthkit instance
    var character = new DepthKit(this.data.type, this.data.metaPath, this.data.videoPath);
    //Will it loop?
    character.depthkit.setLoop(this.data.loop);

    //Rotate it back to position
    character.rotation.z = THREE.Math.degToRad(90);

    //If autoplay is on play the take
    if (this.data.autoplay) character.depthkit.play();

    //Set the Object3D
    this.el.setObject3D('mesh', character);

    //Translate it so it is in front of you at eye level
    this.el.object3D.scale.multiplyScalar(0.001);
    this.el.object3D.position.z = -2;
    this.el.object3D.position.y = 1;
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function update(oldData) {},

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function remove() {},

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function pause() {},

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function play() {}
});

},{}]},{},[1]);

precision mediump float;

uniform sampler2D u_texture;
uniform vec4 u_color;

varying vec2 v_texCoord;
varying vec3 v_pos;


void main() {

    gl_FragColor = vec4(normalize(v_pos).rg,1.0,1.0);
}
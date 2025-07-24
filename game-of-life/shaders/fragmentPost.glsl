precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform vec2 u_pixelSize;

varying vec3 v_pos;
varying vec2 v_texCoord;

void main() {

    vec4 avgTex = texture2D(u_texture,v_texCoord);

    gl_FragColor = avgTex;

}
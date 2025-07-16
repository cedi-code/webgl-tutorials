precision mediump float;

uniform vec4 u_color;
uniform vec3 u_lightPos;
uniform mat4 u_lightTransform;
uniform sampler2D u_texture;

varying vec2 v_texCoord;

void main() {

    gl_FragColor = texture2D(u_texture,v_texCoord);
}

attribute vec3 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;


void main() {

    vec4 position = vec4(a_position.xyz,1.0);

    gl_Position = position;

    v_texCoord = a_texCoord;
}
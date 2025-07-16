
attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

varying vec4 v_color;

uniform mat4 u_transform;

void main() {

    vec4 position = (u_transform * vec4(a_position.xyz,1.0));

    gl_Position = position;

    v_color = vec4((a_normal + 1.0) / 2.0, 1.0);
}
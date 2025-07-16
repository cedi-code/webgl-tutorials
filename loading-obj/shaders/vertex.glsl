
attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

varying vec3 v_normal;
varying vec4 v_position;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;

void main() {

    vec4 position = (u_projection * u_view * u_world * vec4(a_position.xyz,1.0));

    gl_Position = position;

    v_normal = mat3(u_world) * a_normal;
    v_position = u_world * vec4(a_position, 1.0);
}
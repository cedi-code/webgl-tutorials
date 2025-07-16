attribute vec3 a_position;

varying vec4 v_color;

uniform mat4 u_transform;

uniform mat4 u_ortographicTransform;

void main() {

     vec4 position = (u_transform * vec4(a_position.xyz, 1.0));


    gl_Position = position;

    v_color = (u_ortographicTransform * vec4(a_position.xyz, 1.0)) * 0.5 + 0.5;
}
attribute vec2 a_position;

varying vec4 v_color;

uniform mat3 u_transform;

void main() {

    gl_Position = vec4((u_transform * vec3(a_position,1)).xy,0,1) ;

    v_color = gl_Position * 0.5 + 0.5;
}
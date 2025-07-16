attribute vec3 a_position;
attribute vec3 a_normal;

varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

uniform mat4 u_transform;
uniform mat4 u_world;
uniform mat4 u_worldInverseTranspose;
uniform vec3 u_worldLightPos;
uniform vec3 u_viewWorldPos;

void main() {

    vec4 position = (u_transform * vec4(a_position.xyz, 1.0));
    gl_Position = position;

    // pass normal to fragment shader (it will be interpolated lol)
    v_normal = mat3(u_worldInverseTranspose) * a_normal;

    // compute world position of the surface
    vec3 surfaceWorldPos = (u_world * vec4(a_position.xyz, 1.0)).xyz;
    // vector pointing from the surface to the light point
    v_surfaceToLight = u_worldLightPos - surfaceWorldPos;

    // vector pointing towards camera
    v_surfaceToView = u_viewWorldPos - surfaceWorldPos;


}
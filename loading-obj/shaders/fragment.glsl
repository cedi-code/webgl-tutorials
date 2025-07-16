precision mediump float;

uniform vec4 u_color;
uniform vec3 u_lightPos;
uniform mat4 u_lightTransform;

varying vec3 v_normal;
varying vec4 v_position;

void main() {
    vec4 light = u_lightTransform * vec4(u_lightPos,1);
    vec3 normal = normalize(v_normal);
    vec3 lightDir = normalize(light.xyz - v_position.xyz);

    float fac = max(dot(lightDir,normal),0.0);

    gl_FragColor = vec4(u_color.xyz * fac, 1.0);
}
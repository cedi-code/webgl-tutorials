precision mediump float;

uniform vec4 u_color;
uniform vec3 u_lightPos;
uniform mat4 u_lightTransform;
uniform float u_distMax;
uniform float u_distMin;
uniform float u_cellThreshold1;
uniform float u_cellThreshold2;

varying vec3 v_normal;
varying vec4 v_position;


void main() {
    vec4 light = u_lightTransform * vec4(u_lightPos,1);
    vec3 normal = normalize(v_normal);
    vec3 lightDir = normalize(light.xyz - v_position.xyz);

    float distMax = u_lightPos.z * u_distMax;
    float distMin = u_lightPos.z * u_distMin;
    float dist = clamp(distance(light.xyz, v_position.xyz),distMin,distMax);

    float distFac = 1.0 - (dist-distMin) / (distMax - distMin);

    float fac = (dot(lightDir,normal) + 1.0) / 2.0;
    fac *= distFac;

    float thresholdValue1 = 0.5;
    float thresholdValue2 = 1.0 - thresholdValue1;

    float binaryFac1 = ceil(fac-u_cellThreshold1);
    float binaryFac2 = ceil(fac-u_cellThreshold2);

    gl_FragColor = vec4(u_color.rgb * binaryFac1 * (thresholdValue1 + thresholdValue2 * binaryFac2) ,1.0);
}
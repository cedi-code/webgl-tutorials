precision mediump float;

uniform vec4 u_color;
uniform vec3 u_lightPos;
uniform float u_threshold1;
uniform float u_threshold2;

varying vec3 v_normal;

void main() {

    vec3 lightDir = normalize(u_lightPos);
    vec3 norm = normalize(v_normal);
    

    float thresholdValue1 = 0.5;
    float thresholdValue2 = 1.0 - thresholdValue1;

    float fac = (dot(norm,lightDir)+1.0) / 2.0;

    float binaryFac1 = ceil(fac-u_threshold1);
    float binaryFac2 = ceil(fac-u_threshold2);

    gl_FragColor = vec4(u_color.rgb * binaryFac1 * (thresholdValue1 + thresholdValue2 * binaryFac2) ,1.0);
}
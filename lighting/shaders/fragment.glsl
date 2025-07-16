precision mediump float;

varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

uniform vec4 u_color;
uniform float u_shininess;




void main() {

    vec3 normal = normalize(v_normal);
    vec3 surfaceToLight = normalize(v_surfaceToLight);
    vec3 surfaceToView = normalize(v_surfaceToView);

    vec3 halfVec = normalize(surfaceToLight + surfaceToView);

    float light = dot(normal, surfaceToLight);
    float specular = 0.0;

    if (light > 0.0) {
        specular = pow(dot(normal, halfVec), u_shininess);
    }

    gl_FragColor = u_color;

    gl_FragColor.rgb *= light; 
    gl_FragColor.rgb += specular;
}
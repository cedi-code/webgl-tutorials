precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform vec2 u_pixelSize;
uniform bool u_create;

varying vec3 v_pos;
varying vec2 v_texCoord;


void main() {

    vec2 oneP = u_pixelSize / u_textureSize;

    vec4 pixel00 = texture2D(u_texture,v_texCoord + oneP);
    vec4 pixel01 = texture2D(u_texture,v_texCoord + vec2(0,oneP.y));
    vec4 pixel02 = texture2D(u_texture,v_texCoord + vec2(-oneP.x,oneP.y));
    vec4 pixel10 = texture2D(u_texture,v_texCoord + vec2(oneP.x,0));
    // we are pixel 11
    vec4 pixel11 = texture2D(u_texture,v_texCoord);

    vec4 pixel12 = texture2D(u_texture, v_texCoord + vec2(-oneP.x,0));
    vec4 pixel20 = texture2D(u_texture, v_texCoord + vec2(oneP.x,-oneP.y));
    vec4 pixel21 = texture2D(u_texture, v_texCoord + vec2(0,-oneP.y));
    vec4 pixel22 = texture2D(u_texture, v_texCoord - oneP);

    vec4 sumNeighboors = (pixel00 + pixel01 + pixel02 + pixel10 + pixel12 + pixel20 + pixel21 + pixel22);
    sumNeighboors = sumNeighboors / 10.0;
    
    // if we have more than 3 neighboors
    vec3 overPopulation = vec3(1.0) -  ceil(sumNeighboors.rgb - vec3(0.39));
    // if we have less 
    vec3 underPopulation = ceil(sumNeighboors.rgb - vec3(0.11));


    // make new cell
    vec3 isBorn = ceil(sumNeighboors.rgb - vec3(0.29)) * (vec3(1.0) - ceil(sumNeighboors.rgb -  vec3(0.31)));
    vec4 newPixel = vec4(isBorn,1);

    gl_FragColor = vec4((pixel11.rgb + newPixel.rgb)  * overPopulation * underPopulation, 1.0);

}
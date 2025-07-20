precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform vec2 u_blurSize;

varying vec2 v_texCoord;

void main() {

    vec2 oneP = u_blurSize / u_textureSize;

    vec4 avgTex = (texture2D(u_texture,v_texCoord) + 
            texture2D(u_texture,v_texCoord + vec2(oneP.x,0)) +
            texture2D(u_texture,v_texCoord + vec2(-oneP.x, 0)) +
            texture2D(u_texture, v_texCoord + vec2(0,oneP.y)) +
            texture2D(u_texture, v_texCoord + vec2(0,-oneP.y)) 
            ) / 5.0;

    gl_FragColor = avgTex;

}
import { AttributeArrayData, AttributeSetter, BufferInfo, myWebglUtils, UniformData, UniformSetter } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
import { primitives } from "../utils/myPrimitives.js";
const canvas = document.getElementById('my_canvas') as HTMLCanvasElement;
const gl = canvas?.getContext('webgl') as WebGLRenderingContext;
if (!gl) {
    throw new Error('WebGL not supported');
}
const program = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragment.glsl');
if (!program) {
    throw new Error('shader program failed');
}
// ==== set up data
const uniformSetter = myWebglUtils.createUniformSetters(gl, program) as UniformSetter;
const attributeSetter = myWebglUtils.createAttributeSetters(gl, program) as AttributeSetter;

const cubeData = primitives.createCube(2,true) as AttributeArrayData;
const myTexCoords : number[] = [
    // Front face (0,0), (1,0), (1,1), (0,1) for a quad
    1, 1,   0, 1,   0, 0,   1, 0, 
    // Back face (order might be reversed depending on desired mapping)
     0, 1,   0, 0,    1, 0,   1, 1, // Adjusted for back face to match its vertex order
    // Top face
    0, 1,   0, 0,   1, 0,   1, 1, // Adjusted for top face vertex order
    // Bottom face
    0, 0,   1, 0,   1, 1,   0, 1,
    // Right face
    1, 1,   1, 0,   0, 0,   0, 1,  // Adjusted for right face vertex order
    // Left face
    0, 1,  1, 1,   1, 0,   0, 0    // Adjusted for left face vertex order
];
cubeData.a_texCoord.dataArray = myTexCoords;
const bufferInfo = myWebglUtils.createBufferInfoFromArrays(gl, cubeData) as BufferInfo;
let projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
let viewMatrix = myMath.inverse(myMath.lookAt([0, 3, 7], [0, 0, 0], [0, 1, 0]));


// == Create a texture ==
const texture = gl.createTexture() as WebGLTexture;
gl.bindTexture(gl.TEXTURE_2D, texture);
    

// fill texture with 3x2 pixels
const level : number = 0;
const internalFormat = gl.LUMINANCE;
const width : number = 3;
const height : number = 2;
const border : number = 0;
const format = gl.LUMINANCE;
const type = gl.UNSIGNED_BYTE;
const data = new Uint8Array([
    128,  64, 128,
      0, 192,   0,
]);

const alignment : number = 1;
gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

gl.texImage2D(gl.TEXTURE_2D, level,internalFormat,width,height,border,format,type,data);

// set becaue we dont hav emips and its not filterd?
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// == ==

// == Create a texture to render to==
const targetTextureWidth : number = 256;
const targetTextureHeight : number = 256;
const targetTexture : WebGLTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);

{
    const level : number = 0;
    const internalFormat = gl.RGBA;
    const border : number = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;


    gl.texImage2D(gl.TEXTURE_2D, level,internalFormat,
                  targetTextureWidth,targetTextureHeight,border,
                  format,type,data);

    // set becaue we dont hav emips and its not filterd?
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
// == ==

// ==  create frame buffers and bind them ==
const fb : WebGLFramebuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER,fb);

// attach the texture as first color attachment
const attachmentPoint = gl.COLOR_ATTACHMENT0;
gl.framebufferTexture2D(
    gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level
);

const depthBuffer = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);

// make a dpeth buffer and the same size as targetTexture
gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, targetTextureWidth, targetTextureHeight);
gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

// == ==



const cubeUniforms : UniformData = {
    u_projection: projectionMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 1, 0, 1],
    u_texture: texture,
};

function drawScene(time : number) {
    time = time * 0.001 + 1.0;



    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    {
        // render to our targetTexture by binding frame buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        // render cube with our 3x2 text
        cubeUniforms.u_texture = texture;

        // tell webgl how to convert from clip space to pixels
        gl.viewport(0,0,targetTextureWidth,targetTextureHeight);

        // clear the attachments
        gl.clearColor(0,0,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const aspect = targetTextureWidth / targetTextureHeight;
        drawCube(aspect,time);
    }
    {
        // render to canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // render the cube with the texture we just rendered into
        cubeUniforms.u_texture = targetTexture;

        // normal clip space
        gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

        // clear canvas and reset buffers
        gl.clearColor(1,1,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        const aspect = gl.canvas.width / gl.canvas.height;
        drawCube(aspect,time);
    }
    requestAnimationFrame(drawScene);
}

function drawCube(aspect : number, time : number) 
{
    gl.useProgram(program);

    myWebglUtils.setBuffersAndAttribs(attributeSetter, bufferInfo.attribs);

    
    cubeUniforms.u_world = myMath.yRotation(myMath.toRad((time*10) % 360));
    cubeUniforms.u_projection = myMath.perspective(myMath.toRad(30),aspect,1,2000);
    

    myWebglUtils.setUniforms(uniformSetter, cubeUniforms);
    myWebglUtils.drawBufferInfo(gl, bufferInfo);
}

requestAnimationFrame(drawScene);


function bindFramebufferAndSetViewport(fb : WebGLFramebuffer, width : number, height : number) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, width, height);
}



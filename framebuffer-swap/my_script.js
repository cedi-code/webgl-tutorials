import { myWebglUtils } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
import { primitives } from "../utils/myPrimitives.js";
const sliderSize = document.getElementById('size-slider');
const sliderBlur = document.getElementById('blur-slider');
const canvas = document.getElementById('my_canvas');
const gl = canvas?.getContext('webgl');
if (!gl) {
    throw new Error('WebGL not supported');
}
const programPre = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragmentPre.glsl');
if (!programPre) {
    throw new Error('shader program failed');
}
const uniformSetterPre = myWebglUtils.createUniformSetters(gl, programPre);
const attributeSetterPre = myWebglUtils.createAttributeSetters(gl, programPre);
const programPost = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragmentPost.glsl');
if (!programPost) {
    throw new Error('shader program failed');
}
const uniformSetterPost = myWebglUtils.createUniformSetters(gl, programPost);
const attributeSetterPost = myWebglUtils.createAttributeSetters(gl, programPost);
// ==== set up data
const cubeData = primitives.createOctagon(20);
const planeData = {
    a_position: { dataArray: [
            -1, -1, 0, // bottom left
            1, -1, 0, // bottom right
            -1, 1, 0, // top left
            1, 1, 0 // top right
        ],
        numComponents: 3 },
    a_texCoord: { dataArray: [0, 0, 1, 0, 0, 1, 1, 1], numComponents: 2 },
    indices: [0, 1, 2, 2, 1, 3],
};
const bufferInfoCube = myWebglUtils.createBufferInfoFromArrays(gl, cubeData);
const bufferInfoPlane = myWebglUtils.createBufferInfoFromArrays(gl, planeData); // this binds indicies!
const left = 0;
const right = gl.canvas.width;
const bottom = gl.canvas.height; // gl.canvas.height is 'bottom' to invert Y-axis
const top = 0;
const near = 100;
const far = -100;
let projectionMatrix = myMath.ortographic(left, right, bottom, top, near, far);
let viewMatrix = myMath.identity(4);
// == Create a texture ==
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
// fill texture with 3x2 pixels
const level = 0;
const internalFormat = gl.LUMINANCE;
const width = 3;
const height = 2;
const border = 0;
const format = gl.LUMINANCE;
const type = gl.UNSIGNED_BYTE;
const data = new Uint8Array([
    128, 64, 128,
    0, 192, 0,
]);
const alignment = 1;
gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
// set becaue we dont hav emips and its not filterd?
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
// == Create a texture to render to==
const targetTextureWidth = gl.canvas.width / 2.0;
const targetTextureHeight = gl.canvas.height / 2.0;
const textureA = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, textureA);
{
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, targetTextureWidth, targetTextureHeight, border, format, type, data);
    // set becaue we dont hav emips and its not filterd?
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
const textureB = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, textureB);
{
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, targetTextureWidth, targetTextureHeight, border, format, type, data);
    // set becaue we dont hav emips and its not filterd?
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
// == ==
// // ==  create frame buffers and bind them ==
const fb = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
// attach the texture as first color attachment
const attachmentPoint = gl.COLOR_ATTACHMENT0;
gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, textureA, 0);
const depthBuffer = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
// make a dpeth buffer and the same size as targetTexture
gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, targetTextureWidth, targetTextureHeight);
gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
const fb2 = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb2);
// attach the texture as first color attachment
gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, textureB, 0);
const depthBuffer2 = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer2);
// make a dpeth buffer and the same size as targetTexture
gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, targetTextureWidth, targetTextureHeight);
gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer2);
// // == ==
let targetTexture = textureA;
let isTextureB = false;
let worldM = myMath.identity(4);
const circleUniforms = {
    u_projection: projectionMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 0.5, 0, 1],
};
const planeUniforms = {
    u_projection: myMath.identity(4),
    u_view: myMath.identity(4),
    u_world: myMath.identity(4),
    u_texture: targetTexture,
    u_color: [1, 0.5, 0, 1],
    u_textureSize: [targetTextureWidth, targetTextureHeight],
    u_blurSize: [1.0, 1.0],
};
sliderSize.oninput = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);
    const scale = 1.0 + (value / 10.0);
    worldM = myMath.scaling(scale, scale, scale);
    drawScene();
};
sliderBlur.oninput = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);
    planeUniforms.u_blurSize = [value, value];
    drawScene();
};
function drawScene() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    // gl.enable(gl.CULL_FACE);
    const currentDestFB = isTextureB ? fb : fb2;
    const currentSourceTexture = isTextureB ? textureB : textureA;
    // render to our targetTexture by binding frame buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, currentDestFB);
    // tell webgl how to convert from clip space to pixels
    gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);
    // clear the attachments
    //gl.clearColor(1,1,1,1);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    drawCube(programPre, attributeSetterPre, uniformSetterPre, bufferInfoCube, circleUniforms);
    // add the blurr to the texture too!
    planeUniforms.u_texture = currentSourceTexture;
    drawCube(programPost, attributeSetterPost, uniformSetterPost, bufferInfoPlane, planeUniforms);
    // render to canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // normal clip space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    planeUniforms.u_texture = targetTexture;
    // clear canvas and reset buffers
    //gl.clearColor(1,1,1,1);
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    planeUniforms.u_texture = (currentDestFB === fb) ? textureA : textureB; // displays the thing we just renderd too
    drawCube(programPost, attributeSetterPost, uniformSetterPost, bufferInfoPlane, planeUniforms);
    isTextureB = !isTextureB; // flip    
}
function drawCube(program, attribSetter, uniSetter, buffer, uniforms) {
    gl.useProgram(program);
    myWebglUtils.setBuffersAndAttribs(attribSetter, buffer.attribs);
    myWebglUtils.bindIndicies(gl, buffer);
    myWebglUtils.setUniforms(uniSetter, uniforms);
    myWebglUtils.drawBufferInfo(gl, buffer);
}
drawScene();
document.onmousemove = handleMouseMove;
let xRelativ = 0;
let yRelativ = 0;
function handleMouseMove(event) {
    xRelativ = event.clientX;
    yRelativ = event.clientY;
    circleUniforms.u_world = myMath.multiply(myMath.translation(xRelativ, yRelativ, 0.0), worldM);
    drawScene();
}
function bindFramebufferAndSetViewport(fb, width, height) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, width, height);
}

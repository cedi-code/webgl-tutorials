import { myWebglUtils } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
const sliderSpeed = document.getElementById('speed-slider');
const btnReset = document.getElementById('reset-btn');
const btnPause = document.getElementById('pause-btn');
const btnStart = document.getElementById('start-btn');
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
const programPostAction = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragmentPostAction.glsl');
if (!programPostAction) {
    throw new Error('shader program failed');
}
const uniformSetterPostAction = myWebglUtils.createUniformSetters(gl, programPostAction);
const attributeSetterPostAction = myWebglUtils.createAttributeSetters(gl, programPostAction);
const ratio = gl.canvas.width / gl.canvas.height;
const pixelSize = 20;
const pixelAmount = gl.canvas.width / pixelSize;
// ==== set up data
const squareData = {
    a_position: { dataArray: [
            0, -pixelSize, 0, // bottom left
            -pixelSize, -pixelSize, 0, // bottom right
            0, 0, 0, // top left
            -pixelSize, 0, 0, // top right
        ],
        numComponents: 3 },
    indices: [0, 1, 2, 2, 1, 3],
};
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
const bufferInfoSquare = myWebglUtils.createBufferInfoFromArrays(gl, squareData);
const bufferInfoPlane = myWebglUtils.createBufferInfoFromArrays(gl, planeData); // this binds indicies!
const left = 0;
const right = gl.canvas.width;
const bottom = gl.canvas.height; // gl.canvas.height is 'bottom' to invert Y-axis
const top = 0;
const near = 100;
const far = -100;
let projectionMatrix = myMath.ortographic(left, right, bottom, top, near, far);
let viewMatrix = myMath.identity(4);
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
// ====
let targetTexture = textureA;
let isTextureB = false;
let worldM = myMath.translation(0, 0, 0); //myMath.identity(4);
const squareUniforms = {
    u_projection: projectionMatrix,
    u_view: viewMatrix,
    u_world: worldM,
    u_color: [1, 1, 1, 1],
};
const planeUniforms = {
    u_projection: myMath.identity(4),
    u_view: myMath.identity(4),
    u_world: myMath.identity(4),
    u_texture: targetTexture,
    u_color: [1, 1, 1, 1],
    u_textureSize: [targetTextureWidth, targetTextureHeight],
    u_pixelSize: [pixelSize / 2.0, pixelSize / 2.0],
};
sliderSpeed.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    simSpeed = value;
    simSpeedT = simSpeed * 100;
};
btnReset.onclick = (event) => {
    resetCanvasAndTexture();
    runningSim = false;
    doSimStep = false;
};
btnStart.onclick = (event) => {
    runningSim = true;
    doSimStep = true;
};
btnPause.onclick = (event) => {
    runningSim = false;
    doSimStep = false;
};
resetCanvasAndTexture();
let startT = 0;
let simSpeed = 10;
let simSpeedT = simSpeed * 100;
let runningSim = true;
let doSimStep = false;
function drawScene(time) {
    if (!startT)
        startT = time;
    // Setting the difference between timestamp 
    // and the set start point as our progress
    let progress = time - startT;
    if (progress > simSpeedT && runningSim) {
        startT = time; // really bad code design, but guarantees two loops atleast for sim?
        // swap shader program
        doSimStep = true;
    }
    else {
        doSimStep = false;
    }
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
    gl.clear(gl.DEPTH_BUFFER_BIT);
    drawCube(programPre, attributeSetterPre, uniformSetterPre, bufferInfoSquare, squareUniforms); // <- draw square on texture
    // add the blurr to the texture too!
    planeUniforms.u_texture = currentSourceTexture;
    if (doSimStep) {
        drawCube(programPostAction, attributeSetterPostAction, uniformSetterPostAction, bufferInfoPlane, planeUniforms); // <- draws texture
    }
    else {
        drawCube(programPost, attributeSetterPost, uniformSetterPost, bufferInfoPlane, planeUniforms); // <- draws texture
    }
    // render to canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // normal clip space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    planeUniforms.u_texture = targetTexture;
    // clear canvas and reset buffers
    // gl.clearColor(1,0,0,1);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    planeUniforms.u_texture = (currentDestFB === fb) ? textureA : textureB; // displays the thing we just renderd too
    drawCube(programPost, attributeSetterPost, uniformSetterPost, bufferInfoPlane, planeUniforms); // <- draws texture
    isTextureB = !isTextureB; // flip 
    squareUniforms.u_world = myMath.identity(4);
    requestAnimationFrame(drawScene);
}
function drawCube(program, attribSetter, uniSetter, buffer, uniforms) {
    gl.useProgram(program);
    myWebglUtils.setBuffersAndAttribs(attribSetter, buffer.attribs);
    myWebglUtils.bindIndicies(gl, buffer);
    myWebglUtils.setUniforms(uniSetter, uniforms);
    myWebglUtils.drawBufferInfo(gl, buffer);
}
drawScene(0.0);
document.onmousedown = handleMouseClick;
let xRelativ = 0;
let yRelativ = 0;
function handleMouseClick(event) {
    xRelativ = event.clientX;
    yRelativ = event.clientY;
    if (xRelativ > gl.canvas.width || yRelativ > gl.canvas.height) {
        return;
    }
    xRelativ /= gl.canvas.width;
    yRelativ /= gl.canvas.height;
    let xPixel = Math.round(xRelativ * pixelAmount);
    let yPixel = Math.round(yRelativ * pixelAmount);
    squareUniforms.u_world = myMath.multiply(myMath.translation(xPixel * pixelSize, yPixel * pixelSize, 0.0), worldM);
}
function resetCanvasAndTexture() {
    squareUniforms.u_world = myMath.identity(4);
    console.log("reset canvas");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb2);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
function bindFramebufferAndSetViewport(fb, width, height) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, width, height);
}

import { myWebglUtils } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
import { loader } from "../utils/myDataLoader.js";
const element = document.querySelector(".element");
const canvas = document.getElementById('my_canvas');
const gl = canvas?.getContext('webgl');
if (!gl) {
    throw new Error('WebGL not supported');
}
const program = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragment.glsl');
if (!program) {
    throw new Error('shader program failed');
}
// ==== set up data
const uniformSetter = myWebglUtils.createUniformSetters(gl, program);
const attributeSetter = myWebglUtils.createAttributeSetters(gl, program);
const objStr = await loadObj("monkey.obj");
const objFile = loader.parseOBJ(objStr);
console.log(objFile);
const monkAttribArrays = {
    a_position: {
        dataArray: objFile.position,
        numComponents: 3
    },
    a_normal: {
        dataArray: objFile.normal ?? [0, 0, 0],
        numComponents: 3,
    },
    a_texCoord: {
        dataArray: objFile.texcoord ?? [0, 0],
        numComponents: 2,
    }
};
const bufferInfo = myWebglUtils.createBufferInfoFromArrays(gl, monkAttribArrays);
let projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
let viewMatrix = myMath.inverse(myMath.lookAt([0, 0.3, 10], [0, 0, 0], [0, 1, 0]));
let projViewMatrix = myMath.multiply(projectionMatrix, viewMatrix);
const monkUniforms = {
    u_projection: projectionMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 1, 0, 1],
    u_lightPos: [0, 0, 3],
    u_lightTransform: myMath.identity(4)
};
function drawScene(time) {
    resizeCanvasToDisplaySize(gl.canvas);
    time = time * 0.001 + 1.0;
    stillTime += time * 0.001;
    if (stillTime > mouseRestTime) {
        lookGoal = [-xRelativ, -yRelativ, -3];
        lookCurr = myMath.lerpV(lookPrev, lookGoal, stillTime - mouseRestTime);
        monkUniforms.u_world = myMath.lookAt([0, 0, 0], lookCurr, [0, 1, 0]);
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    // update world uniform
    myWebglUtils.setBuffersAndAttribs(attributeSetter, bufferInfo.attribs);
    myWebglUtils.setUniforms(uniformSetter, monkUniforms);
    myWebglUtils.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(drawScene);
}
const lightMoveWindow = 10;
let stillTime = 0;
const mouseRestTime = 0.0;
const lookAtTime = 1.0;
let lookPrev = [0, 0, -3];
let lookCurr = [0, 0, -3];
let lookGoal = [0, 0, -3];
let looking = false;
document.onmousemove = handleMouseMove;
let xRelativ = 0;
let yRelativ = 0;
function handleMouseMove(event) {
    let x = event.clientX / gl.canvas.width;
    let y = event.clientY / gl.canvas.height;
    xRelativ = x * lightMoveWindow - 0.5 * lightMoveWindow;
    yRelativ = -y * lightMoveWindow + 0.5 * lightMoveWindow;
    monkUniforms.u_lightTransform = myMath.translation(xRelativ, yRelativ, 0);
    stillTime = 0.0;
    lookPrev = lookCurr;
}
requestAnimationFrame(drawScene);
async function loadObj(url) {
    const response = await fetch(url);
    return response.text();
}
function resizeCanvasToDisplaySize(canv) {
    const dpr = window.devicePixelRatio;
    const { width, height } = canv.getBoundingClientRect();
    const displayWidth = Math.round(width * dpr);
    const displayHeight = Math.round(height * dpr);
    const resize = canv.width !== displayWidth || canv.height !== displayHeight;
    if (resize) {
        // resize
        canv.width = displayWidth;
        canv.height = displayHeight;
        projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
        monkUniforms.u_projection = projectionMatrix;
        monkUniforms.u;
    }
    return resize;
}

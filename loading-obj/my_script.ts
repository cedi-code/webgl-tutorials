import { AttributeArrayData, AttributeSetter, BufferInfo, myWebglUtils, UniformData, UniformSetter } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
import { loader } from "../utils/myDataLoader.js";
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
const objStr : string = await loadObj("monkey.obj");
const objFile = loader.parseOBJ(objStr);
console.log(objFile);
const monkAttribArrays : AttributeArrayData = {
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

const bufferInfo = myWebglUtils.createBufferInfoFromArrays(gl, monkAttribArrays) as BufferInfo;
let projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
let viewMatrix = myMath.inverse(myMath.lookAt([0, 0.3, 5], [0, 0, 0], [0, 1, 0]));
let projViewMatrix = myMath.multiply(projectionMatrix, viewMatrix);

const monkUniforms : UniformData = {
    u_projection: projViewMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 1, 0, 1],
    u_lightPos: [10, 10, 10],
    u_lightTransform: myMath.identity(4)
};

function drawScene(time : number) {
    time = time * 0.001 + 1.0;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    // update world uniform
    monkUniforms.u_lightTransform = myMath.zRotation(myMath.toRad(time * 50));
    myWebglUtils.setBuffersAndAttribs(attributeSetter, bufferInfo.attribs);
    myWebglUtils.setUniforms(uniformSetter, monkUniforms);
    myWebglUtils.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(drawScene);
}

requestAnimationFrame(drawScene);

async function loadObj(url : string) : Promise<string> {
    const response = await fetch(url);
    return response.text();
}
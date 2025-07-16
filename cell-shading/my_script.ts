import { AttributeArrayData, AttributeSetter, BufferInfo, myWebglUtils, UniformData, UniformSetter } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
import { loader } from "../utils/myDataLoader.js";

const threshold1slider = document.getElementById('threshold_1') as HTMLInputElement;
const threshold2slider = document.getElementById('threshold_2') as HTMLInputElement;
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

const monkeyObjTxt : string = await loadObj("monkeyShadeSmooth.obj");
const monkeyObj = loader.parseOBJ(monkeyObjTxt);

const monkeyData : AttributeArrayData = 
{
    a_position : {
        dataArray : monkeyObj.position,
        numComponents : 3,
    },
    a_normal : {
        dataArray : monkeyObj.normal ?? [0,0,0],
        numComponents : 3,
    }
};

const bufferInfo = myWebglUtils.createBufferInfoFromArrays(gl, monkeyData) as BufferInfo;
let projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
let viewMatrix = myMath.inverse(myMath.lookAt([0, 1, 7], [0, 0, 0], [0, 1, 0]));


threshold1slider.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value) / 100.0;

    monkUniforms.u_threshold1 = value;
    
}

threshold2slider.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value) / 100.0; 
    
    monkUniforms.u_threshold2 = value;
}

const monkUniforms : UniformData = {
    u_projection: projectionMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 1, 0, 1],
    u_lightPos : [10,10,10],
    u_threshold1 : 0.5,
    u_threshold2 : 0.8,
};



function drawScene(time : number) {
    time = time * 0.001 + 1.0;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    
    monkUniforms.u_world = myMath.yRotation(myMath.toRad((time*10) % 360));

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



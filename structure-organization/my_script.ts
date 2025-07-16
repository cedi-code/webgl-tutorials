export {}; // Makes this file a module

import { AttributeArrayData, AttributeArrayDataWithIndices, AttributeData, AttributeSetter, BufferInfo, myWebglUtils, UniformData, UniformSetter } from "../utils/myWebglUtils.js";
import { myMath, Vector2, Vector3, Matrix3x3Flat, Matrix4x4Flat } from "../utils/myMathUtils.js";
import { primitives } from "../utils/myPrimitives.js";

const elementSlider = document.getElementById('elements-slider') as HTMLCanvasElement;
const canvas = document.getElementById('my_canvas') as HTMLCanvasElement;
const gl = canvas?.getContext('webgl') as WebGLRenderingContext;
if(!gl) {
    throw new Error('WebGL not supported');
}

const program = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragment.glsl');
if(!program) {
    throw new Error('shader program failed');
}

// ==== set up data
const uniformSetter = myWebglUtils.createUniformSetters(gl,program) as UniformSetter;
const attributeSetter = myWebglUtils.createAttributeSetters(gl,program) as AttributeSetter;

// create arrays with obj data
const cube   = primitives.createCube(1) as AttributeArrayDataWithIndices;
const sphere = primitives.createSphere(0.7) as AttributeArrayDataWithIndices;
const cone   = primitives.createTruncatedCone(0.8,0.1,1) as AttributeArrayDataWithIndices;

console.log("cube:",cube);
console.log("sphere:", sphere);
console.log("cone:", cone);

// create the buffers
const bufferInfoCube    = myWebglUtils.createBufferInfoFromArrays(gl,cube) as BufferInfo;
const bufferInfoSphere  = myWebglUtils.createBufferInfoFromArrays(gl,sphere) as BufferInfo;
const bufferInfoCone    = myWebglUtils.createBufferInfoFromArrays(gl,cone) as BufferInfo;

const bufferTypes = [bufferInfoCube, bufferInfoSphere, bufferInfoCone];

type drawObj = {
    bufferInfo : BufferInfo,
    uniforms : UniformData,
};

const objectsToDraw : drawObj[] = []



// create random objects

let projectionMatrix : Matrix4x4Flat = myMath.perspective(myMath.toRad(30),(gl.canvas.width / gl.canvas.height),1,1000);
let viewMatrix = myMath.inverse(myMath.lookAt(
                    [0,10,15],
                    [0,0,0], 
                    [0,1,0] 
                ));

let viewProjectionMatrix = myMath.multiply(projectionMatrix, viewMatrix);


let numObj = 50;

elementSlider.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseInt(target.value);

    // add objs
    if(value > numObj) 
    {
        for(let ii = numObj; ii < value; ii++) 
        {
            addDrawObj();
        }
    }

    // remove objs
    else if(value < numObj) 
    {
        for(let ii = numObj; value < ii; ii--) 
        {
            objectsToDraw.pop();
        }
    }
    numObj = value;
}



for(let ii = 0; ii < numObj; ii++) 
{
    addDrawObj();
}

console.log("Buffer Info:", bufferInfoCube);
console.log("a_position data array:", cube.a_position);
requestAnimationFrame(draw);


function addDrawObj() 
{
    let pos = [rand(-3,3), rand(-3,3), rand(-3,3)];
    let matrix = myMath.translate(viewProjectionMatrix,pos[0],pos[1],pos[2]);

    const uniformData : UniformData = 
    {
        u_transform : matrix
    };

    const obj : drawObj = {
        bufferInfo : bufferTypes[rand(0,3) | 0],
        uniforms : uniformData
    };

    objectsToDraw.push(obj);
}

function rand(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }

function draw(time : number) 
{
    time *= 0.05;

    // ==== draw time
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // only draw faces with normal facing forward
    // gl.enable(gl.CULL_FACE);

    gl.enable(gl.DEPTH_TEST);

    // tell it to use the shaders
    gl.useProgram(program);

    // draw the 3 elements [cube, sphere, cone]

    let lastUsedBufferInfo : BufferInfo | null = null;
    objectsToDraw.forEach(obj => {

        let matrix = obj.uniforms.u_transform;
        matrix = myMath.xRotate(matrix,myMath.toRad(time));
        matrix = myMath.yRotate(matrix,myMath.toRad(time));
        matrix = myMath.zRotate(matrix,myMath.toRad(time));

        const uniformData : UniformData = 
        {
            u_transform: matrix
        }


        // small optimization if last used attributes didnt change
        if (obj.bufferInfo != lastUsedBufferInfo) {
            lastUsedBufferInfo = obj.bufferInfo;
            // binds attributes and indicies
            myWebglUtils.setBuffersAndAttribs(attributeSetter, obj.bufferInfo.attribs);
            myWebglUtils.bindIndicies(gl,obj.bufferInfo);
        }
        myWebglUtils.setUniforms(uniformSetter, uniformData);

        myWebglUtils.drawBufferInfo(gl,obj.bufferInfo);
    });

    requestAnimationFrame(draw);
}



console.log("a_position numComponents:", bufferInfoCube.attribs.a_position.numComponents); // Should be 3
console.log("Indices array:", cube.indices); // Check the raw indices
console.log("BufferInfo numElements:", bufferInfoCube.numElements); // Should be 36




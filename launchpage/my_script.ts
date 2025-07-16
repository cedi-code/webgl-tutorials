import { AttributeArrayData, AttributeData, AttributeSetter, BufferInfo, myWebglUtils, UniformData, UniformSetter } from "../utils/myWebglUtils.js";
import { Matrix4x4Flat, myMath, Vector2, Vector3, Vector4 } from "../utils/myMathUtils.js";
import { loader } from "../utils/myDataLoader.js";

const canvas = document.getElementById('my_canvas') as HTMLCanvasElement;
const gl = canvas?.getContext('webgl') as WebGLRenderingContext;
if (!gl) {
    throw new Error('WebGL not supported');
}
const program = await myWebglUtils.createProgramFromScripts(gl, 'launchpage/shaders/vertex.glsl', 'launchpage/shaders/fragment.glsl');
if (!program) {
    throw new Error('shader program failed');
}



// ==== set up data
const uniformSetter = myWebglUtils.createUniformSetters(gl, program) as UniformSetter;
const attributeSetter = myWebglUtils.createAttributeSetters(gl, program) as AttributeSetter;

// objs
const objStr : string = await loadObj("launchpage/monkeyShadeSmooth.obj");
const objFile = loader.parseOBJ(objStr);
const monkAttribArrays : AttributeArrayData = {
    a_position: { dataArray: objFile.position, numComponents: 3 },
    a_normal: { dataArray: objFile.normal ?? [0, 0, 0], numComponents: 3 },
};

const objStrCute : string = await loadObj("launchpage/monkeyShadeSmoothCuter.obj");
const objFileCute = loader.parseOBJ(objStrCute);
const monkCuteAttribArrays : AttributeArrayData = {
    a_position: { dataArray: objFileCute.position, numComponents: 3 },
    a_normal: { dataArray: objFileCute.normal ?? [0, 0, 0], numComponents: 3 },
};

const objStrGrr : string = await loadObj("launchpage/monkeyShadeSmoothAngry.obj");
const objFileGrr = loader.parseOBJ(objStrGrr);
const monkGrrAttribArrays : AttributeArrayData = {
    a_position: { dataArray: objFileGrr.position, numComponents: 3 },
    a_normal: { dataArray: objFileGrr.normal ?? [0, 0, 0], numComponents: 3 },
};

const objStrText : string = await loadObj("launchpage/webglText.obj");
const objFileText = loader.parseOBJ(objStrText);
const txtAttribArrays : AttributeArrayData = {
    a_position: { dataArray: objFileText.position, numComponents: 3 },
    a_normal: { dataArray: objFileText.normal ?? [0, 0, 0], numComponents: 3 },
};

const bufferInfoMonkNormal = myWebglUtils.createBufferInfoFromArrays(gl, monkAttribArrays) as BufferInfo;
const bufferInfoMonkCute = myWebglUtils.createBufferInfoFromArrays(gl, monkCuteAttribArrays) as BufferInfo;
const bufferInfoMonkGrr = myWebglUtils.createBufferInfoFromArrays(gl, monkGrrAttribArrays) as BufferInfo;
const bufferInfoText = myWebglUtils.createBufferInfoFromArrays(gl, txtAttribArrays) as BufferInfo;

type drawObj = {
    bufferInfo : BufferInfo,
    uniforms : UniformData,
};

const objectsToDraw : drawObj[] = [];
const bufferTypes : BufferInfo[] = [bufferInfoMonkNormal, bufferInfoMonkCute, bufferInfoMonkGrr];

let projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
let projectionMatrix_inv = myMath.inverse(projectionMatrix);
let cameraPos : Vector3 = [0,0,10];
let viewMatrix = myMath.inverse(myMath.lookAt(cameraPos, [0, 0, 0], [0, 1, 0]));

const lightDist : number = 3.0;
const monkUniforms : UniformData = {
    u_projection: projectionMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 1, 0, 1],
    u_lightPos: [0, 0, lightDist],
    u_lightTransform: myMath.identity(4),
    u_distMax : 1.3,
    u_distMin : 1.1,
    u_cellThreshold1 : 0.6,
    u_cellThreshold2 : 0.8,
};

let numberOfMonkeys : number = 200;
let circleYSquish : number = 0.6;
console.log("aspect:", (gl.canvas.width / gl.canvas.height))
let radiusRing : number = (gl.canvas.width / gl.canvas.height) * 4.5;

const tempTxtUniform = {
    u_world : myMath.translate(myMath.xRotation(myMath.toRad(-90)),0,1.0,-1.0),
    u_pos : [0,0,0],
};
objectsToDraw.push({
    bufferInfo : bufferInfoText,
    uniforms : tempTxtUniform
});

for(let ii = 0; ii < numberOfMonkeys; ++ii) {

    let angleStart = (ii / numberOfMonkeys) * 2 * Math.PI;
    let angleEnd = ((ii + 1) / numberOfMonkeys) * 2 * Math.PI;

    let alpha = angleStart + Math.random() * (angleEnd - angleStart);

    let r = Math.pow(Math.random(),0.15)*radiusRing; 
    let randVec : Vector2 = polarToCartesian(r,alpha);
    let matrixMonkey : Matrix4x4Flat = myMath.translation(randVec[0],randVec[1]*circleYSquish, -rand(0,1.5));

    let randScale = rand(0.1,0.6);
    matrixMonkey = myMath.scale(matrixMonkey,randScale,randScale,randScale);
    const tempMonkUniform = {
        u_world : matrixMonkey,
        u_pos : [-randVec[0],-randVec[1],0.0],
    };
    
    objectsToDraw.push({
        bufferInfo : bufferTypes[rand(0,3) | 0],
        uniforms : tempMonkUniform,
    });
}







console.log(objectsToDraw);


function drawScene(time : number) {
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
    time += time * 0.001;

    if(stillTime <= 1.0) {
        stillTime += 0.01;
    }

    if(stillTime > mouseRestTime) {
        
        lookGoal = [-xRelativ, -yRelativ, -lightDist];
        lookCurr = myMath.lerpV(lookPrev,lookGoal,stillTime-mouseRestTime);
        monkUniforms.u_world = myMath.lookAt([0,0,0],lookCurr, [0,1,0]);
        
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    // update world uniform
    myWebglUtils.setUniforms(uniformSetter,monkUniforms);

    objectsToDraw.forEach((monkey, index) => {
        let tempUniform : UniformData = {};
        if(index === 0) { // text obj
            tempUniform  = {
                u_world : monkey.uniforms.u_world,
            }
        }
        else {
            // global look at multiply with local world
            let relativeLookCurr = myMath.subtract(lookCurr, monkey.uniforms.u_pos);
            let relativeWorld : Matrix4x4Flat = monkey.uniforms.u_world;
            let lookAtMonkey : Matrix4x4Flat = myMath.lookAt([0,0,0],relativeLookCurr, [0,1,0]);
            lookAtMonkey = myMath.multiply(relativeWorld,lookAtMonkey);
            
            tempUniform = {
                u_world : lookAtMonkey,
            }
        }


        myWebglUtils.setBuffersAndAttribs(attributeSetter, monkey.bufferInfo.attribs);
        myWebglUtils.setUniforms(uniformSetter,tempUniform);
        myWebglUtils.drawBufferInfo(gl,monkey.bufferInfo);


    });

    requestAnimationFrame(drawScene);
}

const lightMoveWindow : number = cameraPos[2]-lightDist;
let stillTime : number = 0;
const mouseRestTime : number = 0.0;
const lookAtTime : number = 1.0;
let lookPrev : Vector3 = [0,0,-lightDist];
let lookCurr : Vector3 = [0,0,-lightDist];
let lookGoal : Vector3 = [0,0,-lightDist];
document.onmousemove = handleMouseMove;
let xRelativ = 0;
let yRelativ = 0;

function handleMouseMove(event : MouseEvent) 
{
    let x : number = (event.clientX / gl.canvas.width) * 2.0 - 1.0;
    let y : number = -((event.clientY / gl.canvas.height) * 2.0 - 1.0);

    // compute inverse
    let projViewMatrix_inv = myMath.inverse(myMath.multiply(projectionMatrix,viewMatrix));

    // create near far point and project
    let zNearDisplay : Vector4 = [x,y,-1,1];
    let zFarDisplay  : Vector4 = [x,y,1,1];

    let zNear = myMath.multiply(zNearDisplay,projViewMatrix_inv);
    let zFar  = myMath.multiply(zFarDisplay,projViewMatrix_inv);
    let zNearP : Vector3 = myMath.multiplyScalar([zNear[0], zNear[1], zNear[2]], 1.0/zNear[3]);
    let zFarP : Vector3 = myMath.multiplyScalar([zFar[0], zFar[1], zFar[2]], 1.0/zFar[3]);

    // solve for t
    const rayDir = myMath.subtract(zFarP,zNearP);
    const t = (lightDist - zNearP[2]) / rayDir[2];

    // calc intersec
    const intersecP = myMath.add(zNearP, myMath.multiplyScalar(rayDir,t));

    xRelativ = intersecP[0];
    yRelativ = intersecP[1];

    monkUniforms.u_lightTransform = myMath.translation(xRelativ,yRelativ,0);
    monkUniforms.u_distMax = 1.3 + (Math.abs(x)+Math.abs(y))*3.0;
    stillTime = 0.0;
    lookPrev = lookCurr;
}


requestAnimationFrame(drawScene);

async function loadObj(url : string) : Promise<string> {
    const response = await fetch(url);
    return response.text();
}

function resizeCanvasToDisplaySize(canv : HTMLCanvasElement) : boolean
{
    const dpr : number = window.devicePixelRatio;
    const {width, height} = canv.getBoundingClientRect();
    const displayWidth : number = Math.round(width * dpr);
    const displayHeight : number = Math.round(height * dpr);

    const resize : boolean = canv.width !== displayWidth || canv.height !== displayHeight;
    if(resize) {
        // resize
        canv.width = displayWidth;
        canv.height = displayHeight;

        projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);

        monkUniforms.u_projection = projectionMatrix;
    }
    return resize;
}

function rand(min : number, max : number) {
    return Math.random() * (max - min) + min;
}

function polarToCartesian(r : number, angleRad : number) : Vector2 {
    return [
        r * Math.cos(angleRad),
        r * Math.sin(angleRad)
    ];
}

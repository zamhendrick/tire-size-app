const tireCalculatorBtn = document.querySelector('#tire_calculator_btn')

const tireWidthInput = document.querySelectorAll('.tire-width-input')
const sidewallPercentageInput = document.querySelectorAll('.sidewall-percentage-input')
const rimDiameterInput = document.querySelectorAll('.rim-diameter-input')

let tireWidthOutput = []
let sidewallHeightOutput = []
let wheelDiameterOutput = []
let wheelCircumferenceOutput = []
let revsPerKmOutput = []
let resultOutput = {
    
}
let differenceOutput = []

tireCalculatorBtn.onclick = (e) => {
    e.preventDefault()

    for (let i = 0; i < 2; i++) {
        tireWidthOutput[i] = tireWidthInput[i].value / 25.4
        sidewallHeightOutput[i] = tireWidthOutput[i] * (sidewallPercentageInput[i].value / 100)
        wheelDiameterOutput[i] = (2 * sidewallHeightOutput[i]) + parseFloat(rimDiameterInput[i].value)
        wheelCircumferenceOutput[i] = 2 * Math.PI * (wheelDiameterOutput[i] / 2)
        revsPerKmOutput[i] = 39370.1 / wheelCircumferenceOutput[i]

        tireWidthOutput[i] = tireWidthOutput[i].toFixed(2)
        sidewallHeightOutput[i] = sidewallHeightOutput[i].toFixed(2)
        wheelDiameterOutput[i] = wheelDiameterOutput[i].toFixed(2)
        wheelCircumferenceOutput[i] = wheelCircumferenceOutput[i].toFixed(2)
        revsPerKmOutput[i] = revsPerKmOutput[i].toFixed(2)
    }

    let j = 0
    differenceOutput[j++] = Math.abs(wheelDiameterOutput[0] - wheelDiameterOutput[1])
    differenceOutput[j++] = Math.abs(tireWidthOutput[0] - tireWidthOutput[1])
    differenceOutput[j++] = Math.abs(sidewallHeightOutput[0] - sidewallHeightOutput[1])
    differenceOutput[j++] = Math.abs(wheelCircumferenceOutput[0] - wheelCircumferenceOutput[1])
    differenceOutput[j++] = Math.abs(revsPerKmOutput[0] - revsPerKmOutput[1])

    for (let i = 0; i < differenceOutput.length; i++) {
        differenceOutput[i] = differenceOutput[i].toFixed(2)
    }

    updateTireResult()
    computeTireGraph()
    
}

const tireResult = document.querySelector('#tire_result')
function updateTireResult() {
    tireResult.innerHTML = `
    <div class="w-full mobile:py-2 p-1 br-0.5 mx-auto bs-1 bg-white">
        <div>
            <div class="flex justify-center py-0.25 text-center text-bold">
                <span class="block w-5"></span>
                <span class="block w-3.5">Tire 1</span>
                <span class="block w-4"></span>
                <span class="block w-3.5">Tire 2</span>
            </div>
            <div class="flex justify-center py-0.25">
                <span class="block w-5 text-bold">Diameter</span>
                <span class="block w-3.5 text-center">${ wheelDiameterOutput[0] }"</span>
                <span class="block w-4 text-center" style="font-size:0.75rem;">
                    <span class="flex h-full align-center justify-center">${ differenceOutput[0] }"</span>
                </span>
                <span class="block w-3.5 text-center">${ wheelDiameterOutput[1] }"</span>
            </div>
            <div class="flex justify-center py-0.25">
                <span class="block w-5 text-bold">Width</span>
                <span class="block w-3.5 text-center">${ tireWidthOutput[0] }"</span>
                <span class="block w-4 text-center" style="font-size:0.75rem;">
                    <span class="flex h-full align-center justify-center">${ differenceOutput[1] }"</span>
                </span>
                <span class="block w-3.5 text-center">${ tireWidthOutput[1] }"</span>
            </div>
            <div class="flex justify-center py-0.25">
                <span class="block w-5 text-bold">Sidewall</span>
                <span class="block w-3.5 text-center">${ sidewallHeightOutput[0] }"</span>
                <span class="block w-4 text-center" style="font-size:0.75rem;">
                    <span class="flex h-full align-center justify-center">${ differenceOutput[2] }"</span>
                </span>
                <span class="block w-3.5 text-center">${ sidewallHeightOutput[1] }"</span>
            </div>
            <div class="flex justify-center py-0.25">
                <span class="block w-5 text-bold">Circum.</span>
                <span class="block w-3.5 text-center">${ wheelCircumferenceOutput[0] }"</span>
                <span class="block w-4 text-center" style="font-size:0.75rem;">
                    <span class="flex h-full align-center justify-center">${ differenceOutput[3] }"</span>
                </span>
                <span class="block w-3.5 text-center">${ wheelCircumferenceOutput[1] }"</span>
            </div>
            <div class="flex justify-center py-0.25">
                <span class="block w-5 text-bold">Revs/Km</span>
                <span class="block w-3.5 text-center">${ revsPerKmOutput[0] }</span>
                <span class="block w-4 text-center" style="font-size:0.75rem;">
                    <span class="flex h-full align-center justify-center">${ differenceOutput[4] }</span>
                </span>
                <span class="block w-3.5 text-center">${ revsPerKmOutput[1] }</span>
            </div>
        </div>
    </div>
    `
}

const tireGraphSide = document.querySelector('#tire_graph_side')
const tireGraphFront = document.querySelector('#tire_graph_front')
const sizeMultiplier = 150

let renderedDiameter = []
let renderedRimDiameter = []
let renderedSidewallHeight = []
let renderedTireWidth = []
let greaterIndex = 0

function computeTireGraph() {
    if (wheelDiameterOutput[0] > wheelDiameterOutput[1]) {
        greaterIndex = 0
    } else {
        greaterIndex = 1
    }

    

    for(let i = 0; i < 2; i++) {
        renderedDiameter[i] = (wheelDiameterOutput[i] / wheelDiameterOutput[greaterIndex]) * sizeMultiplier
        renderedRimDiameter[i] = (parseFloat(rimDiameterInput[i].value) / wheelDiameterOutput[greaterIndex]) * sizeMultiplier
        renderedSidewallHeight[i] = (sidewallHeightOutput[i] / wheelDiameterOutput[greaterIndex]) * sizeMultiplier
        renderedTireWidth[i] = (tireWidthOutput[i] / wheelDiameterOutput[greaterIndex]) * sizeMultiplier

        updateTireGraphSide(i)
        updateTireGraphFront(i)
    }
    // console.log()
}

function updateTireGraphSide(i) {
    tireGraphSide.classList.remove('hidden')

    const tireGraphSideClass = tireGraphSide.querySelectorAll('.tire-graph-side')
   
    tireGraphSideClass[i].style.width = renderedDiameter[i] + 'px'
    tireGraphSideClass[i].style.height = renderedDiameter[i] + 'px'

    tireGraphSideClass[i].children[1].style.width = ((renderedDiameter[i] / 2) + 6) + 'px'
    tireGraphSideClass[i].children[1].style.height = renderedSidewallHeight[i] + 'px'
    
    tireGraphSideClass[i].children[1].children[0].innerHTML = sidewallHeightOutput[i] + '\"'

    tireGraphSideClass[i].children[2].children[0].style.width = renderedRimDiameter[i] + 'px'
    tireGraphSideClass[i].children[2].children[0].style.height = renderedRimDiameter[i] + 'px'

    tireGraphSideClass[i].children[2].children[0].children[0].style.height = ((renderedDiameter[i] / 2) + 10) + 'px'
    tireGraphSideClass[i].children[2].children[0].children[0].style.top = -(((renderedDiameter[i] - renderedRimDiameter[i]) / 2) + 10) + 'px'

    tireGraphSideClass[i].children[2].children[0].children[0].children[0].innerHTML = rimDiameterInput[i].value + '\"'
}

function updateTireGraphFront(i) {
    tireGraphFront.classList.remove('hidden')

    const tireGraphFrontClass = tireGraphFront.querySelectorAll('.tire-graph-front')

    tireGraphFrontClass[i].style.width = renderedTireWidth[i] + 'px'
    tireGraphFrontClass[i].style.height = renderedDiameter[i] + 'px'

    tireGraphFrontClass[i].children[0].style.left = (renderedTireWidth[i] + 2) + 'px'
    tireGraphFrontClass[i].children[0].children[0].innerHTML = wheelDiameterOutput[i] + '\"'

    tireGraphFrontClass[i].children[2].style.top = (renderedDiameter[i] + 2) + 'px'
    tireGraphFrontClass[i].children[2].children[0].innerHTML = tireWidthOutput[i] + '\"'
}

tireGraphSide.innerHTML = `
<div class="flex w-full h-full p-1 py-2 br-0.5 mx-auto bs-1 bg-white align-center justify-center">
    <div class="grid grid-col-2 w-full h-full" style="gap:0 0.5rem; padding-right:0.5rem;">
        <div class="flex w-full">
            <div class="tire-graph-side mx-auto mt-auto" style="position:relative; font-size:12px;">
                <img src="img/tire.svg" class="w-full h-full"/>
                <div class="flex text-center" style="position:absolute; right:-4px; bottom:0; border:1px solid #d0d0d0; border-left:none;">
                    <div class="tire-graph-side-label-text w-content mx-auto my-auto bg-white" style="margin-right:-18px;"></div>
                </div>
                <div class="flex w-full h-full" style="position:absolute; bottom:0;">
                    <div class="mx-auto my-auto" style="position:relative;">
                        <div class="w-full text-center" style="position:absolute; border:1px solid #d0d0d0; border-bottom:none;">
                            <div class="w-content mx-auto bg-white" style="padding:0 4px; margin-top:-8px;"></div>
                        </div>
                        <img src="img/rim.svg" class="w-full h-full"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex w-full">
            <div class="tire-graph-side mx-auto mt-auto" style="position:relative; font-size:12px;">
                <img src="img/tire.svg" class="w-full h-full"/>
                <div class="flex text-center" style="position:absolute; right:-4px; bottom:0; border:1px solid #d0d0d0; border-left:none;">
                    <div class="w-content mx-auto my-auto bg-white" style="margin-right:-18px;"></div>
                </div>
                <div class="flex w-full h-full" style="position:absolute; bottom:0;">
                    <div class="mx-auto my-auto" style="position:relative;">
                        <div class="w-full text-center" style="position:absolute; border:1px solid #d0d0d0; border-bottom:none;">
                            <div class="w-content mx-auto bg-white" style="padding:0 4px; margin-top:-8px;"></div>
                        </div>
                        <img src="img/rim.svg" class="w-full h-full"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`

tireGraphFront.innerHTML = `
<div class="flex w-full h-full p-1 py-2 br-0.5 mx-auto bs-1 bg-white align-center justify-center">
    <div class="grid grid-col-2 w-full h-full" style="gap:0 0.5rem; padding-right:0.5rem;">
        <div class="flex w-full">
            <div class="tire-graph-front mx-auto mt-auto" style="position:relative; font-size:11px;">
                <div class="flex h-full text-center" style="position:absolute; border:1px solid #d0d0d0; border-left:none;">
                    <div class="w-content my-auto mx-auto bg-white" style="padding:0 4px; margin-right:-22px;"></div>
                </div>
                <div class="w-full h-full" style="border-radius:4px; background-color:#202020;"></div>
                <div class="w-full text-center" style="height:12px; position:absolute; border:1px solid #d0d0d0; border-top:none;">
                    <div class="w-content mx-auto bg-white" style="padding:0 2px; margin-top:4px;"></div>
                </div>
            </div>
        </div>

        <div class="flex w-full">
            <div class="tire-graph-front mx-auto mt-auto" style="position:relative; font-size:11px;">
                <div class="flex h-full text-center" style="position:absolute; border:1px solid #d0d0d0; border-left:none;">
                    <div class="w-content my-auto mx-auto bg-white" style="padding:0 4px; margin-right:-22px;"></div>
                </div>
                <div class="w-full h-full" style="border-radius:4px; background-color:#202020;"></div>
                <div class="w-full text-center" style="height:12px; position:absolute; border:1px solid #d0d0d0; border-top:none;">
                    <div class="w-content mx-auto bg-white" style="padding:0 2px; margin-top:4px;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
`
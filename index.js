
let paramcount = 0;
let get = document.getElementById("get")
let post = document.getElementById("post")

let json1 = document.getElementById("json")
let costom = document.getElementById("costom")

let jsontextBox = document.getElementById("jsontextBox");
let parametersBox = document.getElementById("parametersBox");

jsontextBox.style.display = "none";
parametersBox.style.display = "none";

function createchlidfromstring(str){
    let div=document.createElement("div");
    div.innerHTML=str
    return div.firstElementChild;
}
get.addEventListener("click", () => {
    jsontextBox.style.display = "none";
    parametersBox.style.display = "none";
})

post.addEventListener("click", () => {
    if (json.checked) {
        jsontextBox.style.display = "block";
        parametersBox.style.display = "none";
    }
    if (costom.checked) {
        jsontextBox.style.display = "none";
        parametersBox.style.display = "block";
    }
})

json1.addEventListener("click", () => {
    if (post.checked) {
        jsontextBox.style.display = "block";
        parametersBox.style.display = "none";
    }
})

costom.addEventListener("click", () => {
    if (post.checked) {
        jsontextBox.style.display = "none";
        parametersBox.style.display = "block";
    }
})


let addparan = document.getElementById("addParam");
let params = document.getElementById("params");

addparan.addEventListener("click", () => {

    let str = `<div class="row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${paramcount + 2}</label>
                    <div class="col col-sm-4">
                        <input type="text" class="form-control" id="paramkey-${paramcount + 2}" placeholder="parameter ${paramcount + 2} key" aria-label="First name">
                    </div>
                    <div class="col col-sm-4">
                        <input type="text" class="form-control" id="paramvalue-${paramcount + 2}" placeholder="parameter ${paramcount + 2} value " aria-label="Last name">
                    </div>
                    <button class="btn btn-primary col col-sm-1 deleteParam">-</button>
                </div>`

    params.appendChild(createchlidfromstring(str));
    paramcount += 1

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
})

let submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    let requsttype = document.querySelector(`input[name="requesttype"]:checked`).value;

    let url = document.getElementById("link").value;

    if (requsttype == "GET") {
        fetch(url.toString(), {
            method: 'GET',
        }).then(Response => Response.text()).then(text => {
            // console.log(JSON.parse(text));
            document.getElementById("resulttext").innerText = text

        })
    }

    if (requsttype == "POST") {
        let contanttype = document.querySelector(`input[name="contanttype"]:checked`).value;
        let data;

        if (contanttype === "json") {
            let jsontext = document.getElementById("jsontext");
            data = jsontext.value;
            console.log(data);
        }
        else {
            data={};
            for (let i = 0; i < paramcount+1; i++) {
                if(document.getElementById(`paramkey-${i+1}`)!=undefined){
                    let paramkey=document.getElementById(`paramkey-${i+1}`).value;
                    let paramvalue=document.getElementById(`paramvalue-${i+1}`).value;
                    data[paramkey]=paramvalue;
                }
            }
            data=JSON.stringify(data);
        }
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(Response => Response.text()).then(text => {
            document.getElementById("resulttext").innerText = text
        })
    }
})
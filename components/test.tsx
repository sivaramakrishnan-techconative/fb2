// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';



export default function Test() {
    const [firstTime, setfirstTime] = useState(true)
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    if (typeof window !== "undefined") {
        window.$ = window.jQuery = require("jquery")
        require("jquery-ui-sortable");
        window.formBuilder = require("formBuilder");
        window.formRender = require('formBuilder/dist/form-render.min.js')
    }

    useEffect(() => {
        const fbOptions = {
            persistDefaultFields: true,
            disabledSubtypes: {
                text: ['password'],
            },
            onSave: function (evt, formData) {
                toggleEdit(formData)
            },
            stickyControls: {
                enable: true,
            },
            sortableControls: true,
            disabledFieldButtons: {
                text: ['copy'],
            },
            controlPosition: 'right', // left|right, 
            scrollToFieldOnAdd: false,
        }
        if (firstTime) {
            $(($: any) => { $(".build-wrap").formBuilder(fbOptions) });
            setfirstTime(false)
        }
        return () => {
            $(".build-wrap").formBuilder("destroy");
        }
    }, [firstTime])

    function toggleEdit(formData) {
        setOpen(true)
        setTimeout(() => {
            $('.drop').formRender({
                formData: formData,
                dataType: "json",
            })
        }, 100);
    }
    function getHTMLorAjax(from: string) {
        const formData: [] = $('.build-wrap').formBuilder('getData')
        let HTML: string = "", script: string = "", doc: string = "", data: string = "", code: string = "";
        formData.map((element: any) => {
            switch (element.type) {
                case "autocomplete": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} = document.getElementById("${id}").value;`;
                    data += `formData.append("${id}", ${id});`
                    HTML += `<div>
                        <label for="Autocomplete" class="form-label">${element.label}${element?.required ? '*' : ""}</label>
                        <input 
                        name="${id}"
                        list="datalistOptions"
                        id="${id}"     
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        />
                        <datalist id="datalistOptions">
                            ${element.values.map((data) => { return `<option value="${data.value}">${data.label}</option>` })}
                        </datalist>
                    </div>`
                    break;
                }
                case "checkbox-group": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} ="" 
                    var ele = document.querySelectorAll(".form-checkbox-input");
                    for (i = 0; i < ele.length; i++) {
                        if (ele[i].checked){
                            ${id} += ele[i].value +","; 
                            if (ele[i].value === "on" && i === ele.length - 1) { 
                                ${id} = ${id}.replace(/on,/g, "")
                                ${id} += document.getElementById("${id}_other").value;
                            }
                        }                            
                    } `;
                    data += `formData.append("${id}", ${id});`
                    HTML += `<label data-toggle="tooltip" title="${element?.description ? element.description : ""}" class="form-label">${element.label}${element?.required ? '*' : ""}</label>                     
                    ${element.values.map((data, index: number) => {
                        return `
                        <div class="form-check ${element.toggle ? "form-switch" : ""} ">
                            <input name="${id}_${index}" class="form-check-input form-checkbox-input" type="checkbox" value="${data.value}" id="${id}_${index}"  ${data.selected && 'checked'}>
                            <label class="form-check-label" for="flexCheckChecked">
                                ${data.label}
                            </label>
                        </div>`})}`
                    HTML += element?.other ? `<div data-toggle="tooltip" title="${element?.description ? element.description : ""}" class="form-check">
                        <input class="form-checkbox-input" type="checkbox" name="${id}" id="${id}">
                            <label class="form-check-label">
                                 Other
                                <input type="text" id="${id}_other" >
                            </label>
                        </div>` : ""
                    break;
                }
                case "date": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} = document.getElementById("${id}").value;`;
                    data += `formData.append("${id}", ${id});`
                    HTML += `<div>
                        <label data-toggle="tooltip" title="${element?.description ? element.description : ""}" for="Date" class="form-label">${element.label}${element?.required ? '*' : ""}</label>
                        <input 
                        type="date"
                        class="form-control"
                        name="${id}"
                        id="${id}"  
                        ${element?.value ? `value =${element?.value}` : ""}    
                        title="${element?.description ? element.description : ""}" 
                        />
                    </div>`
                    break;
                }
                case "file": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} = document.getElementById("${id}");
                     for (let index = 0; index <  ${id}.files.length; index++)  
                       ${`formData.append("${id}"+index, ${id}.files[index]);`}`
                    HTML += `<div data-toggle="tooltip" title="${element?.description ? element.description : ""}" class="mb-3">
                    <label for="formFile" class="form-label">${element.label}${element?.required ? '*' : ""}</label>
                    <input id="${id}" name="${id}" ${element?.multiple ? 'multiple="multiple"' : ""} class="form-control"
                    ${element.required && 'required'} type="file" id="formFile">
                  </div>`
                    break;
                }
                case "number": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} = document.getElementById("${id}").value;`;
                    data += `formData.append("${id}", ${id});`
                    HTML += `
                    <div class="form-outline">
                        <label class="form-label" for="typeNumber">${element.label}${element?.required ? '*' : ""}</label>
                        <input type="number" class="form-control" name="${id}" 
                        value=${element?.value && element.value}
                        min=${element?.min && element.min} 
                        max=${element?.max && element.max}
                        step=${element?.step && element.step}  
                        id="${id}"  
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""}>
                    </div>`
                    break;
                }
                case "header":
                case "paragraph": {
                    HTML += `<${element.subtype}>${element.label}</${element.subtype}>`
                    break;
                }
                case "hidden": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    HTML += `<input type="hidden" name="${id}" value="${element.value}" id="${id}">`
                    break;
                }
                case "radio-group": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} =""
                    var ele = document.getElementsByName("${id}")
                    for (i = 0; i < ele.length; i++) {
                        if (ele[i].checked)
                        {
                            ${id} = ele[i].value;
                            if (ele[i].value === "on" && i === ele.length - 1) { 
                                ${id} = document.getElementById("${id}_other").value;
                            }
                        }
                    } `;
                    data += `formData.append("${id}", ${id});`
                    HTML += `<div>
                        <label data-toggle="tooltip" title="${element?.description ? element.description : ""}" class="form-label">${element.label}${element?.required ? '*' : ""}</label>
                        ${element.values.map((data) => {
                        return `<div class="form-check">
                            <input class="form-check-input" type="radio" name="${id}" value="${data.value}"
                                id="${id}"  ${data.selected && 'checked'}>
                            <label class="form-check-label" >
                                ${data.label}
                            </label>
                            </div>`})}
                        </div> `
                    HTML += element?.other ? `<div class="form-check">
                        <input class="form-check-input" type="radio" name="${id}" id="${id}">
                            <label class="form-check-label">
                                 Other
                                <input type="text" id="${id}_other" >
                            </label>
                        </div>` : ""
                    break;
                }
                case "select": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} = document.getElementById("${id}").value; `;
                    data += `formData.append("${id}", ${id});`
                    HTML += `<div>
                        <label data-toggle="tooltip" title="${element?.description ? element.description : ""}" class="form-label">${element.label}${element?.required ? '*' : ""}</label>
                        <select
                        id="${id}"
                        name="${id}"
                        class="form-select"  
                        placeholder="${element?.placeholder ? element.placeholder : ""}" 
                        ${element.required ? 'required' : ""}>
                        ${element.values.map((data) => {
                        return `<option value="${data.value}">${data.label}</option>`
                    })
                        }
                        </select>
                    </div> `
                    break;
                }
                case "text":
                case "textarea": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    code += `var ${id} = document.getElementById("${id}").value; `;
                    data += `formData.append("${id}", ${id});`
                    HTML += `<div>
                        <label class="form-label">${element.label}${element?.required ? '*' : ""}</label>
                        <input 
                        name="${id}"
                        type=${element.type}
                        class="form-control"
                        id="${id}"    
                        value="${element?.value ? element.value : ""}"
                        placeholder = "${element?.placeholder ? element.placeholder : ""}"
                        title = "${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""} 
                        ${element?.maxlength ? `maxLength=${element?.maxlength}` : ""}
                    />
                    </div>`
                    break;
                }
                case "button": {
                    let id: string = element.name;
                    id = id.replace(/-/g, "_")
                    HTML += `<div> 
                        <button type="${element.subtype}" class="btn btn-primary" id="${id}" 
                        >${element?.label}</button>
                    </div> `
                    break;
                }
            }
        })
        HTML = HTML.replace(/,/g, '')
        script = `var form = document.getElementById("my-form");
                    async function handleSubmit(event) { 
                        event.preventDefault(); 
                        var formData = new FormData()
                        var status = document.getElementById("my-form-status");
                        ${code}
                        ${data}
                        fetch(event.target.action, {
                            method: form.method,
                            body: formData, 
                        })
                        .then((response) => {
                            if (response.ok) {
                                status.innerHTML = "Thanks for your submission!";
                                form.reset();
                            } else {
                                status.innerHTML = "Oops! Something went wrong";
                            }
                        })
                        .catch((error) => {
                            status.innerHTML = "Oops! Something went wrong";
                        });
                    }
                form.addEventListener("submit", handleSubmit);`
        doc = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>FormHouse Form</title>
                            <link
                                rel="stylesheet"
                                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" />
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
                        </head>
                        <body> 
                        <div class="d-flex justify-content-center align-items-center mt-2">
                            <div class="row w-50">
                                <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-body">
                                    <h5 class="card-title">FormHouse Forms</h5>
                                    <p id="my-form-status"></p>
                                    <form id="my-form" action="https://data.formhouse.pro/36rKEtcDFRtv0ZhwnONnFK" method="post" ${from === "HTML" ? " enctype='multipart/form-data'" : ""}>
                                            ${HTML}
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>                      
                           ${from === "HTML" ? "" : `<script>
                                    ${script}
                                </script>`}
                        </body>
                    </html>`
        console.log(doc)
    }
    function getReact() {
        const formData: [] = $('.build-wrap').formBuilder('getData')
        let HTML: string = "";
        formData.map((element: any) => {
            let field_name = element.name.replace(/-/ig, '_')
            switch (element.type) {
                case "autocomplete": {
                    HTML += `<div>
                        <label className="form-label" htmlFor="${field_name}">${element.label}</label>
                        <input 
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        name="${field_name}"
                        list="datalistOptions"
                        className="form-control mb-3"
                        id="${field_name}"    
                        ${(element?.placeholder) ? `placeholder="${element?.placeholder}"` : ``}  
                        ${(element?.description) ? `title="${element?.description}"` : ``}  
                        ${element.required ? 'required' : ""} 
                        />
                        <datalist id="datalistOptions">
                            ${element.values.map((data) => { return `<option value="${data.value}">${data.label}</option>` })}
                        </datalist>
                    </div>`
                    break;
                }
                case "checkbox-group": {
                    let innerHTML = '';
                    element.values.map((data, i) => {
                        innerHTML += `
                        <label className="form-check-label " style={{marginRight:"30px"}} htmlFor="${field_name + '-' + i}">
                        <input name="${field_name}" className="form-check-input " 
                        onChange={onChangeHandler}
                        type="checkbox" value="${data.value}" id="${field_name + '-' + i}"/> 
                            ${data.label}
                        </label>`})
                    HTML += `<div>
                    <label className="form-label">${element.label}</label>
                    <div className="input-group mb-3">
                    <div className="form-check">
                    ${innerHTML}        
                    </div>              
                  </div>
                  </div>`
                    break;
                }
                case "date": {
                    HTML += `<div>
                        <label  className="form-label" htmlFor="${field_name}">${element.label}</label>
                        <input 
                        type="date"
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        name="${field_name}"
                        id="${field_name}"  
                        ${(element?.value) ? `value="${element?.value}"` : ``} 
                        ${(element?.placeholder) ? `placeholder="${element?.placeholder}"` : ``} 
                        ${(element?.description) ? `title="${element?.description}"` : ``} 
                        ${element.required ? 'required' : ""} 
                        />
                    </div>`
                    break;
                }
                case "file": {
                    HTML += `<div className="mb-3">
                    <label for="formFile" className="form-label" htmlFor="formFile">${element.label}</label>
                    <input name="${field_name}" ${element.mutiple && 'multiple="multiple"'}
                    onChange={(e)=>setData({ ...data, [e.target.name]: e.target.files })}
                    className="form-control"
                    ${element.required ? 'required' : ''} type="file" id="formFile" />
                  </div>`
                    break;
                }
                case "number": {
                    HTML += `
                    <div className="form-outline">
                        <label className="form-label"  htmlFor="${field_name}">${element.label}</label>
                        <input type="number" className="form-control mb-3" name="${field_name}" 
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        ${(element?.value) ? `value="${element?.value}"` : ``}
                        ${(element?.min) ? `min="${element?.min}"` : ``}
                        ${(element?.max) ? `max="${element?.max}"` : ``}
                        ${(element?.step) ? `step="${element?.step}"` : ``}
                        ${(element?.placeholder) ? `placeholder="${element?.placeholder}"` : ``}
                        ${(element?.description) ? `title="${element?.description}"` : ``}
                        id="${field_name}"  
                        ${element.required ? 'required' : ""} />
                    </div>`
                    break;
                }
                case "header":
                case "paragraph": {
                    HTML += `<${element.subtype}>${element.label}</${element.subtype}>`
                    break;
                }
                case "hidden": {
                    HTML += `<input type="hidden" name="${field_name}" value="${element.value}" id="${field_name}" />`
                    break;
                }
                case "radio-group": {
                    let innerHTML = ''
                    element.values.map((data, i) => {
                        innerHTML += `<div className="form-check "> 
                    <input className="form-check-input" type="radio" name="${field_name}" value="${data.value}"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        id="${field_name + '-' + i}" 
                              ${data.selected ? 'checked' : ''}
                              />
                              <label className="form-check-label" htmlFor="${field_name + '-' + i}" >    
                            ${data.label}
                        </label>
                        </div>`})
                    HTML += `<div className="mb-3">
                        <label className="form-label" htmlFor="${field_name}">${element.label}</label>
                        ${innerHTML}
                        </div>`
                    if (element?.other) {
                        HTML += `<div className="form-check" >
                                <input className="form-check-input" type="radio" name="${field_name}"
                                onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                                    id="${field_name}" ${data.selected ? 'checked' : ''}/>
                                <label className="form-check-label" >
                                    ${element.label}
                                    <input type="text" id="${element.label}-other" />
                                </label>
                                </div>`
                    }
                    break;
                }
                case "select": {
                    HTML += `<div>
                        <label className="form-label" htmlFor="${field_name}">${element.label}</label>
                        <select
                        name="${field_name}"
                        id="${field_name}" 
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        ${(element?.placeholder) ? `placeholder="${element?.placeholder}"` : ``}
                        ${(element?.description) ? `title="${element?.description}"` : ``}
                        ${element.required ? 'required' : ""}>
                        ${element.values.map((data) => {
                        return `<option value="${data.value}">${data.label}</option>`
                    })}
                        </select>
                    </div>`
                    break;
                }
                case "text": {
                    HTML += `<div>
                        <label className="form-label" htmlFor="${field_name}">${element.label}</label>
                        <input 
                        name="${field_name}"
                        type="${element.type}"
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        id="${field_name}" 
                        ${(element?.value) ? `value="${element?.value}"` : ``}
                        ${(element?.placeholder) ? `placeholder="${element?.placeholder}"` : ``}
                        ${(element?.description) ? `title="${element?.description}"` : ``}
                        ${element.required ? 'required' : ""} 
                        ${element?.maxlength ? `maxLength="${element?.maxlength}"` : ""}
                        />
                    </div>`
                    break;
                }
                case "textarea": {
                    HTML += `<div>
                        <label className="form-label" htmlFor="${field_name}">${element.label}</label>
                        <textarea 
                        name="${field_name}"
                        type="${element.type}"
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        id="${field_name}" 
                        rows="${(element.rows) ? element.rows : 3}" 
                        ${(element?.value) ? `value="${element?.value}"` : ``}
                        ${(element?.placeholder) ? `placeholder="${element?.placeholder}"` : ``}
                        ${(element?.description) ? `title="${element?.description}"` : ``}
                        ${element.required ? 'required' : ""} 
                        ${element?.maxlength ? `maxLength="${element?.maxlength}"` : ""}
                        ></textarea>
                    </div>`
                    break;
                }
                case "button": {
                    HTML += `<div>
                        <button type="${element.subtype}" className="btn btn-primary mb-3" 
                        onClick={onSubmit}
                        id="${field_name}" 
                        >${element?.value || element?.label}</button>
                    </div>`
                    break;
                }
            }
        })
        const renderedForm = `
            import {useState,useEffect} from 'react';
            import 'bootstrap/dist/css/bootstrap.min.css';
            import {Container,Row,Col,Card} from 'react-bootstrap'
            const FHForm = () =>{
                const [data,setData] = useState({});
                const [checkbox,setCheckbox] = useState([])
                const [name,setName] = useState("")
                const [msg, setMsg] = useState("")
                useEffect(()=>{
                    if(name && checkbox.length > 0){
                      setData({ ...data, [name]: checkbox })
                    }
                  },[checkbox,name])

                const onSubmit = (e) => {
                    console.log(data);
                    const formData = new FormData;
                    for (const [key, value] of Object.entries(data)) {
                        formData.append(key, value);
                    }
                    fetch("https://data.formhouse.pro/36rKEtcDFRtv0ZhwnONnFK", {
                        method: "post",
                        body: formData, 
                    })
                    .then((response) => {
                        if (response.ok) {
                             setMsg("Thank you for your submission")
                        } else {
                            setMsg("Oops! Something went wrong")
                        }
                    })
                    .catch((error) => {
                        setMsg("Oops! Something went wrong")
                    });
                }
                
                const onChangeHandler = (e) => {
                    if(e.target.checked){
                      setCheckbox([...checkbox,e.target.value])
                    }else{
                      setCheckbox(checkbox.filter(elem=>elem != e.target.value))
                    }
                    setName(e.target.name)
                } 
                 
               return (
                <>
                    <p>{msg ? msg : ""}</p>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={5}>
                                <Card className="my-4 p-4">
                                    ${HTML}
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
               )
            }
            export default FHForm;
        `
        console.log(renderedForm)
    }
    return (
        <>
            <div className='build-wrap' ></div>
            <form className="render-wrap"></form>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
            >
                <DialogContent sx={{ pt: 10 }}>
                    <div className='drop'></div>
                </DialogContent>
                <DialogActions>
                    <Button color='warning' variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => getHTMLorAjax("HTML")} color='primary' variant="contained">
                        Get HTML
                    </Button>
                    <Button onClick={() => getHTMLorAjax("AJAX")} color='primary' variant="contained">
                        Get Ajax
                    </Button>
                    <Button onClick={() => getReact()} color='primary' variant="contained">
                        Get React
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
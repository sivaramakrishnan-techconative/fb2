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
    function renderEdit() {
        const formData: [] = $('.build-wrap').formBuilder('getData')
        let HTML: string = "", doc: string = ""
        console.log(document.querySelector(".drop").innerHTML)
        formData.map((element: any) => {
            // console.log(element)
            switch (element.type) {
                case "autocomplete": {
                    HTML += `<div>
                        <label for="Autocomplete" class="form-label">${element.name}</label>
                        <input 
                        name="${element.name}"
                        list="datalistOptions"
                        id="${element.name}"     
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""} 
                        />
                        <datalist id="datalistOptions">
                            ${element.values.map((data) => { return `<option value="${data.value}">${data.label}</option>` })}
                        </datalist>
                    </div>`
                    break;
                }
                case "checkbox-group": {
                    HTML += `<div>
                    <label class="form-label">${element.name}</label>
                    <div class="input-group mb-3">
                    <div class="form-check">
                    ${element.values.map((data) => {
                        return `
                        <input name="${element.name}" class="form-check-input" type="checkbox" value="${data.value}" id="${data.label}"  ${data.selected && 'checked'}>
                        <label class="form-check-label" >
                            ${data.label}
                        </label>`})}        
                    </div>              
                  </div>
                  </div>`
                    break;
                }
                case "date": {
                    HTML += `<div>
                        <label for="Date" class="form-label">${element.name}</label>
                        <input 
                        type="date"
                        class="form-control"
                        name="${element.name}"
                        id="${element.name}"  
                        ${element?.value ? `value =${element?.value}` : ""}   
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""} 
                        />
                    </div>`
                    break;
                }
                case "file": {
                    HTML += `<div class="mb-3">
                    <label for="formFile" class="form-label">${element.name}</label>
                    <input name="${element.name}" ${element.mutiple && 'multiple="multiple"'} class="form-control"
                    ${element.required && 'required'} type="file" id="formFile">
                  </div>`
                    break;
                }
                case "number": {
                    HTML += `
                    <div class="form-outline">
                        <label class="form-label" for="typeNumber">${element.name}</label>
                        <input type="number" class="form-control" name="${element.name}" 
                        value=${element?.value ? element.value : ""}
                        min=${element?.min ? element.min : ""} 
                        max=${element?.max ? element.max : ""}
                        step=${element?.step ? element.step : ""}  
                        id="${element.name}"  
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""} >
                    </div>`
                    break;
                }
                case "header":
                case "paragraph": {
                    HTML += `<${element.subtype}>${element.label}</${element.subtype}>`
                    break;
                }
                case "hidden": {
                    HTML += `<input type="hidden" name="${element.name}" value="${element.value}" id="${element.name}">`
                    break;
                }
                case "radio-group": {
                    HTML += `<div>
                        <label class="form-label">${element.name}</label>
                        ${element.values.map((data) => {
                        return `  <div class="form-check">
                            <input class="form-check-input" type="radio" name="${element.name}" value="${data.value}"
                                id="${data.label}"  ${data.selected && 'checked'}>
                            <label class="form-check-label" >
                                ${data.label}
                            </label>
                            </div>`})}
                        </div>`
                    HTML += element?.other ? `<div class="form-check">
                            <input class="form-check-input" type="radio" name="${element.name}"
                                id="${element.label}" >
                            <label class="form-check-label" >
                                ${element.label}
                                <input type="text" id="${element.label}-other" >
                            </label>
                            </div>` : ""
                    break;
                }
                case "select": {
                    HTML += `<div>
                        <label class="form-label">${element.name}</label>
                        <select
                        name="${element.name}"
                        class="form-select"  
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""}>
                        ${element.values.map((data) => {
                        return `<option value="${data.value}">${data.label}</option>`
                    })}
                        </select>
                    </div>`
                    break;
                }
                case "text":
                case "textarea": {
                    HTML += `<div>
                        <label class="form-label">${element.name}</label>
                        <input 
                        name="${element.name}"
                        type=${element.type}
                        class="form-control"
                        id="${element.name}"    
                        value="${element?.value ? element.value : ""}"
                        placeholder="${element?.placeholder ? element.placeholder : ""}"
                        title="${element?.description ? element.description : ""}"
                        ${element.required ? 'required' : ""} 
                        ${element?.maxlength ? `maxLength=${element?.maxlength}` : ""}
                        />
                    </div>`
                    break;
                }
                case "button": {
                    HTML += `<div>
                        <label class="form-label">${element.name}</label>
                        <button type="${element.subtype}" class="btn btn-primary" id="${element.name}" 
                        >${element?.value || element?.label}</button>
                    </div>`
                    break;
                }
            }
        })
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
                            <p id="my-form-status"></p>
                            <form id="my-form" action="https://data.formhouse.pro/36rKEtcDFRtv0ZhwnONnFK" method="post">
                                ${HTML}
                            </form>
                        </body>
                    </html>`
        console.log(doc)
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
                    <Button onClick={() => renderEdit()} color='primary' variant="contained">
                        Get HTML
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
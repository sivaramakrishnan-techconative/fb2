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
        let HTML: string = "", code: string = "";
        formData.map((element: any) => {
            console.log(element)
            switch (element.type) {
                case "autocomplete": {
                    HTML += ` <label for="Autocomplete" class="form-label">${element.name}</label>
                    <input 
                      list="datalistOptions"
                      id="${element.name}"     
                      placeholder="${element?.placeholder ? element.placeholder : ""}"
                      title="${element?.description ? element.description : ""}"
                      ${element.required ? 'required' : ""} 
                    />
                    <datalist id="datalistOptions">
                        ${element.values.map((data) => { return `<option value="${data.value}">${data.label}</option>` })}
                    </datalist>`
                    break;
                }
                case "checkbox-group": {
                    HTML += ` <label class="form-label">${element.name}</label>
                    <div class="input-group mb-3">
                    <div class="form-check">
                    ${element.values.map((data) => {
                        return `
                        <input class="form-check-input" type="checkbox" value="${data.value}" id="${data.label}"  ${data.selected && 'checked'}>
                        <label class="form-check-label" >
                            ${data.label}
                        </label>`})}      
                    </div>              
                  </div>`
                    break;
                }
                case "date": {
                    HTML += ` <label for="Date" class="form-label">${element.name}</label>
                    <input 
                      type="date"
                      class="form-control"
                      id="${element.name}"    
                      value="${element?.value}"
                      placeholder="${element?.placeholder ? element.placeholder : ""}"
                      title="${element?.description ? element.description : ""}"
                      ${element.required ? 'required' : ""} 
                    />`
                    break;
                }
                case "file": {
                    HTML += `<div class="mb-3">
                    <label for="formFile" class="form-label">${element.name}</label>
                    <input ${element.mutiple && 'multiple="multiple"'} class="form-control"
                    ${element.required && 'required'} type="file" id="formFile">
                  </div>`
                    break;
                }
                case "number": {
                    HTML += `
                    <div class="form-outline">
                    <label class="form-label" for="typeNumber">${element.name}</label>
                    <input type="number" class="form-control" name="${element.name}" 
                    value=${element?.value} min=${element?.min} max=${element?.max} step=${element?.step}  
                    id="${element.name}"  placeholder="${element?.placeholder ? element.placeholder : ""}"
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
                    HTML += ` <label class="form-label">${element.name}</label>
                    ${element.values.map((data) => {
                        return `  <div class="form-check">
                        <input class="form-check-input" type="radio" name="${element.name}" value="${data.value}"
                            id="${data.label}"  ${data.selected && 'checked'}>
                        <label class="form-check-label" >
                            ${data.label}
                        </label>
                        </div>`})}`
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
                    HTML += `<label class="form-label">${element.name}</label>
                    <select class="form-select"  
                    placeholder="${element?.placeholder ? element.placeholder : ""}"
                    title="${element?.description ? element.description : ""}"
                    ${element.required ? 'required' : ""} 
                    ${element.values.map((data) => {
                        return `<option value="${data.value}">${data.label}</option>`
                    })}
                    </select>`
                    break;
                }
                case "text":
                case "textarea": {
                    HTML += ` <label class="form-label">${element.name}</label>
                    <input 
                    type=${element.type}
                    class="form-control"
                    id="${element.name}"    
                    value="${element?.value ? element.value : ""}"
                    placeholder="${element?.placeholder ? element.placeholder : ""}"
                    title="${element?.description ? element.description : ""}"
                    ${element.required ? 'required' : ""} 
                    ${element?.maxlength ? `maxLength=${element?.maxlength}` : ""}
                    />`
                    break;
                }
            }
        })
        console.log(HTML)
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
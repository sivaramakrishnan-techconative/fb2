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
        let HTML: string = "";
        console.log(document.querySelector(".drop").innerHTML)
        formData.map((element: any) => {
            // console.log(element)
            switch (element.type) {
                case "autocomplete": {
                    HTML += `<div>
                        <label className="form-label" htmlFor="${element.name}">${element.label}</label>
                        <input 
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        name="${element.name}"
                        list="datalistOptions"
                        className="form-control mb-3"
                        id="${element.name}"    
                        ${(element?.placeholder)?`placeholder="${element?.placeholder}"`:``}  
                        ${(element?.description)?`title="${element?.description}"`:``}  
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
                    element.values.map((data,i) => {
                        innerHTML += `
                        <label className="form-check-label " style={{marginRight:"30px"}} htmlFor="${element.name+'-'+i}">
                        <input name="${element.name}" className="form-check-input " 
                        onChange={onChangeHandler}
                        type="checkbox" value="${data.value}" id="${element.name+'-'+i}"/>
                        
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
                        <label  className="form-label" htmlFor="${element.name}">${element.label}</label>
                        <input 
                        type="date"
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        name="${element.name}"
                        id="${element.name}"  
                        ${(element?.value)?`value="${element?.value}"`:``} 
                        ${(element?.placeholder)?`placeholder="${element?.placeholder}"`:``} 
                        ${(element?.description)?`title="${element?.description}"`:``} 
                        ${element.required ? 'required' : ""} 
                        />
                    </div>`
                    break;
                }
                case "file": {
                    HTML += `<div className="mb-3">
                    <label for="formFile" className="form-label" htmlFor="formFile">${element.label}</label>
                    <input name="${element.name}" ${element.mutiple && 'multiple="multiple"'} className="form-control"
                    ${element.required && 'required'} type="file" id="formFile" />
                  </div>`
                    break;
                }
                case "number": {
                    HTML += `
                    <div className="form-outline">
                        <label className="form-label"  htmlFor="${element.name}">${element.label}</label>
                        <input type="number" className="form-control mb-3" name="${element.name}" 
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        ${(element?.value)?`value="${element?.value}"`:``}
                        ${(element?.min)?`min="${element?.min}"`:``}
                        ${(element?.max)?`max="${element?.max}"`:``}
                        ${(element?.step)?`step="${element?.step}"`:``}
                        ${(element?.placeholder)?`placeholder="${element?.placeholder}"`:``}
                        ${(element?.description)?`title="${element?.description}"`:``}
                        id="${element.name}"  
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
                    HTML += `<input type="hidden" name="${element.name}" value="${element.value}" id="${element.name}" />`
                    break;
                }
                case "radio-group": {
                    let innerHTML = ''
                    element.values.map((data,i) => {
                    innerHTML += `<div className="form-check ">
                    
                    <input className="form-check-input" type="radio" name="${element.name}" value="${data.value}"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        id="${element.name+'-'+i}" 
                              ${data.selected?'checked':''}
                              />
                              <label className="form-check-label" htmlFor="${element.name+'-'+i}" >    
                            ${data.label}
                        </label>
                        </div>`})

                    HTML += `<div className="mb-3">
                        <label className="form-label" htmlFor="${element.name}">${element.label}</label>
                        ${innerHTML}
                        </div>`
                    if(element?.other ){
                        HTML +=  `<div className="form-check" >
                                <input className="form-check-input" type="radio" name="${element.name}"
                                onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                                    id="${element.name}" ${data.selected?'checked':''}/>
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
                        <label className="form-label" htmlFor="${element.name}">${element.label}</label>
                        <select
                        name="${element.name}"
                        id="${element.name}"

                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        ${(element?.placeholder)?`placeholder="${element?.placeholder}"`:``}
                        ${(element?.description)?`title="${element?.description}"`:``}
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
                        <label className="form-label" htmlFor="${element.name}">${element.label}</label>
                        <input 
                        name="${element.name}"
                        type="${element.type}"
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        id="${element.name}" 
                        ${(element?.value)?`value="${element?.value}"`:``}
                        ${(element?.placeholder)?`placeholder="${element?.placeholder}"`:``}
                        ${(element?.description)?`title="${element?.description}"`:``}
                        ${element.required ? 'required' : ""} 
                        ${element?.maxlength ? `maxLength=${element?.maxlength}` : ""}
                        />
                    </div>`
                    break;
                }
                case "textarea": {
                    HTML += `<div>
                        <label className="form-label" htmlFor="${element.name}">${element.label}</label>
                        <textarea 
                        name="${element.name}"
                        type="${element.type}"
                        className="form-control mb-3"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        id="${element.name}" 
                        rows="${(element.rows)?element.rows:3}" 
                        ${(element?.value)?`value="${element?.value}"`:``}
                        ${(element?.placeholder)?`placeholder="${element?.placeholder}"`:``}
                        ${(element?.description)?`title="${element?.description}"`:``}
                        ${element.required ? 'required' : ""} 
                        ${element?.maxlength ? `maxLength=${element?.maxlength}` : ""}
                        ></textarea>
                    </div>`
                    break;
                }
                case "button": {
                    HTML += `<div>
                        <button type="${element.subtype}" className="btn btn-primary mb-3" 
                        onClick={onSubmit}
                        id="${element.name}" 
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
                const onSubmit = (e) => {
                    console.log(data);
                }
                const onChangeHandler = (e) => {
                    if(e.target.checked){
                      setCheckbox([...checkbox,e.target.value])
                    }else{
                      setCheckbox(checkbox.filter(elem=>elem != e.target.value))
                    }
                    setName(e.target.name)
                  }
                
                  useEffect(()=>{
                    if(name && checkbox.length > 0){
                      setData({ ...data, [name]: checkbox })
                    }
                  },[checkbox,name])
               return (
                <>
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
                    <Button onClick={() => renderEdit()} color='primary' variant="contained">
                        Get HTML
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
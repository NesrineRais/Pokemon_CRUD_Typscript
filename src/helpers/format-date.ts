const FormDate=(date:Date):string=>{

    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export default FormDate;
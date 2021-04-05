import { createUseStyles } from 'react-jss'
import { useState, useRef, useEffect } from 'react'

import { MdCancel} from 'react-icons/md'

const useStyles = createUseStyles({
   form: {
      marginBottom: '32px',
      fontSize: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   addInput: {
      padding: '14px 32px 14px 16px',
      margin: '30px',
      borderRadius: '4px 0 0 4px',
      border: '2px solid #5d0cff',
      outline: 'none',
      width: '320px',
      background: 'transparent',
      fontSize: '14px',
      color: '#fff'
   },
   filter: {
      fontSize: '30px',
      color:'red',
      cursor: 'pointer'
   }
})

const Form = ({ onSubmit, itemPresent, filter, disabled }) => {
   const [input, setInput] = useState('')
   const classes = useStyles()
   const inputRef = useRef(null)

   useEffect(() => {
      inputRef.current.focus()
   })

   const validate = input => {
      var regex = /^[a-zA-Z ]*$/
      return input.match(regex)
   }

   const handleChange = e => setInput(e.target.value.toLowerCase())

   const handleSubmit = e => {
      e.preventDefault()
       if(!itemPresent(input)){
         if(validate(input)){
            onSubmit({
               id: Math.floor(Math.random() * 10000),
               name: input,
               favourite: false
            }) 
         }else alert("please find a good named Friend.")
         setInput('')
      }
   }

   const removeFilter = () => {
      setInput('')
      filter.onClick()
   }

   return (
      <form className={classes.form} onSubmit={handleSubmit}>
         <input
            type="text"
            ref={inputRef}
            placeholder="Add or filter your friend and press Enter"
            value={input}
            name="text"
            disabled={disabled}
            className={classes.addInput}
            onChange={handleChange}
         />
         <div onClick={removeFilter} className={classes.filter}>
            {filter.showFilter && <MdCancel />}
         </div>
      </form>
   )
}

export default Form
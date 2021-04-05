import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
   buttonbaseSyles: {
      color: ({color}) => color ? color : 'black',
      border: 'none',
      backgroundColor: 'inherit',
      cursor: 'pointer',
      display: 'inline-block',
      transition: 'background-position 275ms ease',

      '&:hover': {
         filter: 'brightness(90%)'
      },
      '&:focus': {
         outline: 'none'
      }
   }
})

const Button = ({ onClick,  color, name }) => {
   const classes = useStyles({ color})

   return (
      <button className={classes.buttonbaseSyles} onClick={onClick}>
         {name}
      </button>
   )
}

export default Button

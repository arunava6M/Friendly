import { createUseStyles } from 'react-jss'

import Button from './Button'
import Grouped from './Grouped'

const useStyles = createUseStyles({
   styles: {
      position: 'fixed',
      display: ({open}) => open ? 'flex' : 'none',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100px',
      width: '300px',
      background: `linear-gradient(
         90deg,
         rgba(48, 16, 255, 1) 0%,
         rgba(100, 115, 255, 1) 100%
       )`,
      borderRadius: '10px',
      color: 'white'
   }
})

const Alert = ({ open, onApprove, onDecline }) => {
   const classes = useStyles({open})
   return (
      <div className={classes.styles }>
         Do you want to delete this friend ?
         <Grouped>
            <Button name="Yes" color="white" onClick={onApprove}/>
            <Button name="No" color="white" onClick={onDecline}/>
         </Grouped>
      </div>
   )
}

export default Alert

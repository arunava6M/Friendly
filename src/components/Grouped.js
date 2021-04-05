import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
   styles: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start'
   }
})

const Grouped = ({ children, className }) => {
   const classes = useStyles()
   return <div className={`classes.styles ${className}`}>{children}</div>
}

export default Grouped

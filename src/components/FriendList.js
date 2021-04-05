import { createUseStyles } from 'react-jss'
import { useState, useEffect } from 'react'
import { MdFavoriteBorder, MdFavorite, MdDelete }from 'react-icons/md'

import Grouped from './Grouped'

import Text from './Text'

const useStyles= createUseStyles({
      eachRow: {
         display: 'flex',
         alignItems: 'center',
         flexDirection: 'row',
         justifyContent: 'space-between',
         margin: '4px auto',
         padding: '16px',
         borderRadius: '5px',
         width: '70%',
         background: `linear-gradient(
            90deg,
            rgba(201, 86, 219, 1) 0%,
            rgba(255, 84, 17, 1) 100%
         )`,
         color: '#fff'
      },
      list: {
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'flex-start'
      },
      icons: {
         width: '18%',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         fontSize: 24,
         cursor: 'pointer'
      }
   })

const EachRow = ({data, onFavourite, onDelete}) => {
   const classes=useStyles()
   console.log('data in eachrow: ', data)
   const { id, name, favourite } = data

   const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1)

   return (
      <div key={id} className={classes.eachRow}>
         <Text color="white" variant="regular">{capitalize(name)}</Text>
         <Grouped className={classes.icons}>
            <div onClick={() => onFavourite(data)}>
               {favourite ?
                  <MdFavorite /> :
                  <MdFavoriteBorder/>}
            </div>
            <MdDelete onClick={() => onDelete(data)}/>
         </Grouped>
         
      </div>
   )
}

const FriendList = ({ data: FriendsData, onFavourite, onDelete }) => {
   const classes=useStyles()

   const renderList = () => FriendsData.map( friend =>
      <EachRow
         data={friend}
         onFavourite={onFavourite}
         onDelete={onDelete}
      />)

   return (
      <div className={classes.list}>
         {renderList()}
      </div>)

}

export default FriendList

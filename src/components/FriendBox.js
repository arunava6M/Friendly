import { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

import InputForm from './Form'
import FriendyList from './FriendList'
import Alert from './Alert'

const useStyles = createUseStyles({
   container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      width:'520px',
      height: '600px',
      background: '#161a2b',
      textAlign: 'center',
      margin: '100px',
      borderRadius: '10px',
      paddingBottom: '32px'
   },
   pagination: {
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '70px'
   },
   alert: {
      position: 'fixed',
      left: '50%',
      right: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '70px'
   },
   eachNum: {
      height: '15px',
      width: '15px',
      borderRadius: '50%',
      backgroundColor: '#a561b0',
      margin: '2px',
      fontSize: 12,
      cursor: 'pointer'
   }
})

const paginateConst = 5

const FriendBox = () => {
   const [ friendList, setFriendList] = useState([])
   const [ filteredData, setFilteredData] = useState(friendList)
   const [ currentPage, setCurrentPage ] = useState(1)
   const [ paginatedData, setPaginatedData ] = useState([])
   const [ showFilter, setShowFilter ] = useState(false)
   const [ showAlert, setShowAlert ] = useState(false)
   const [ deleteData, setDeleteData ] = useState(null)

   const classes=useStyles()

   useEffect(()=> {
      !showFilter && setFilteredData(friendList)
      filteredData.length === 0 && setShowFilter(false)
   },[friendList, showFilter, filteredData, setShowFilter])

   useEffect(()=>{
      if(filteredData.length > paginateConst){
         const indexLastFr = currentPage * paginateConst
         const indexFirstFr = indexLastFr - paginateConst
         const currentListFr = filteredData.slice(indexFirstFr, indexLastFr)
         setPaginatedData(currentListFr)
      } else setPaginatedData(filteredData)
   }, [ filteredData, currentPage ])

   const pageNumbers =  []
   for (let i = 1; i <= Math.ceil(filteredData.length / paginateConst); i++) {
      pageNumbers.push(i);
    }
   
   const handlePagination = e => setCurrentPage(e.target.id)

   const renderPagination = () => pageNumbers.map(num => {
      return (
         <div
            key={num}
            id={num}
            onClick={handlePagination}
            className={classes.eachNum}
         >
            {num}
         </div>
      )
   })

   const addFrind = friend => {
      setShowFilter(false)
      setFriendList([friend, ...friendList])
   }

   const updater = (key, list,friend) => {
      const friendIndex = list.findIndex(el => el.id === friend.id)
      let tempFriendList = [...list]
      if(key==='fav'){
         tempFriendList[friendIndex] = { ...friend, favourite: !tempFriendList[friendIndex].favourite}
      }
      if(key==="del"){
         tempFriendList.splice(friendIndex, 1)
      }
      return tempFriendList
      
   }

   const handleFovourite = friend => {
      if(!showAlert){
         setFilteredData(updater('fav', filteredData, friend))
         setFriendList(updater('fav', friendList, friend ))
      }
   }

   const onDelete = friend => {
      setShowAlert(true)
      setDeleteData(friend)
   }

   const handleDelete = () => {
      setShowAlert(false)
      setFilteredData(updater('del', filteredData, deleteData))
      setFriendList(updater('del', friendList, deleteData))
      setDeleteData(null)
   }

   const itemPresent = str => {
      if (friendList.length === 0) return false

      const present = friendList.find(friend => friend.name.match(str))
      console.log(present)
      if(present) {
         setShowFilter(true)
         const filteredListData = friendList.filter( friend => friend.name.match(str) )
         console.log(filteredListData)
         setFilteredData(filteredListData)
         return true
      }
      return false
   }
   const filter = {
      showFilter,
      onClick: () => {
         setFilteredData(friendList)
         setShowFilter(false)
      }
   }

   return (
      <div className={classes.container}>
         <InputForm disabled={showAlert} filter={filter} itemPresent={itemPresent} onSubmit={addFrind}/>
         {showAlert && <div className={classes.alert}>
            <Alert
               open={showAlert}
               onDecline={()=> setShowAlert(false)}
               onApprove={handleDelete}
            />
         </div>}
         <FriendyList
            data={paginatedData}
            onFavourite={handleFovourite}
            onDelete={onDelete}
         />
         <div className={classes.pagination}>
          {renderPagination()}
         </div>
         
      </div>
   )
}

export default FriendBox
